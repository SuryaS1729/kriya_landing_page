import Image from "next/image";
import Link from "next/link";
import DownloadButtons from "@/components/DownloadButtons";
import { recoleta } from "@/fonts";

const LOGO_URL = "https://kriyarecordings.bitwisedharma.com/icon.webp";

export default function AmyLandingHero() {
  return (
    <div className="font-sans">
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/4.png')" }}
      >
        <div className="mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center p-6 pt-30 md:pt-6">
          <div className="w-full max-w-[980px] md:rounded-3xl md:border md:border-white/80 md:bg-white/90 md:p-10 md:shadow-2xl md:shadow-black/10 md:backdrop-blur-sm">
            <main className="z-50 flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-24">
          <div className="w-full max-w-[450px] text-center md:w-[50%] md:text-left">
            <div className="mb-6 flex items-center justify-center text-3xl font-semibold md:justify-start">
              <Image src={LOGO_URL} alt="Kriya" width={60} height={60} className="mr-3 rotate-[-9deg] rounded-[14px] border border-gray-200 shadow-sm md:rotate-0" />
              <span className="inline font-instrument font-medium italic tracking-normal text-cyan-800 md:hidden">kriya</span>
            </div>
            <h1 className={`${recoleta.className} mb-4 text-[1.93rem] leading-tight text-gray-900 md:text-[2.46rem]`}>Get Spiritually Productive</h1>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              <span className="font-instrument text-xl font-extrabold italic tracking-normal text-cyan-800">kriya</span> blends timeless wisdom from the Gita with a modern workflow to help you act with clarity.
              <br /><br />Plan your day, one mindful task at a time.
            </p>
            <DownloadButtons />
            <a href="https://x.com/SuryaS_1729" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600 md:justify-start">
              <span>Follow @SuryaS_1729 for updates</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <div className="mt-6 w-full max-w-[350px] flex-none md:mt-0">
            <video src="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/demovideofinal.mp4" poster="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/frame.webp" className="h-auto w-full rounded-xl shadow-lg" autoPlay muted loop playsInline preload="metadata" aria-label="Kriya App Preview" />
          </div>
            </main>
          </div>
        </div>
      </div>

      <section className="mt-16 px-6">
        <div className="mx-auto max-w-[700px] selection:bg-cyan-200 selection:text-purple-900">
          <h2 className={`${recoleta.className} mb-6 text-center text-2xl text-gray-900 md:mb-8 md:text-3xl`}>The Story Behind <span className="text-cyan-800">Kriya</span></h2>
          <div className="space-y-4 leading-relaxed text-gray-700">
            <p>The seed for <span className="font-instrument text-xl font-semibold italic text-cyan-800">kriya</span> was first inspired by <a href="https://x.com/ash1sh0kumar" target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:underline">@ash1sh0kumar</a>&apos;s Gitasay, and later, the <a href="https://x.com/indiainpixels" target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:underline">@indiainpixels</a> Hackathon reaffirmed my belief that many Indians today are seeking to reconnect with their roots. There’s an Indic renaissance quietly unfolding, a growing curiosity to understand our own philosophies in a modern context.</p>
            <p>The goal was simple: to make the Bhagavad Gita accessible to everyone, especially millennials and Gen Z who are in the most active, fast-paced phases of their lives, on their phones, in a clean and modern interface.</p>
            <p className="font-semibold italic text-cyan-800"><span className="font-instrument text-xl font-semibold text-cyan-800">kriya</span> means action.</p>
            <p>In many Indian households, there&apos;s a subtle hesitation around reading ancient scriptures, as if they&apos;re meant only for one&apos;s post-retirement years, something to turn to after the rush of life has passed. I&apos;ve always disagreed with that.</p>
            <p>Krishna and Arjuna didn&apos;t have their dialogue at leisure on a swing in their backyard. It happened on the battlefield of Kurukshetra, amidst action, confusion, and moral conflict.</p>
            <p className="font-medium">The Gita isn&apos;t meant to be read when life is calm, but when it&apos;s at its most chaotic.</p>
            <p>That&apos;s what <span className="font-instrument text-xl font-semibold italic text-cyan-800">kriya</span> stands for: bringing the wisdom of the Gita into the most actionable phase of your life. To not just read it, but to live it as you take on your own daily battles.</p>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-24 w-full border-t border-gray-200 bg-gray-50 md:max-w-[1100px]">
        <div className="px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-2 flex items-center text-2xl font-semibold">
                <Image src={LOGO_URL} alt="Kriya" width={40} height={40} className="mr-2 rounded-xl border border-gray-200 shadow-sm" />
                <span className="font-instrument font-medium italic tracking-normal text-cyan-800">kriya</span>
              </div>
              <p className="text-center text-sm text-gray-600 md:text-left">Spiritual productivity for the modern age</p>
            </div>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="flex gap-6 text-sm">
                <a href="https://x.com/SuryaS_1729" target="_blank" rel="noopener noreferrer" className="text-gray-600 transition-colors hover:text-gray-800">Twitter</a>
                <a href="https://play.google.com/store/apps/details?id=com.surya7314.kriya" target="_blank" rel="noopener noreferrer" className="text-gray-600 transition-colors hover:text-gray-800">Android</a>
                <a href="https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883" target="_blank" rel="noopener noreferrer" className="text-gray-600 transition-colors hover:text-gray-800">iOS</a>
                <Link href="/privacy" className="text-gray-600 transition-colors hover:text-gray-800">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 Kriya. Built with 🧡 by the BitwiseDharma company</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
