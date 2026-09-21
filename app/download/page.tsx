import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { recoleta } from "@/fonts";

const IOS_URL = "https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.surya7314.kriya";
const QR_CODE_URL = "https://kriyarecordings.bitwisedharma.com/kriya-download-blue2.svg";

export const metadata = {
  title: "Download Kriya",
  description: "Scan to download Kriya — spiritual productivity for the modern age.",
};

export default async function DownloadPage() {
  const userAgent = (await headers()).get("user-agent") ?? "";

  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    redirect(IOS_URL);
  }

  if (/Android/i.test(userAgent)) {
    redirect(ANDROID_URL);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 font-sans">
      <main className="w-full max-w-[420px] rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl shadow-black/5">
        <h1 className={`${recoleta.className} mb-2 text-3xl text-gray-900`}>
          Download <span className="font-instrument font-medium italic text-cyan-800">kriya</span>
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          Point your phone camera at the code below
        </p>
        <div className="relative mx-auto h-60 w-60">
          <div className="absolute inset-2 overflow-hidden rounded-md bg-white">
            <Image
              src={QR_CODE_URL}
              alt="Scan to download Kriya"
              width={240}
              height={240}
              className="scale-[1.1]"
              priority
            />
          </div>
          <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 rounded-tl-md border-l-2 border-t-2 border-slate-400/30" aria-hidden="true" />
          <span className="pointer-events-none absolute right-0 top-0 h-6 w-6 rounded-tr-md border-r-2 border-t-2 border-slate-400/30" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 rounded-bl-md border-b-2 border-l-2 border-slate-400/30" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 rounded-br-md border-b-2 border-r-2 border-slate-400/30" aria-hidden="true" />
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
          >
            Download on the App Store
          </a>
          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
          >
            Get it on Google Play
          </a>
        </div>
        <p className="mt-6 font-space-mono text-[11px] tracking-wide text-gray-500">
          free forever · offline · no signup · open source
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-cyan-800 hover:underline">
          ← Back to home
        </Link>
      </main>
    </div>
  );
}
