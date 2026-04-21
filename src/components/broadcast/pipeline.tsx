const steps = [
  {
    num: "01",
    label: "Voice Note",
    title: "30 min / week, whenever.",
    desc: "You open Telegram, send us stream-of-consciousness. Airport, walking, between meetings. No scripts. No recording setup.",
  },
  {
    num: "02",
    label: "Clone + Edit",
    title: "Your voice, studio-grade.",
    desc: "Your voice model is trained once, under consent, locked to Gravity. Our editors script, splice, and polish five distinct 2–5 min episodes from that one session.",
  },
  {
    num: "03",
    label: "Publish",
    title: "Daily feed. Spotify, Apple, YouTube.",
    desc: "Branded cover art, show notes, RSS feed. Your feed starts compounding from day one — the crypto founders show is now yours.",
  },
  {
    num: "04",
    label: "Repurpose",
    title: "One episode, four formats.",
    desc: "Each episode becomes a thread, a vertical short, a LinkedIn post, and a newsletter blurb. Every platform hears you at the cadence it rewards.",
  },
];

export function Pipeline() {
  return (
    <section id="how" className="relative py-32 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            02 / How it works
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            One voice note in.
            <br />
            <span className="text-white/40">Twenty assets out.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group relative bg-black p-8 md:p-10 transition hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-[family-name:var(--font-clash-display)] text-5xl text-[#e8b24a]/40 font-semibold">
                  {s.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {s.label}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold mb-4 leading-tight">
                {s.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
