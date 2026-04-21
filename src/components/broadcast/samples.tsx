import { leads } from "@/lib/leads";

type SamplesProps = {
  highlightSlug?: string;
};

export function Samples({ highlightSlug }: SamplesProps) {
  return (
    <section className="relative py-32 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
              03 / Reference voices
            </div>
            <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
              These founders already
              <br />
              <span className="text-white/40">have the voice.</span>
            </h2>
            <p className="mt-6 text-white/60 max-w-xl leading-relaxed">
              Every lead below has published voice samples we can clone and
              scale into a daily show. Gravity Broadcast doesn&apos;t generate
              founders — we amplify the ones already saying something worth
              hearing.
            </p>
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/30">
            Public samples · editorial-grade cloning
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
          {leads.map((lead) => {
            const isHighlight = lead.slug === highlightSlug;
            return (
              <div
                key={lead.slug}
                className={`relative p-8 md:p-10 transition ${
                  isHighlight
                    ? "bg-[#e8b24a]/[0.06] ring-1 ring-inset ring-[#e8b24a]/30"
                    : "bg-black hover:bg-white/[0.02]"
                }`}
              >
                {isHighlight ? (
                  <div className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.22em] text-[#e8b24a]">
                    ← This is you
                  </div>
                ) : null}

                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {lead.narrative}
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-clash-display)] text-2xl md:text-3xl text-white font-semibold leading-tight">
                  {lead.name}
                </h3>
                <div className="mt-1 text-white/50 text-sm">
                  {lead.title} · {lead.project}
                </div>

                <p className="mt-5 text-white/70 leading-relaxed text-sm">
                  {lead.observation}
                </p>

                <a
                  href={lead.voiceSampleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/80 transition hover:bg-white/[0.08]"
                >
                  <PlayIcon />
                  <span className="truncate max-w-[280px]">
                    {lead.voiceSampleLabel}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 1v8l7-4z" fill="#e8b24a" />
    </svg>
  );
}
