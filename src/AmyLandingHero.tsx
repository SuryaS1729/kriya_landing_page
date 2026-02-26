

import { motion } from "motion/react";
import { Tooltip } from "@/components/ui/tooltip-card";

// QR Code components for each store
const PlayStoreQRCode = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://play.google.com/store/apps/details?id=com.surya7314.kriya"
        alt="Play Store QR Code"
        className="w-full aspect-square rounded-sm bg-white p-2"
      />
      <p className="mt-3 text-center text-xs font-medium text-neutral-700 dark:text-neutral-300">
        Scan to download on Android
      </p>
    </div>
  );
};

const AppStoreQRCode = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883"
        alt="App Store QR Code"
        className="w-full aspect-square rounded-sm bg-white p-2"
      />
      <p className="mt-3 text-center text-xs font-medium text-neutral-700 dark:text-neutral-300">
        Scan to download on iOS
      </p>
    </div>
  );
};

export default function AmyLandingHero(){
  return (
   <div className="font-sans">

     {/* Your Content/Components */}


        {/* Main Hero Section - Full Viewport Height */}
        <div className="max-w-[1100px] mx-auto p-6 flex flex-col items-center justify-center min-h-screen pt-30 md:pt-6">
            <main className="flex items-center gap-8 md:gap-24 w-full justify-center md:flex-row flex-col z-50">
                <div className="md:w-[50%] w-full max-w-[450px] text-center md:text-left">
                    <div className="flex items-center font-semibold text-3xl mb-6 justify-center md:justify-start">
                        <img src="https://res.cloudinary.com/dztfsdmcv/image/upload/v1770712720/icon_zddsrd_saad1s.webp" alt="Kriya" className="w-[60px] h-[60px] rounded-[14px] mr-3 border border-gray-200 shadow-sm"/>
                        <span className="font-instrument italic font-medium tracking-normal">kriya</span>
                    </div>
                    <h1 className="font-display md:text-[2.46rem] text-[1.93rem] font-bold leading-tight mb-4 text-gray-900">Get Spiritually Productive</h1>
                    <p className="text-base text-gray-600 mb-6 leading-relaxed"><span className="font-instrument italic font-extrabold tracking-normal text-xl bg-amber-100 rounded-lg px-2 py-1">kriya</span> blends timeless wisdom from the Gita with modern design to help you act with clarity.
                        <br/><br/>Plan your day, one mindful task at a time.</p>
                    <div className="flex flex-row gap-2 mt-6 items-center md:items-start md:justify-start justify-center mb-8 ">
                        {/* Play Store Button - QR tooltip on desktop only */}
                        <div className="hidden md:block">
                            <Tooltip content={<PlayStoreQRCode />}>
                                <motion.a 
                                    href="https://play.google.com/store/apps/details?id=com.surya7314.kriya" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    <img src="https://res.cloudinary.com/dztfsdmcv/image/upload/v1761553362/playstore2_yckyyt.avif" alt="Get it on Google Play" className="w-36 h-10 object-contain" />
                                </motion.a>
                            </Tooltip>
                        </div>
                        {/* Play Store Button - Direct link on mobile */}
                        <motion.a 
                            href="https://play.google.com/store/apps/details?id=com.surya7314.kriya" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="md:hidden flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <img src="https://res.cloudinary.com/dztfsdmcv/image/upload/v1761553362/playstore2_yckyyt.avif" alt="Get it on Google Play" className="w-36 h-10 object-contain" />
                        </motion.a>

                        {/* App Store Button - QR tooltip on desktop only */}
                        <div className="hidden md:block">
                            <Tooltip content={<AppStoreQRCode />}>
                                <motion.a 
                                    href="https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    <img src="https://res.cloudinary.com/dztfsdmcv/image/upload/v1761553361/appstore1_ywtpdn.avif" alt="Download on the App Store" className="w-36 h-10 object-contain" />
                                </motion.a>
                            </Tooltip>
                        </div>
                        {/* App Store Button - Direct link on mobile */}
                        <motion.a 
                            href="https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="md:hidden flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <img src="https://res.cloudinary.com/dztfsdmcv/image/upload/v1761553361/appstore1_ywtpdn.avif" alt="Download on the App Store" className="w-36 h-10 object-contain" />
                        </motion.a>
                    </div>
                    <a href="https://x.com/SuryaS_1729" target="_blank" rel="noopener noreferrer" className="text-gray-400 font-medium hover:text-gray-600 transition-colors flex items-center gap-2 text-sm justify-center md:justify-start  mt-3">
                        <span>Follow @SuryaS_1729
 for updates</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
                <div className="w-full max-w-[350px] flex-none mt-6 md:mt-0">
                    <video 
                        src="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/demo.mp4" 
                        poster="https://pub-4862ee5d51df47c4849ba812da5460ff.r2.dev/frame.webp"
                        className="w-full h-auto rounded-xl shadow-lg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-label="Kriya App Preview"
                    />
                </div>

            </main>
        </div>
            
            {/* Story Section */}
            <section className="mt-16 px-6">
                <div className="max-w-[700px] mx-auto selection:text-purple-900 selection:bg-cyan-200">
                    <h2 className="font-instrument tracking-wide text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center ">The Story Behind Kriya</h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed ">
                        <p>The seed for <span className="font-instrument font-semibold text-xl italic">kriya</span> was first inspired by <a href="https://x.com/ash1sh0kumar" target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:underline">@ash1sh0kumar</a>'s Gitasay, and later, the <a href="https://x.com/indiainpixels" target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:underline">@indiainpixels</a> Hackathon reaffirmed my belief that many Indians today are seeking to reconnect with their roots. There’s an Indic renaissance quietly unfolding, a growing curiosity to understand our own philosophies in a modern context.</p>
                        
                        <p>The goal was simple: to make the Bhagavad Gita accessible to everyone, especially millennials and Gen Z who are in the most active, fast-paced phases of their lives, on their phones, in a clean and modern interface.</p>
                        
                        <p className="font-semibold italic text-cyan-800"><span className="font-instrument font-semibold text-xl">kriya</span> means action.</p>
                        
                        <p>In many Indian households, there's a subtle hesitation around reading ancient scriptures, as if they're meant only for one's post-retirement years, something to turn to after the rush of life has passed. I've always disagreed with that.</p>
                        
                        <p>Krishna and Arjuna didn't have their dialogue at leisure on a swing in their backyard. It happened on the battlefield of Kurukshetra, amidst action, confusion, and moral conflict.</p>
                        
                        <p className="font-medium">The Gita isn't meant to be read when life is calm, but when it's at its most chaotic.</p>
                        
                        <p>That's what <span className="font-instrument font-semibold text-x italic">kriya</span> stands for: bringing the wisdom of the Gita into the most actionable phase of your life. To not just read it, but to live it as you take on your own daily battles.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-24 w-full md:max-w-[1100px] md:mx-auto border-t border-gray-200 bg-gray-50">
                <div className="px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo and tagline */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center font-semibold text-2xl mb-2">
                                <img src="https://res.cloudinary.com/dztfsdmcv/image/upload/v1770712720/icon_zddsrd_saad1s.webp" alt="Kriya" className="w-10 h-10 rounded-xl mr-2 border border-gray-200 shadow-sm"/>
                                <span className="font-instrument italic font-medium tracking-normal">kriya</span>
                            </div>
                            <p className="text-gray-600 text-sm text-center md:text-left">Spiritual productivity for the modern age</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex gap-6 text-sm">
                                <a href="https://x.com/SuryaS_1729" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">Twitter</a>
                                <a href="https://play.google.com/store/apps/details?id=com.surya7314.kriya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">Android</a>
                                <a href="https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">iOS</a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                        <p>&copy; 2025 Kriya. Built with 🧡 by the BitwiseDharma company</p>
                    </div>
                </div>
            </footer>
    </div>

)     
}
