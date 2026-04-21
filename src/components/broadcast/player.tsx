import type { Lead } from "@/lib/leads";

type PlayerProps = {
  lead: Lead;
};

export function LeadPlayer({ lead }: PlayerProps) {
  if (!lead.embed) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3">
          Reference sample
        </div>
        <a
          href={lead.voiceSampleUrl}
          target="_blank"
          rel="noreferrer"
          className="font-[family-name:var(--font-clash-display)] text-xl text-white hover:text-[#e8b24a] transition block leading-snug"
        >
          {lead.voiceSampleLabel} ↗
        </a>
        <div className="mt-2 text-white/50 text-sm">{lead.podcastAppearance}</div>
      </div>
    );
  }

  const { kind, src } = lead.embed;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#e8b24a]">
          {kind === "apple"
            ? "Apple Podcasts · reference sample"
            : kind === "spotify"
              ? "Spotify · reference sample"
              : kind === "youtube"
                ? "YouTube · reference sample"
                : "Reference sample"}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/30">
          {lead.podcastAppearance}
        </div>
      </div>

      {kind === "spotify" ? (
        <iframe
          src={src}
          width="100%"
          height="232"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      ) : kind === "apple" ? (
        <iframe
          src={src}
          width="100%"
          height="175"
          frameBorder="0"
          allow="autoplay *; encrypted-media *; clipboard-write"
          loading="lazy"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          className="rounded-xl"
        />
      ) : kind === "youtube" ? (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <iframe
            src={src}
            title={lead.voiceSampleLabel}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : kind === "buzzsprout" ? (
        <iframe
          src={src}
          width="100%"
          height="100"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          className="rounded-xl"
        />
      ) : null}

      <div className="mt-4 text-xs text-white/50">
        This is {lead.firstName}&apos;s real voice on{" "}
        <a
          href={lead.voiceSampleUrl}
          target="_blank"
          rel="noreferrer"
          className="text-white/80 underline decoration-white/20 underline-offset-2 hover:text-[#e8b24a]"
        >
          {lead.podcastAppearance}
        </a>
        . The fireside we produce would sound like this — five times a week,
        scripted for {lead.project}.
      </div>
    </div>
  );
}
