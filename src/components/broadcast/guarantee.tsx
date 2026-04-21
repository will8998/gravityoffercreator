const pillars = [
  {
    label: "Source",
    title: "Your past tweets.",
    desc: "Every episode traces to something you've already said publicly — tweet, whitepaper, podcast quote. No invented opinions.",
  },
  {
    label: "Production",
    title: "Recomposed, not generated.",
    desc: "AI restructures your existing thinking into new formats. Orbit asks the follow-ups. Human editors reject anything that can't cite a source in you.",
  },
  {
    label: "Result",
    title: "Slop-proof by construction.",
    desc: "No prompt engineering. No hallucinated takes. No ChatGPT-wearing-a-suit voice. Just you, scaled.",
  },
];

export function Guarantee() {
  return (
    <section className="relative py-24 px-5 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(232,178,74,0.04),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 max-w-4xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            The anti-slop guarantee
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.02]">
            Every line traces back
            <br />
            <span className="text-[#e8b24a]">to something you already said.</span>
          </h2>
          <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-2xl">
            Your past tweets, whitepapers and interviews are the source. Orbit
            asks the follow-ups. Human editors reject anything that can&apos;t
            cite you. Slop-proof by construction, not marketing. And we prove
            it with the <span className="text-white">Cofounder Test</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="bg-black p-8 md:p-10 transition hover:bg-white/[0.02]"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#e8b24a] mb-5">
                {p.label}
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold leading-tight mb-4">
                {p.title}
              </h3>
              <p className="text-white/65 leading-relaxed text-sm md:text-base">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[#e8b24a]/20 bg-[#e8b24a]/[0.04] p-8 md:p-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            The Cofounder Test
          </div>
          <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold leading-tight mb-4">
            3 blind listeners. You approve, or we refund.
          </h3>
          <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-3xl">
            Before we bill anything, we send a 30-second A/B clip to 3
            podcast-listeners who don&apos;t know you. Half the clip is your
            real voice, half is the clone, cut together. If 2 of 3 correctly
            identify the clone, we don&apos;t bill. Your $497 pilot fee is
            refunded in full. You keep the files. The clone is deleted.
            That&apos;s the whole guarantee.
          </p>
          <p className="text-white/50 text-xs md:text-sm mt-4">
            Optional: name your own 3 contacts instead of ours.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e8b24a]/30 bg-[#e8b24a]/5 px-3 py-1.5 text-[#e8b24a]">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Every episode source-cited
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Human editor rejects any un-grounded draft
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            FTC-compliant disclosure on every episode
          </span>
        </div>
      </div>
    </section>
  );
}
