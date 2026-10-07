import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json({ error: "Payment service is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const payment =
    typeof body === "object" && body !== null
      ? (body as {
          razorpay_order_id?: unknown;
          razorpay_payment_id?: unknown;
          razorpay_signature?: unknown;
        })
      : {};

  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = payment;

  if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
    return NextResponse.json({ error: "Missing payment verification fields." }, { status: 400 });
  }

  const expectedSignature = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");
  const isValid =
    expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isValid) {
    return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
  }

  return NextResponse.json({ success: true, payment_id: paymentId, order_id: orderId });
}
