const pilotFeatures = [
  "1 full fireside episode (you + Orbit)",
  "Thread + vertical Short + LinkedIn post",
  "Branded cover art + show setup",
  "Live on Spotify, Apple, YouTube in 7 days",
  "Cofounder Test: 3 blind listeners must agree it sounds like you",
  "Fails the test? Full refund. You keep the files.",
];

const paidFeatures = [
  "3 fireside episodes / week (Mon · Wed · Fri)",
  "Published to all 5 channels",
  "Orbit AI producer asks the follow-ups",
  "Sourced from your past content + this week's news",
  "Weekly 3-min Loom review (that's it)",
  "Month-to-month. Cancel in one message.",
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            Pricing
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            $497 refundable pilot.
            <br />
            <span className="text-white/40">$500 for month 1 when it passes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          <div className="bg-black p-10 flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
              Pilot
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-[family-name:var(--font-clash-display)] text-6xl md:text-7xl text-white font-semibold">
                $497
              </span>
              <span className="text-white/40 text-xs">refundable · 7 days</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              One episode. Fully produced. Refunded in full if the Cofounder Test fails.
            </p>

            <ul className="space-y-3 mb-10 flex-1">
              {pilotFeatures.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-sm text-white/80 leading-relaxed"
                >
                  <span className="mt-[7px] h-1 w-1 rounded-full bg-[#e8b24a] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              Reserve pilot slot
              <span className="ml-2">→</span>
            </a>
          </div>

          <div className="relative bg-[#e8b24a]/[0.06] ring-1 ring-inset ring-[#e8b24a]/30 p-10 flex flex-col">
            <div className="absolute -top-3 left-10 px-3 py-1 bg-[#e8b24a] text-black text-[10px] uppercase tracking-[0.18em] font-semibold">
              After the pilot
            </div>

            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
              Autopilot
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-[family-name:var(--font-clash-display)] text-6xl md:text-7xl text-white font-semibold">
                $997
              </span>
              <span className="text-white/50 text-sm">/ month</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Month 1 bills $500 (your $497 pilot credits). MWF cadence. 5 min/wk of your time. Cancel anytime.
            </p>

            <ul className="space-y-3 mb-10 flex-1">
              {paidFeatures.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-sm text-white/85 leading-relaxed"
                >
                  <span className="mt-[7px] h-1 w-1 rounded-full bg-[#e8b24a] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-full bg-[#e8b24a] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#f5d48a]"
            >
              Start Autopilot
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.22em] text-white/30">
          Voice cloning included · consent-based · watermarked · revocable anytime
        </div>

        <div className="mt-4 text-center text-xs text-white/40">
          Need daily episodes, crisis-response, or a pre-TGE blitz?{" "}
          <a
            href={mailto}
            className="text-white/60 underline decoration-white/20 underline-offset-2 hover:text-[#e8b24a]"
          >
            Talk to us about custom scope
          </a>
          .
        </div>
      </div>
    </section>
  );
}
