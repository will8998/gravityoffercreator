const steps = [
  {
    num: "01",
    label: "Voice note",
    title: "Send. From anywhere.",
    desc: "Phone voice memo. Airport, gym, between calls. 30 min / week total. No scripts.",
  },
  {
    num: "02",
    label: "Clone + edit",
    title: "Studio-grade, in your voice.",
    desc: "Your consent-based voice clone + human editors script 5 episodes from one session.",
  },
  {
    num: "03",
    label: "Publish",
    title: "Daily. Six channels.",
    desc: "Spotify, Apple, YouTube, X, LinkedIn, TikTok. You don't touch a thing.",
  },
  {
    num: "04",
    label: "Repurpose",
    title: "20 assets / week.",
    desc: "Each episode → thread + Short + LinkedIn post. Every platform, every cadence.",
  },
];

export function Pipeline() {
  return (
    <section id="how" className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            How it works · 60 seconds
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            One voice note.
            <br />
            <span className="text-white/40">Twenty assets.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group relative bg-black p-8 transition hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-[family-name:var(--font-clash-display)] text-4xl text-[#e8b24a]/40 font-semibold">
                  {s.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {s.label}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-xl md:text-2xl text-white font-semibold mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
