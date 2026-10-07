import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

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

  console.info("Razorpay webhook received", {
    event,
    paymentId: paymentEntity?.id,
    orderId: paymentEntity?.order_id,
    status: paymentEntity?.status,
  });

  // Payment state is currently verified in the checkout handler. This endpoint
  // acknowledges signed events so Razorpay can deliver and retry them reliably.
  // Add durable business actions here when a database or notification workflow exists.
  return NextResponse.json({ received: true });
}
