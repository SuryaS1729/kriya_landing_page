

export default function AmyLandingHero(){
  return (
   <div className="max-w-[1100px] mx-auto p-6 font-sans flex flex-col items-center justify-center min-h-screen">
            <main className="flex items-center gap-16 md:gap-24 w-full justify-center md:flex-row flex-col">
                <div className="md:w-[50%] w-full max-w-[450px] text-center md:text-left">
                    <div className="flex items-center font-semibold text-3xl mb-6 justify-center md:justify-start">
                        <img src="./icon.png" alt="Kriya" className="w-[60px] h-[60px] rounded-[14px] mr-3 border border-gray-200 shadow-sm"/>
                        <span className="font-instrument italic font-medium tracking-normal">kriya</span>
                    </div>
                    <h1 className="font-display md:text-[2.46rem] text-[1.93rem] font-bold leading-tight mb-4 text-gray-900">Get Spiritually Productive</h1>
                    <p className="text-base text-gray-600 mb-6 leading-relaxed"><span className="font-instrument italic font-extrabold tracking-normal text-xl bg-amber-100 rounded-lg px-2 py-1">kriya</span> blends timeless wisdom from the Gita with modern design to help you act with clarity.
                        <br/><br/>Plan your day, one mindful task at a time.</p>
                    <div className="flex flex-col md:flex-row gap-2 mt-6 items-center md:items-start md:justify-start justify-center mb-9">
                        <a href="https://play.google.com/store/apps/details?id=com.surya7314.kriya" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity">
                            <img src="/playstore2.avif" alt="Get it on Google Play" className="w-36 h-10 object-contain" />
                        </a>
                        <a href="https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity">
                            <img src="/appstore1.avif" alt="Download on the App Store" className="w-36 h-10 object-contain" />
                        </a>
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
                    <img src="/image2.png" alt="Amy Food Journal App Preview" className="w-full h-auto rounded-xl shadow-lg "/>
                </div>


            </main>
        </div>
)     
}
