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

  const donorName =
    typeof body === "object" && body !== null && "donorName" in body
      ? (body as { donorName?: unknown }).donorName
      : undefined;
  const twitterHandle =
    typeof body === "object" && body !== null && "twitterHandle" in body
      ? (body as { twitterHandle?: unknown }).twitterHandle
      : undefined;
  const displayConsent =
    typeof body === "object" && body !== null && "displayConsent" in body
      ? (body as { displayConsent?: unknown }).displayConsent
      : false;

  if (typeof amount !== "number" || !Number.isInteger(amount) || amount < MINIMUM_AMOUNT_PAISE) {
    return NextResponse.json(
      { error: `Amount must be at least ${MINIMUM_AMOUNT_PAISE} paise.` },
      { status: 400 },
    );
  }

  if (displayConsent !== true) {
    if (donorName !== undefined || twitterHandle !== undefined) {
      return NextResponse.json({ error: "Contributor details require display consent." }, { status: 400 });
    }
  } else if (
    typeof donorName !== "string" ||
    donorName.trim().length < 1 ||
    donorName.trim().length > 80 ||
    (twitterHandle !== undefined &&
      (typeof twitterHandle !== "string" || twitterHandle.trim().length > 100))
  ) {
    return NextResponse.json({ error: "Please enter a valid contributor name and Twitter/X handle." }, { status: 400 });
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `kriya_${Date.now()}`,
      ...(displayConsent === true
        ? {
            notes: {
              donor_name: (donorName as string).trim(),
              twitter_handle: typeof twitterHandle === "string" ? twitterHandle.trim() : "",
              display_consent: "true",
            },
          }
        : {}),
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
