const platforms = [
  "Spotify",
  "Apple Podcasts",
  "YouTube",
  "X",
  "LinkedIn",
  "TikTok",
];

export function SocialProof() {
  return (
    <section className="relative py-10 px-5 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 text-[10px] uppercase tracking-[0.22em] text-white/30">
          Published everywhere your audience already lives
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {platforms.map((p) => (
            <span
              key={p}
              className="font-[family-name:var(--font-clash-display)] text-lg md:text-xl text-white/45 hover:text-white/80 transition"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
