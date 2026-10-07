import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const MINIMUM_AMOUNT_PAISE = 100;

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payment service is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const amount =
    typeof body === "object" && body !== null && "amount" in body
      ? (body as { amount?: unknown }).amount
      : undefined;

  if (typeof amount !== "number" || !Number.isInteger(amount) || amount < MINIMUM_AMOUNT_PAISE) {
    return NextResponse.json(
      { error: `Amount must be at least ${MINIMUM_AMOUNT_PAISE} paise.` },
      { status: 400 },
    );
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `kriya_${Date.now()}`,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    const statusCode =
      typeof error === "object" && error !== null && "statusCode" in error
        ? (error as { statusCode?: unknown }).statusCode
        : undefined;

    if (statusCode === 401) {
      return NextResponse.json({ error: "Payment service authentication failed." }, { status: 401 });
    }

    console.error("Razorpay order creation failed", error);
    return NextResponse.json({ error: "Unable to create a payment order." }, { status: 500 });
  }
}
