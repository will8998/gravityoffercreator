"use client"

import Link from "next/link"

export function Footer() {
  const scrollToTop = () => {
    document.querySelector('#nav')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-black">
      {/* Large CTA Section */}
      <section className="py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Location Text */}
            <p className="text-[#808080] uppercase tracking-widest text-sm font-[family-name:var(--font-inter)]">
              BASED IN AUSTRALIA, SERVING WORLDWIDE
            </p>

            {/* Main CTA Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight font-[family-name:var(--font-clash-display)] max-w-5xl mx-auto">
                MAKING YOUR WEB3 PROJECT PULL LIKE GRAVITY
              </h1>
              <p className="text-xl lg:text-2xl text-[rgba(255,255,255,0.6)] font-[family-name:var(--font-inter)] max-w-2xl mx-auto">
                The Web3 Content Engine Behind 7-Figure Token Projects.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link
                href="https://t.me/gravitylabsport"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border border-[#161616] text-white rounded-full hover:border-[#292929] hover:bg-[#0a0a0a] transition-all duration-300 font-[family-name:var(--font-inter)] flex items-center space-x-3"
              >
                <span>Check out our work</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="https://t.me/wazukimusashi"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border border-[#14c700] bg-[#14c700] text-black rounded-full hover:bg-transparent hover:text-[#14c700] transition-all duration-300 font-[family-name:var(--font-inter)] font-bold flex items-center space-x-3"
              >
                <span>CHAT WITH US</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Section */}
      <section className="relative py-16 border-t border-[#161616]">
        {/* Background Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="text-[180px] lg:text-[240px] font-bold text-[rgba(255,255,255,0.02)] leading-none font-[family-name:var(--font-clash-display)]">
            GRAVITY
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Left Side - Copyright */}
            <div className="flex items-center space-x-2">
              <span className="text-[#808080] font-[family-name:var(--font-inter)]">
                ©2025 GRAVITY LABS
              </span>
              <span className="text-[#808080]">•</span>
              <Link
                href="https://x.com/MandroDesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#808080] hover:text-white transition-colors duration-300 font-[family-name:var(--font-inter)]"
              >
                @MandroDesign
              </Link>
            </div>

            {/* Right Side - Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-[#808080] hover:text-white transition-colors duration-300 font-[family-name:var(--font-inter)]"
            >
              <span>Back To Top</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="transform group-hover:-translate-y-1 transition-transform duration-300"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </footer>
  )
}