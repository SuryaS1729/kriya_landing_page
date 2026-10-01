import Image from "next/image";
import Link from "next/link";
import { recoleta } from "@/fonts";
import { LOGO_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Support Kriya",
  description: "Help keep Kriya and the Gita accessible to everyone.",
  path: "/donate",
});

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-6 font-sans text-gray-900 md:px-10 md:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[760px] flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Back to Kriya home">
            <Image src={LOGO_URL} alt="Kriya" width={38} height={38} className="rounded-xl shadow-sm" />
            <span className="font-instrument text-2xl font-medium italic text-cyan-800">kriya</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-cyan-800">
            Back home
          </Link>
        </header>

        <section className="flex flex-1 items-center justify-center py-20">
          <div className="w-full max-w-[560px] text-left">
            <p className="mb-5 text-center font-space-mono text-[11px] uppercase tracking-[0.22em] text-cyan-800/70">
              Keep Kriya free
            </p>
            <h1 className={`${recoleta.className} text-center text-4xl leading-tight text-gray-900 md:text-5xl`}>
              A little support goes a long way.
            </h1>
            <div className="mx-auto mt-8 max-w-[500px] space-y-5 text-base leading-relaxed text-gray-600 md:text-lg">
              <p>Your contributions help refine the source material and improve the codebase.</p>
              <p>They help keep Kriya free for everyone.</p>
              <p>
                The intention is to keep the Gita accessible, especially for college students. If you&apos;re in a
                position to give, you can contribute through code or through coins.
              </p>
              <p>No pressure. Just thank you for being part of this.</p>
            </div>

            <div className="mx-auto mt-12 max-w-[520px] border-t border-[#4a6484]/10 pt-8 text-left">
              <h2 className={`${recoleta.className} text-2xl text-gray-900 md:text-3xl`}>Where your support goes</h2>
              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <span className="pt-1 font-space-mono text-[11px] text-cyan-800/70">01</span>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    <span className="font-semibold text-gray-800">More languages, one shloka at a time.</span>{" "}
                    Text-to-speech for the Gita in all Indian languages is still pending. Every rupee helps unlock
                    another shloka in another language, for everyone.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="pt-1 font-space-mono text-[11px] text-cyan-800/70">02</span>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    <span className="font-semibold text-gray-800">More wisdom to explore.</span> Your contribution
                    helps bring more scriptures and Indic philosophy into the app.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="pt-1 font-space-mono text-[11px] text-cyan-800/70">03</span>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    <span className="font-semibold text-gray-800">A sustainable home for Kriya.</span> It helps cover
                    app and media hosting so Kriya can remain free and available to everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-[360px] rounded-2xl border border-[#4a6484]/10 bg-white/70 p-5 shadow-sm shadow-black/5">
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-cyan-800 px-5 py-3 text-sm font-semibold text-white opacity-80"
              >
                Contribution link coming soon
              </button>
              <p className="mt-3 font-space-mono text-[10px] tracking-wide text-gray-400">
                payment details will be added here
              </p>
            </div>
          </div>
        </section>

        <footer className="pb-2 text-center font-space-mono text-[10px] tracking-wide text-gray-400">
          made with care for seekers, students, and everyday life
        </footer>
      </div>
    </main>
  );
}
