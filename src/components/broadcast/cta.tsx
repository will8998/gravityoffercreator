type CtaProps = {
  mailto?: string;
  headline?: string;
  sub?: string;
};

export function CTA({
  mailto = "mailto:hello@gravitylabs.xyz?subject=Gravity%20Broadcast%20Pilot",
  headline = "Reply. Get a podcast.",
  sub = "One email. Seven days later you have a daily-podcast-quality episode live in your voice. Free. No credit card. If you hate it, keep the files and walk.",
}: CtaProps) {
  return (
    <section className="relative py-32 px-5 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,178,74,0.12),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e8b24a]/30 bg-[#e8b24a]/[0.08] px-4 py-1.5 backdrop-blur mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e8b24a] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a]">
            5 pilots per month · 3 already claimed
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-[1.02]">
          {headline}
        </h2>
        <p className="mt-8 text-white/75 max-w-xl mx-auto text-lg">{sub}</p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={mailto}
            className="group inline-flex items-center justify-center rounded-full bg-[#e8b24a] px-10 py-4 text-base font-semibold text-black transition hover:bg-[#f5d48a] shadow-[0_0_40px_rgba(232,178,74,0.3)]"
          >
            Claim my free episode
            <span className="ml-2 transition group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://t.me/gravitylabs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-medium text-white/90 transition hover:bg-white/[0.06]"
          >
            Telegram us
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Free
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            No card
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Keep the files
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Live in 7 days
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Cancel in one message
          </span>
        </div>

        <div className="mt-16 text-[11px] uppercase tracking-[0.22em] text-white/20">
          Gravity Labs · Melbourne · Serving worldwide
        </div>
      </div>
    </section>
  );
}
