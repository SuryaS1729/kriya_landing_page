"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
  theme: { color: string };
};

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = { open: () => void };

const presetAmounts = [100, 500, 1_000];

export default function DonateCheckout() {
  const [amountInRupees, setAmountInRupees] = useState("500");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);

  async function handleDonate() {
    const rupees = Number(amountInRupees);
    const amount = Math.round(rupees * 100);

    if (!Number.isFinite(rupees) || !Number.isInteger(rupees) || amount < 100) {
      setMessage("Please enter a whole-rupee amount of at least ₹1.");
      return;
    }

    if (!isScriptReady || !window.Razorpay) {
      setMessage("Payment checkout is still loading. Please try again in a moment.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const order = (await orderResponse.json()) as { order_id?: string; amount?: number; currency?: string; error?: string };

      if (!orderResponse.ok || !order.order_id || !order.amount || !order.currency) {
        throw new Error(order.error ?? "Unable to start payment.");
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: order.amount,
        currency: order.currency,
        name: "Kriya",
        description: "Support Kriya",
        order_id: order.order_id,
        handler: async (response) => {
          try {
            const verificationResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verification = (await verificationResponse.json()) as { success?: boolean; error?: string };

            if (!verificationResponse.ok || !verification.success) {
              throw new Error(verification.error ?? "Payment verification failed.");
            }

            setMessage("Thank you for supporting Kriya. Your contribution was received.");
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Payment verification failed.");
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            setMessage("Payment cancelled. No amount was charged.");
          },
        },
        theme: { color: "#155e75" },
      });

      razorpay.open();
    } catch (error) {
      setIsLoading(false);
      setMessage(error instanceof Error ? error.message : "Unable to start payment.");
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setIsScriptReady(true)}
        onError={() => setMessage("Payment checkout could not load. Please refresh and try again.")}
      />
      <div className="mx-auto mt-10 max-w-[360px] rounded-2xl border border-[#4a6484]/10 bg-white/70 p-5 shadow-sm shadow-black/5">
        <div className="mb-4 flex gap-2" aria-label="Suggested contribution amounts">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmountInRupees(String(preset))}
              className={`flex-1 rounded-lg border px-2 py-2 text-sm transition-colors ${
                amountInRupees === String(preset)
                  ? "border-cyan-800 bg-cyan-800 text-white"
                  : "border-gray-200 text-gray-600 hover:border-cyan-800 hover:text-cyan-800"
              }`}
            >
              ₹{preset.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <label htmlFor="donation-amount" className="sr-only">
          Contribution amount in rupees
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">₹</span>
          <input
            id="donation-amount"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={amountInRupees}
            onChange={(event) => setAmountInRupees(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-8 py-3 text-sm text-gray-900 outline-none transition focus:border-cyan-800"
          />
        </div>
        <button
          type="button"
          onClick={handleDonate}
          disabled={isLoading}
          className="mt-3 w-full rounded-xl bg-cyan-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900 disabled:cursor-wait disabled:opacity-70"
        >
          {isLoading ? "Opening secure checkout…" : "Contribute securely"}
        </button>
        {message ? <p className="mt-3 text-center text-xs leading-relaxed text-gray-500" role="status">{message}</p> : null}
        <p className="mt-3 text-center font-space-mono text-[10px] tracking-wide text-gray-400">secure payment via Razorpay</p>
      </div>
    </>
  );
}
