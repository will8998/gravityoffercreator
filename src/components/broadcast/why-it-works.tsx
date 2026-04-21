const reasons = [
  {
    number: "01",
    headline: "You don't have time.",
    sub: "We mine your past tweets, whitepapers and interviews. Orbit adds the follow-ups. You review.",
  },
  {
    number: "02",
    headline: "AI made volume cheap. Taste is scarce.",
    sub: "Every episode is human-edited, crypto-native, scripted from your real thinking — not a prompt.",
  },
  {
    number: "03",
    headline: "One input. Twenty outputs.",
    sub: "30 min of voice notes becomes 20 pieces of content across 6 channels — every week, automatic.",
  },
];

export function WhyItWorks() {
  return (
    <section className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Why this works
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            Three reasons.
            <br />
            <span className="text-white/40">That&apos;s it.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {reasons.map((r) => (
            <div
              key={r.number}
              className="bg-black p-8 md:p-10 transition hover:bg-white/[0.02]"
            >
              <div className="font-[family-name:var(--font-clash-display)] text-5xl text-[#e8b24a]/40 font-semibold mb-6">
                {r.number}
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold leading-tight mb-3">
                {r.headline}
              </h3>
              <p className="text-white/65 leading-relaxed text-sm md:text-base">
                {r.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
