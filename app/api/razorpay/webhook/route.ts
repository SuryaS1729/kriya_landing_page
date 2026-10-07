import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function isValidSignature(body: string, signature: string, secret: string) {
  const expectedSignature = createHmac("sha256", secret).update(body).digest("hex");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Razorpay webhook secret is not configured");
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 500 });
  }

  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing webhook signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  if (!isValidSignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Webhook body must be valid JSON." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Webhook body must be a JSON object." }, { status: 400 });
  }

  const event = "event" in payload && typeof payload.event === "string" ? payload.event : "unknown";
  const entity =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? (payload.payload as Record<string, unknown>)
      : undefined;
  const payment =
    entity && "payment" in entity && typeof entity.payment === "object" && entity.payment !== null
      ? (entity.payment as Record<string, unknown>)
      : undefined;
  const paymentEntity =
    payment && "entity" in payment && typeof payment.entity === "object" && payment.entity !== null
      ? (payment.entity as Record<string, unknown>)
      : undefined;

  if (event === "payment.captured" && paymentEntity?.id && paymentEntity.order_id) {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID ?? "",
        key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
      });
      const order = await razorpay.orders.fetch(String(paymentEntity.order_id));
      const notes = order.notes as Record<string, string> | undefined;

      if (notes?.display_consent === "true" && notes.donor_name) {
        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from("contributors").upsert(
          {
            name: notes.donor_name,
            twitter_handle: notes.twitter_handle || null,
            payment_id: String(paymentEntity.id),
            order_id: String(paymentEntity.order_id),
            display_consent: true,
          },
          { onConflict: "payment_id", ignoreDuplicates: true },
        );

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error("Contributor persistence failed", error);
      return NextResponse.json({ error: "Unable to process webhook." }, { status: 500 });
    }
  }

  console.info("Razorpay webhook received", {
    event,
    paymentId: paymentEntity?.id,
    orderId: paymentEntity?.order_id,
    status: paymentEntity?.status,
  });

  return NextResponse.json({ received: true });
}
