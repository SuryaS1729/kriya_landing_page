"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";

const QR_CODE_URL = "https://kriyarecordings.bitwisedharma.com/kriya-download.svg";

export default function DownloadButtons() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  if (isMobile === null) {
    return <div className="mb-8 mt-6 h-20" aria-hidden="true" />;
  }

  if (!isMobile) {
    return (
      <div className="mb-8 mt-6 flex flex-col items-center md:items-start">
        <Image
          src={QR_CODE_URL}
          alt="Scan to download Kriya"
          width={160}
          height={160}
          className="rounded-md bg-white p-2 shadow-sm"
        />
        <p className="mt-3 text-center text-sm font-medium text-gray-500 md:text-left">
          Scan to download Kriya on your phone
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 mt-6">
      <motion.a
        href="/download"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        <span>Download <span className="font-instrument text-lg font-normal italic">kriya</span></span>
      </motion.a>
    </div>
  );
}
