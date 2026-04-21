const steps = [
  {
    num: "Day 0",
    title: "Reply.",
    desc: "15-min call. Sign consent. Pay $497 via Stripe — refundable if the Cofounder Test fails.",
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
    title: "Live + Cofounder Test.",
    desc: "Live on 5 channels. Blind A/B clip goes to 3 listeners. They decide.",
  },
];

export function PilotFlow() {
  return (
    <section id="pilot" className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Paid pilot · 7 days · 100% refundable
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            $497 commits.
            <br />
            <span className="text-white/40">Refunds if it misses.</span>
          </h2>
          <p className="mt-6 text-white/65 text-base md:text-lg max-w-xl leading-relaxed">
            The $497 covers production. If 3 blind listeners can tell it&apos;s the
            clone, we refund everything and delete the voice model. If they can&apos;t,
            $497 credits toward month 1.
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
            Stripe refund if test fails
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Voice-usage agreement included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            $497 credits to month 1 if test passes
          </span>
        </div>
      </div>
    </section>
  );
}
