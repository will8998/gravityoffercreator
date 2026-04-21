const reasons = [
  {
    label: "The bottleneck",
    title: "Founders don't lack ideas — they lack time.",
    body:
      "Every technical founder we speak to has 10× more thinking than they publish. The daily cost of being absent from the feed is compounding mindshare to whoever fills the silence. Usually that's someone with half your depth.",
  },
  {
    label: "The scarce thing",
    title: "AI made volume trivial. Taste is the moat.",
    body:
      "A thousand agencies can generate a thousand tweets. Almost none can tell a cross-chain staking thesis without sounding like a press release. Gravity's editorial layer is human-led, crypto-native, and paid to sound like you — not like ChatGPT wearing a suit.",
  },
  {
    label: "The economics",
    title: "Your 30 minutes is worth ~$8,000.",
    body:
      "That's what founders pay in-house content leads, and they still ghost the feed for six days at a stretch. Broadcast turns 30 minutes of your voice into 20 pieces of content — one input, ten ambient channels.",
  },
];

export function WhyItWorks() {
  return (
    <section className="relative py-32 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            01 / The thesis
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            The age of slop
            <br />
            <span className="text-white/40">made voice expensive.</span>
          </h2>
        </div>

        <div className="space-y-px bg-white/5">
          {reasons.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 bg-black p-8 md:p-12 transition hover:bg-white/[0.02]"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#e8b24a]">
                  {r.label}
                </div>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold leading-tight mb-4">
                  {r.title}
                </h3>
                <p className="text-white/65 leading-relaxed text-base max-w-2xl">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
