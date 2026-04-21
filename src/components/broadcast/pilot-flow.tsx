const steps = [
  {
    num: "Day 0",
    title: "Reply to our note.",
    desc: "We've already done the homework. 15-min call to confirm narrative direction, agree on voice-usage consent, and collect one 10-minute voice sample from your phone.",
  },
  {
    num: "Day 1–2",
    title: "Your voice is cloned.",
    desc: "Consent-based clone trained on ElevenLabs Pro. Locked to your Gravity account. Watermarked, revocable, never re-used.",
  },
  {
    num: "Day 3–5",
    title: "We ship a full episode package.",
    desc: "1 × 10-min fireside chat (you + Orbit, our AI producer) + 1 thread + 1 vertical short + 1 LinkedIn post + cover art. All branded for your project.",
  },
  {
    num: "Day 7",
    title: "Live on your channels.",
    desc: "Published to Spotify, Apple, YouTube, X (as Space), LinkedIn. You publish. We don't touch your handles.",
  },
];

export function PilotFlow() {
  return (
    <section id="pilot" className="relative py-32 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Free pilot · 7 days
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            Your first episode.
            <br />
            <span className="text-white/40">On us.</span>
          </h2>
          <p className="mt-8 text-white/65 text-lg max-w-2xl leading-relaxed">
            We only run pilots for founders we&apos;ve already handpicked.
            You&apos;ll see what the full product looks like before you spend a
            dollar. If it doesn&apos;t sound like you, we walk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative bg-black p-8 transition hover:bg-white/[0.02]"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#e8b24a] mb-6">
                {s.num}
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-xl md:text-2xl text-white font-semibold mb-4 leading-tight">
                {s.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">{s.desc}</p>
              <div className="absolute top-6 right-6 text-white/20 text-xs font-mono">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 text-xs">
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
            Refund not needed — it&apos;s free
          </span>
        </div>
      </div>
    </section>
  );
}
