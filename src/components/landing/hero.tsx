export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-5">
      {/* Main GRAVITY Text Stack */}
      <div className="text-center mb-12">
        <div className="font-[family-name:var(--font-clash-display)] font-bold text-white leading-none">
          <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] opacity-100">
            GRAVITY
          </div>
          <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] opacity-90 -mt-4 md:-mt-8">
            GRAVITY
          </div>
          <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] opacity-80 -mt-4 md:-mt-8">
            GRAVITY
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="text-center space-y-4">
        {/* Location */}
        <div className="font-[family-name:var(--font-inter)]">
          <span className="text-sm uppercase tracking-wide text-[rgba(255,255,255,0.6)]">
            BASED IN Melbourne,
          </span>{" "}
          <span className="text-sm italic text-[rgba(255,255,255,0.6)]">
            australia
          </span>
        </div>

        {/* Verified Clients Badge */}
        <div className="flex items-center justify-center gap-2 font-[family-name:var(--font-inter)]">
          <div className="w-2 h-2 rounded-full bg-[#14c700]"></div>
          <span className="text-sm uppercase tracking-wide text-white">
            VERIFIED CLIENTS
          </span>
        </div>

        {/* FDV Text */}
        <div className="font-[family-name:var(--font-clash-display)] font-bold text-white text-lg">
          Combined 1 BILLION FDV
        </div>
      </div>
    </section>
  );
}