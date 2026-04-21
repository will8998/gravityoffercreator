const rows = [
  {
    label: "Monthly cost",
    gravity: "$997",
    contentghost: "$4,500",
    tools: "$150",
    highlight: true,
  },
  {
    label: "Founder time / week",
    gravity: "5 min",
    contentghost: "30+ min",
    tools: "5+ hours (DIY)",
  },
  {
    label: "Output / week",
    gravity: "20 assets, 6 channels",
    contentghost: "~25 tweets, X only",
    tools: "1 podcast, 1 channel",
  },
  {
    label: "In founder's own voice",
    gravity: "Yes — cloned",
    contentghost: "Ghostwritten text",
    tools: "Optional clone",
  },
  {
    label: "Web3 editorial taste",
    gravity: "Native",
    contentghost: "Generalist (4 verticals)",
    tools: "Generic",
  },
  {
    label: "Multi-channel distribution",
    gravity: "6 channels, automated",
    contentghost: "X only",
    tools: "Podcast apps only",
  },
  {
    label: "Anti-slop guarantee",
    gravity: "Source-cited, recomposed",
    contentghost: "Human-written",
    tools: "Fully AI-generated",
  },
  {
    label: "Onboarding",
    gravity: "15 min intake → live in 7 days",
    contentghost: "Waitlist",
    tools: "Self-serve, figure it out",
  },
];

export function Compare() {
  return (
    <section className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            The honest comparison
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            Why $997 is the
            <br />
            <span className="text-white/40">obvious choice.</span>
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[700px] text-sm md:text-base">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10">
                <th className="text-left p-5 text-[10px] uppercase tracking-[0.22em] text-white/40 font-normal">
                  &nbsp;
                </th>
                <th className="text-left p-5 bg-[#e8b24a]/[0.08] border-l border-r border-[#e8b24a]/20">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#e8b24a] mb-1">
                    Gravity Broadcast
                  </div>
                  <div className="font-[family-name:var(--font-clash-display)] text-xl text-white font-semibold">
                    $997 / mo
                  </div>
                </th>
                <th className="text-left p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">
                    ContentGhost
                  </div>
                  <div className="font-[family-name:var(--font-clash-display)] text-xl text-white/60 font-semibold">
                    $4,500 / mo
                  </div>
                </th>
                <th className="text-left p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">
                    DIY tools
                  </div>
                  <div className="font-[family-name:var(--font-clash-display)] text-xl text-white/60 font-semibold">
                    $25–$150 / mo
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.label}
                  className={`border-b border-white/5 ${i === rows.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="p-5 text-white/50 text-sm">{r.label}</td>
                  <td
                    className={`p-5 bg-[#e8b24a]/[0.04] border-l border-r border-[#e8b24a]/10 ${r.highlight ? "font-[family-name:var(--font-clash-display)] text-lg font-semibold" : ""} text-white`}
                  >
                    {r.gravity}
                  </td>
                  <td className="p-5 text-white/55">{r.contentghost}</td>
                  <td className="p-5 text-white/55">{r.tools}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-[11px] uppercase tracking-[0.22em] text-white/30">
          Pricing verified from competitor websites · April 2026 · Deeper analysis in /docs/goliath-report
        </div>
      </div>
    </section>
  );
}
