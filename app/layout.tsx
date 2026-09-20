import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { recoleta } from "../src/fonts";
import "../src/index.css";
import "../src/App.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif" });

export const metadata: Metadata = {
  title: "Kriya: Spiritual Productivity",
  description: "Spiritual productivity for the modern age.",
  openGraph: {
    title: "Kriya: Spiritual Productivity",
    description: "Spiritual productivity for the modern age.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kriya: Spiritual Productivity",
    description: "Spiritual productivity for the modern age.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} ${recoleta.variable}`}>{children}</body>
    </html>
  );
}
