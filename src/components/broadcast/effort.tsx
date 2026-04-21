const oneTime = [
  { label: "Setup call", time: "15 min" },
  { label: "Voice sample (phone memo, quiet room)", time: "10 min" },
  { label: "Sign voice-usage agreement", time: "2 min" },
];

const weekly = [
  { label: "Watch a 3-min Loom of our draft episodes", time: "3 min" },
  { label: "Reply 👍 or 'skip this one' in Telegram", time: "2 min" },
];

export function Effort() {
  return (
    <section className="relative py-32 px-5 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(232,178,74,0.05),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
              The trade · Founder effort
            </div>
            <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
              27 minutes once.
              <br />
              <span className="text-[#e8b24a]">5 minutes per week.</span>
            </h2>
            <p className="mt-8 text-white/65 text-base md:text-lg leading-relaxed max-w-lg">
              Every other service asks you for an hour of voice notes a week.
              We mine your existing tweets, whitepapers, interviews and
              Telegram messages for source material. Orbit asks the follow-ups.
              You review. That&apos;s it.
            </p>
          </div>

          <div className="space-y-px bg-white/5">
            <div className="bg-black p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-6">
                One-time setup · Total ≈ 27 min
              </div>
              <div className="space-y-4">
                {oneTime.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-3"
                  >
                    <span className="text-white/80 text-sm md:text-base">
                      {row.label}
                    </span>
                    <span className="font-[family-name:var(--font-clash-display)] text-lg text-[#e8b24a] font-semibold whitespace-nowrap">
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-6">
                Weekly · Total ≈ 5 min
              </div>
              <div className="space-y-4">
                {weekly.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-3"
                  >
                    <span className="text-white/80 text-sm md:text-base">
                      {row.label}
                    </span>
                    <span className="font-[family-name:var(--font-clash-display)] text-lg text-[#e8b24a] font-semibold whitespace-nowrap">
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/40">
                ≤ 260 min / year from you · 260 episodes from us
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
