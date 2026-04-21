"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const WaveScene = dynamic(
  () => import("./wave-scene").then((m) => m.WaveScene),
  { ssr: false }
);

type HeroProps = {
  eyebrow?: string;
  leadBadge?: { firstName: string; project: string };
  pilotCta?: string;
};

export function BroadcastHero({ eyebrow, leadBadge, pilotCta }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      <WaveScene />

      <div className="relative z-10 max-w-5xl w-full text-center">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8b24a]/30 bg-[#e8b24a]/[0.08] px-4 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8b24a] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a]">
              {eyebrow ?? "3 pilot slots · April 2026"}
            </span>
          </div>

          {leadBadge ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8b24a]/30 bg-[#e8b24a]/5 px-4 py-1.5">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a]">
                Prepared for {leadBadge.firstName} · {leadBadge.project}
              </span>
            </div>
          ) : null}
        </div>

        <h1 className="font-[family-name:var(--font-clash-display)] font-bold text-white leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[104px] tracking-tight">
          Your voice.
          <br />
          <span className="text-[#e8b24a]">Your takes.</span>
          <br />
          Your podcast.
        </h1>

        <p className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
          Your cloned voice becomes a Mon/Wed/Fri fireside on Spotify, Apple,
          YouTube, X and LinkedIn. <span className="text-white font-medium">$497 refundable pilot</span> — if it doesn&apos;t pass the Cofounder Test, you pay nothing and keep the files.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            5 min / week
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Cofounder Test guarantee
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            Your real voice
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
            100% refundable
          </span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={pilotCta ?? "#pilot"}
            className="group inline-flex items-center justify-center rounded-full bg-[#e8b24a] px-10 py-4 text-base font-semibold text-black transition hover:bg-[#f5d48a] shadow-[0_0_40px_rgba(232,178,74,0.3)]"
          >
            Reserve my pilot slot — $497
            <span className="ml-2 transition group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="#compare"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-8 py-4 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/[0.06]"
          >
            Compare to ContentGhost
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-white/5 pt-8">
          <Stat value="5 min" label="Of your time / week" />
          <Stat value="~15" label="Assets published / week" />
          <Stat value="5" label="Channels, always on" />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.3em]">
        <span>Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-[family-name:var(--font-clash-display)] text-2xl sm:text-3xl text-white font-semibold">
        {value}
      </div>
      <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/50">
        {label}
      </div>
    </div>
  );
}
