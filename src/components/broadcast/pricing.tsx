const tiers = [
  {
    name: "Pilot",
    price: "Free",
    cadence: "one-time · 7 days",
    pitch: "Proof of quality before any money changes hands.",
    features: [
      "1 fireside episode (you + Orbit)",
      "Thread + vertical Short + LinkedIn post",
      "Branded cover art + show setup",
      "Live on Spotify, Apple, YouTube in 7 days",
      "You keep everything, even if you walk",
    ],
    highlight: false,
    cta: "Claim pilot",
  },
  {
    name: "Autopilot",
    price: "$997",
    cadence: "/ month",
    pitch: "The impulse tier. Near-zero founder effort, daily presence.",
    features: [
      "3 fireside episodes / week (Mon · Wed · Fri)",
      "Distributed across all 6 channels",
      "Sourced from your past content + news beat",
      "Orbit AI producer asks the follow-ups",
      "5 min / week of your time (Loom review)",
      "Month-to-month · cancel in one message",
    ],
    highlight: true,
    badge: "Lead offer",
    cta: "Start Autopilot",
  },
  {
    name: "Broadcast",
    price: "$4,997",
    cadence: "/ month",
    pitch: "Full narrative desk. For founders who want the whole engine.",
    features: [
      "5 fireside episodes / week",
      "The Narrative Desk — weekly topic brief from Gravity",
      "Kaito Studio positioning consult",
      "Monthly live X Space (hosted by Orbit)",
      "Custom audio brand + stingers",
      "Dedicated narrative lead",
    ],
    highlight: false,
    cta: "Scale to Broadcast",
  },
  {
    name: "Frequency",
    price: "$9,997",
    cadence: "/ month",
    pitch: "Pre-TGE blitz. Daily presence, total narrative ownership.",
    features: [
      "Daily episodes (7 / week)",
      "Real-time news-reaction desk",
      "Crisis-response on standby",
      "Newsletter + monthly long-form",
      "Custom KOL + Space booking",
      "Direct Gravity partner contact",
    ],
    highlight: false,
    cta: "Go to Frequency",
  },
];

type PricingProps = {
  leadCta?: string;
};

export function Pricing({ leadCta }: PricingProps) {
  const mailto =
    leadCta ??
    "mailto:hello@gravitylabs.xyz?subject=Gravity%20Broadcast%20Pilot";
  return (
    <section id="pricing" className="relative py-32 px-5 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Pricing · 4 tiers
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            Free pilot.
            <br />
            <span className="text-white/40">Then a tier that fits your stage.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative p-8 flex flex-col ${
                t.highlight
                  ? "bg-[#e8b24a]/[0.06] ring-1 ring-inset ring-[#e8b24a]/30"
                  : "bg-black"
              }`}
            >
              {t.highlight && t.badge ? (
                <div className="absolute -top-3 left-8 px-3 py-1 bg-[#e8b24a] text-black text-[10px] uppercase tracking-[0.18em] font-semibold">
                  {t.badge}
                </div>
              ) : null}

              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
                {t.name}
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-[family-name:var(--font-clash-display)] text-4xl lg:text-5xl text-white font-semibold">
                  {t.price}
                </span>
                {t.cadence ? (
                  <span className="text-white/40 text-xs">{t.cadence}</span>
                ) : null}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {t.pitch}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-[13px] text-white/75 leading-relaxed"
                  >
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-[#e8b24a] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={mailto}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
                  t.highlight
                    ? "bg-[#e8b24a] text-black hover:bg-[#f5d48a]"
                    : "border border-white/15 text-white hover:bg-white/[0.06]"
                }`}
              >
                {t.cta}
                <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-[11px] uppercase tracking-[0.22em] text-white/30 text-center">
          All tiers include voice cloning setup · consent-based · revocable · watermarked
        </div>
      </div>
    </section>
  );
}
