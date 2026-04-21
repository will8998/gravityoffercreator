export function OnePost() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Number */}
        <div className="absolute top-8 left-6 text-8xl font-[family-name:var(--font-clash-display)] font-black text-[#292929] select-none">
          03
        </div>
        
        {/* Section Labels */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-12">
          <p className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] uppercase tracking-wider">
            {"//Who Am I"}
          </p>
          <div className="hidden md:block w-px h-6 bg-[#161616]" />
          <p className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wider">
            Since 2000
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-16">
          <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-[family-name:var(--font-clash-display)] font-black text-white leading-[0.85] tracking-tight">
            <div className="overflow-hidden">
              <span className="block">ONE POST.</span>
            </div>
            <div className="overflow-hidden">
              <span className="block">ONE VIDEO.</span>
            </div>
            <div className="overflow-hidden">
              <span className="block text-[#14c700]">EVERYDAY.</span>
            </div>
          </h2>
        </div>

        <div className="max-w-4xl">
          {/* Blockquote */}
          <blockquote className="relative mb-16 pl-8 border-l-4 border-[#14c700]">
            <p className="text-3xl md:text-4xl font-[family-name:var(--font-clash-display)] font-bold text-white leading-tight">
              {"\"Your presence becomes algorithmic.\""}
            </p>
            <div className="absolute -left-2 top-0 w-4 h-4 bg-[#14c700] rotate-45" />
          </blockquote>

          {/* Body Text */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.7)] leading-relaxed">
              We replace your in-house content team, creative director, and social strategist, then outperform them.
            </p>
            
            <div className="pt-8 border-t border-[#161616]">
              <p className="text-lg font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] leading-relaxed">
                Every piece of content is engineered to build momentum. Every video crafted to stop the scroll.
                Your brand becomes inevitable—not because you&apos;re everywhere, but because everywhere feels empty without you.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
          <div className="w-full h-full border border-[#14c700] rotate-45 transform translate-x-32 translate-y-32" />
          <div className="absolute top-8 left-8 w-full h-full border border-white rotate-45" />
        </div>
      </div>
    </section>
  );
}