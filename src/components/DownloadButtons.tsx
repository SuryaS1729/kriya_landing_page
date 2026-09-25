"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { QR_CODE_URL } from "@/lib/constants";

export default function DownloadButtons() {
  return (
    <>
      <motion.div
        className="mt-6 mb-8 md:hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="/download"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>Download the app</span>
        </motion.a>
      </motion.div>

      <motion.div
        className="mt-6 mb-4 hidden flex-col items-start md:flex"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative h-40 w-40">
          <div className="absolute inset-2 overflow-hidden rounded-md bg-white shadow-sm">
            <Image
              src={QR_CODE_URL}
              alt="Scan to download Kriya"
              width={160}
              height={160}
              className="scale-[1.1]"
            />
          </div>
          <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-slate-400/30" aria-hidden="true" />
          <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-slate-400/30" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-slate-400/30" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-slate-400/30" aria-hidden="true" />
        </div>
        <p className="mt-3 text-left text-sm font-medium text-gray-700">
          Scan to download <span className=" font-instrument text-lg italic">kriya</span> on your phone
        </p>
      </motion.div>
    </>
  );
}
