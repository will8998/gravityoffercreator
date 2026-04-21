const channels = [
  {
    name: "Spotify / Apple",
    format: "Full fireside",
    length: "10–15 min",
    why: "SEO-indexed transcripts. Audience discovery engine of the podcast ecosystem.",
    icon: "◉",
  },
  {
    name: "YouTube",
    format: "Video w/ waveform",
    length: "10–15 min",
    why: "Second-largest search engine. Clips auto-pulled into Shorts for algo lift.",
    icon: "▶",
  },
  {
    name: "X (Spaces)",
    format: "Recorded Space post",
    length: "10–15 min",
    why: "Native crypto distribution. Packaged as '🎙️ Fireside: [You] × Orbit'.",
    icon: "𝕏",
  },
  {
    name: "LinkedIn",
    format: "Post + audio",
    length: "Hook + 3 beats",
    why: "VC and institutional eyes. Where your next allocator will see you.",
    icon: "✦",
  },
  {
    name: "Telegram",
    format: "Native voice note",
    length: "60–90 sec",
    why: "Direct to your holder channel. Feels personal, unscales otherwise.",
    icon: "◆",
  },
];

export function Multichannel() {
  return (
    <section className="relative py-32 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Distribution · 5 channels
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            One fireside.
            <br />
            <span className="text-white/40">Five channels.</span>
          </h2>
          <p className="mt-8 text-white/65 text-lg max-w-2xl leading-relaxed">
            Every episode is produced once and published everywhere your
            audience lives. Different platforms, same voice — algorithmic
            compounding across the stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {channels.map((c) => (
            <div
              key={c.name}
              className="bg-black p-8 transition hover:bg-white/[0.02]"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-3xl text-[#e8b24a]/60 leading-none">
                  {c.icon}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {c.length}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-clash-display)] text-xl text-white font-semibold mb-2">
                {c.name}
              </h3>
              <div className="text-white/50 text-sm mb-4">{c.format}</div>
              <p className="text-white/60 leading-relaxed text-sm">{c.why}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-[11px] uppercase tracking-[0.22em] text-white/40">
          1 voice note in · 1 fireside · 5 platforms · ~15 assets per week
        </div>
      </div>
    </section>
  );
}
