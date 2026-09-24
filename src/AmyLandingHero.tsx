"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { RoughNotation } from "react-rough-notation";
import DownloadButtons from "@/components/DownloadButtons";
import { recoleta } from "@/fonts";

const LOGO_URL = "https://kriyarecordings.bitwisedharma.com/icon.webp";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scrollContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const scrollItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AmyLandingHero() {
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [showGitaHighlight, setShowGitaHighlight] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowAnnotation(true);
      return;
    }
    // Fallback in case onAnimationComplete doesn't fire (e.g. background tab).
    // Container stagger finishes ~1.06s, so 1.5s keeps sequencing intact.
    const t = setTimeout(() => setShowAnnotation(true), 1500);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowAnnotation(true);
      setShowGitaHighlight(true);
    }
  }, [prefersReducedMotion]);
  return (
    <div className="font-sans ">
      <div
        className="relative w-full bg-cover bg-center bg-[url('/assets/9.jpeg')] md:bg-[url('/assets/6.jpeg')]"
      >
        <div aria-hidden="true" className="absolute inset-0 hidden bg-white/30 md:block" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[45%] w-[85%] bg-gradient-to-bl from-white/70 via-white/35 to-transparent md:hidden" />
        <div className="relative mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center p-6 pt-30 md:pt-6">
          <div className="w-full max-w-[980px] overflow-hidden md:rounded-3xl md:border md:border-gray-500/10 md:bg-white/[0.14] md:p-10 md:shadow-2xl md:shadow-black/10 md:backdrop-blur-sm">
            <main className="z-50 flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-24">
          <motion.div
            className="w-full max-w-[450px] text-center md:w-[50%] md:text-left"
            variants={container}
            initial={prefersReducedMotion ? "show" : "hidden"}
            animate="show"
            onAnimationComplete={() => setShowAnnotation(true)}
          >
            <motion.div variants={item} className="mb-6 flex items-center justify-center text-3xl font-semibold md:justify-start">
              <Image src={LOGO_URL} alt="Kriya" width={60} height={60} className="mr-3 rotate-[-9deg] rounded-[14px] shadow-sm" />
              <span className="inline font-instrument font-medium italic tracking-normal text-cyan-800 md:hidden">kriya</span>
            </motion.div>
            <motion.h1 variants={item} className={`${recoleta.className} mb-4 text-[1.93rem] leading-tight text-gray-900 md:text-[2.46rem]`}>Get{" "}
              <RoughNotation
                type="underline"
                show={showAnnotation}
                color="#F0B078"
                strokeWidth={2.5}
                padding={2}
                animationDuration={1200}
                multiline
              >
                Spiritually Productive
              </RoughNotation>
            </motion.h1>
            <motion.p variants={item} className="mb-6 text-base leading-relaxed text-gray-600">
              <span className="font-instrument text-xl font-semibold italic tracking-normal text-cyan-800">kriya</span> blends timeless wisdom from the Gita with a modern workflow to help you act with clarity.
              <br /><br />Plan your day, one mindful task at a time.
            </motion.p>
            <motion.div variants={item}>
              <DownloadButtons />
            </motion.div>
            <motion.p variants={item} className="mt-3 inline-flex items-center rounded-full border border-[#4A6484]/10 px-3 py-1 text-center font-space-mono text-[11px] tracking-wide text-gray-500 md:-ml-3">
              free forever · offline · no signup · open source
            </motion.p>
          </motion.div>
          {isDesktop && !prefersReducedMotion ? (
            <motion.div
              className="mt-6 w-full max-w-[350px] flex-none md:mt-0"
              initial={{ x: 220, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <video src="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/demovideofinal.mp4" poster="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/frame.webp" className="h-auto w-full rounded-xl shadow-lg" autoPlay muted loop playsInline preload="metadata" aria-label="Kriya App Preview" />
            </motion.div>
          ) : (
            <div className="mt-6 w-full max-w-[350px] flex-none md:mt-0">
              <video src="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/demovideofinal.mp4" poster="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/frame.webp" className="h-auto w-full rounded-xl shadow-lg" autoPlay muted loop playsInline preload="metadata" aria-label="Kriya App Preview" />
            </div>
          )}
            </main>
          </div>
        </div>
      </div>

      <section className="mt-16 px-6">
        <motion.div
          className="mx-auto max-w-[700px] selection:bg-blue-900/70 selection:text-white"
          variants={scrollContainer}
          initial={prefersReducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2 variants={scrollItem} className={`${recoleta.className}  mb-6 text-center text-2xl text-gray-900 md:mb-8 md:text-3xl`}>The story behind <span className="text-cyan-800 font-instrument italic">kriya ...</span></motion.h2>
          <div className="space-y-4 leading-relaxed text-gray-700">
            <motion.p variants={scrollItem}>The seed for <span className="font-instrument text-xl font-medium italic text-cyan-800">kriya</span> was first inspired by <a href="https://x.com/ash1sh0kumar" target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:underline">@ash1sh0kumar</a>&apos;s Gitasay, and later, the <a href="https://x.com/indiainpixels" target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:underline">@indiainpixels</a> Hackathon reaffirmed my belief that many Indians today are seeking to reconnect with their roots. There’s an Indic renaissance quietly unfolding, a growing curiosity to understand our own philosophies in a modern context.</motion.p>
            <motion.p variants={scrollItem}>The goal was simple: to make the Bhagavad Gita accessible to everyone, especially millennials and Gen Z who are in the most active, fast-paced phases of their lives, on their phones, in a clean and modern interface.</motion.p>
            <motion.p variants={scrollItem} className="font-semibold italic text-cyan-800"><span className="font-instrument text-xl font-semibold text-cyan-800">kriya</span> means action.</motion.p>
            <motion.p variants={scrollItem}>In many Indian households, there&apos;s a subtle hesitation around reading ancient scriptures, as if they&apos;re meant only for one&apos;s post-retirement years, something to turn to after the rush of life has passed. I&apos;ve always disagreed with that.</motion.p>
            <motion.p variants={scrollItem}>Krishna and Arjuna didn&apos;t have their dialogue at leisure on a swing in their backyard. It happened on the battlefield of Kurukshetra, amidst action, confusion, and moral conflict.</motion.p>
            <motion.p
              variants={scrollItem}
              className="font-medium"
              onAnimationComplete={(definition) => {
                if (definition === "show") setShowGitaHighlight(true);
              }}
            >
              <RoughNotation
                type="underline"
                show={showGitaHighlight}
                color="#F0B078"
                strokeWidth={2}
                padding={2}
                animationDuration={1200}
                multiline
              >
                The Gita isn&apos;t meant to be read when life is calm, but when it&apos;s at its most chaotic.
              </RoughNotation>
            </motion.p>
            <motion.p variants={scrollItem}>That&apos;s what <span className="font-instrument text-xl font-semibold italic text-cyan-800">kriya</span> stands for: bringing the wisdom of the Gita into the most actionable phase of your life. To not just read it, but to live it as you take on your own daily battles.</motion.p>
          </div>
        </motion.div>
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
