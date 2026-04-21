type CtaProps = {
  mailto?: string;
  headline?: string;
  sub?: string;
};

export function CTA({
  mailto = "mailto:hello@gravitylabs.xyz?subject=Gravity%20Broadcast%20Pilot",
  headline = "Want your voice published daily?",
  sub = "Two-week pilot. If the first episode doesn't sound like you, you don't pay.",
}: CtaProps) {
  return (
    <section className="relative py-32 px-5 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,178,74,0.08),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-6">
          05 / Pilot
        </div>
        <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-[1.02]">
          {headline}
        </h2>
        <p className="mt-8 text-white/70 max-w-2xl mx-auto text-lg">{sub}</p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={mailto}
            className="group inline-flex items-center justify-center rounded-full bg-[#e8b24a] px-8 py-3.5 text-sm font-medium text-black transition hover:bg-[#f5d48a]"
          >
            Book a 20-minute call
            <span className="ml-2 transition group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="https://t.me/gravitylabs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/[0.06]"
          >
            Telegram us
          </a>
        </div>

        <div className="mt-16 text-[11px] uppercase tracking-[0.22em] text-white/30">
          Gravity Labs · Melbourne · Serving worldwide
        </div>
      </div>
    </section>
  );
}
