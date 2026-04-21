export function DreamTeam() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Number */}
        <div className="absolute top-8 left-6 text-8xl font-[family-name:var(--font-clash-display)] font-black text-[#292929] select-none">
          01
        </div>
        
        {/* Section Label */}
        <div className="mb-8">
          <p className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] uppercase tracking-wider">
            {"// THAT'S WHERE WE COME IN!"}
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-20">
          <h2 className="text-7xl md:text-8xl font-[family-name:var(--font-clash-display)] font-black text-white leading-[0.9] tracking-tight">
            WE ARE YOUR<br />
            DREAM TEAM
          </h2>
        </div>

        {/* Numbered Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="group">
            <div className="mb-6">
              <span className="text-4xl font-[family-name:var(--font-clash-display)] font-black text-[#292929] group-hover:text-[#14c700] transition-colors duration-300">
                01
              </span>
            </div>
            <div className="border-t border-[#161616] pt-6">
              <h3 className="text-xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-4">
                STRATEGY & VISION
              </h3>
              <p className="text-[rgba(255,255,255,0.6)] font-[family-name:var(--font-inter)] leading-relaxed">
                We decode your brand DNA and craft positioning that cuts through Web3 noise.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6">
              <span className="text-4xl font-[family-name:var(--font-clash-display)] font-black text-[#292929] group-hover:text-[#14c700] transition-colors duration-300">
                02
              </span>
            </div>
            <div className="border-t border-[#161616] pt-6">
              <h3 className="text-xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-4">
                CONTENT CREATION
              </h3>
              <p className="text-[rgba(255,255,255,0.6)] font-[family-name:var(--font-inter)] leading-relaxed">
                Daily content that transforms your timeline into a gravitational force.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6">
              <span className="text-4xl font-[family-name:var(--font-clash-display)] font-black text-[#292929] group-hover:text-[#14c700] transition-colors duration-300">
                03
              </span>
            </div>
            <div className="border-t border-[#161616] pt-6">
              <h3 className="text-xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-4">
                GROWTH EXECUTION
              </h3>
              <p className="text-[rgba(255,255,255,0.6)] font-[family-name:var(--font-inter)] leading-relaxed">
                Scale your influence across every platform that matters in Web3.
              </p>
            </div>
          </div>
        </div>

        {/* Descriptive Block */}
        <div className="max-w-4xl">
          <h3 className="text-5xl md:text-6xl font-[family-name:var(--font-clash-display)] font-black text-white mb-12 leading-[0.95]">
            WE WILL ELEVATE YOUR<br />
            WEB3 PRESENCE<br />
            <span className="text-[#14c700]">ON AUTOPILOT</span>
          </h3>
          
          <div className="space-y-4">
            <p className="text-2xl font-[family-name:var(--font-inter)] italic text-[rgba(255,255,255,0.8)] leading-relaxed">
              Command attention.
            </p>
            <p className="text-2xl font-[family-name:var(--font-inter)] italic text-[rgba(255,255,255,0.8)] leading-relaxed">
              Shape perception.
            </p>
            <p className="text-2xl font-[family-name:var(--font-inter)] italic text-[rgba(255,255,255,0.8)] leading-relaxed">
              Own the timeline.
            </p>
            <p className="text-2xl font-[family-name:var(--font-inter)] italic text-[#14c700] leading-relaxed">
              Create Gravity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}