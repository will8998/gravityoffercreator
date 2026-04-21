const steps = [
  {
    num: "Day 0",
    title: "Reply.",
    desc: "15-min call. Voice sample from your phone. Sign consent. Done.",
  },
  {
    num: "Day 1–2",
    title: "We clone.",
    desc: "ElevenLabs Pro. Watermarked. Locked to you. Revocable.",
  },
  {
    num: "Day 3–5",
    title: "We produce.",
    desc: "Fireside ep + thread + Short + LinkedIn post + cover art.",
  },
  {
    num: "Day 7",
    title: "Live.",
    desc: "Spotify, Apple, YouTube, X. You publish. We never touch your handles.",
  },
];

export function PilotFlow() {
  return (
    <section id="pilot" className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Free pilot · 7 days · No credit card
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            Your first episode.
            <br />
            <span className="text-white/40">On us. Yours to keep.</span>
          </h2>
          <p className="mt-6 text-white/65 text-base md:text-lg max-w-xl leading-relaxed">
            We only pilot for founders we&apos;ve handpicked. See the full
            product before you spend a dollar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative bg-black p-8 transition hover:bg-white/[0.02]"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#e8b24a] mb-5">
                {s.num}
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold mb-3 leading-none">
                {s.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">{s.desc}</p>
              <div className="absolute top-6 right-6 text-white/15 text-xs font-mono">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            No credit card
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Voice-usage agreement included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Walk away with the files
          </span>
        </div>
      </div>
    </section>
  );
}
