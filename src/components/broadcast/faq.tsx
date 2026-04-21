const faqs = [
  {
    q: "Is this AI slop?",
    a: "No. Every episode is human-edited, scripted from your own real thinking (past tweets, whitepapers, interviews). The cloned voice is only the delivery layer. You approve every episode before it goes live.",
  },
  {
    q: "What if it doesn't sound like me?",
    a: "You reject the episode in Telegram with one message. We rebuild it. If the pilot doesn't sound like you, we walk away and you keep the files. No arguments.",
  },
  {
    q: "Do I have to record new voice notes every week?",
    a: "No. After the one-time 10-min voice sample, we source ongoing content from your past writing and the week's news. You spend 5 minutes reviewing. That's the whole job.",
  },
  {
    q: "Is voice cloning legal / ethical?",
    a: "You sign a Voice Usage Agreement. You own the model. It's locked to Gravity for delivery only. Revocable on 30 days notice. Every episode discloses 'AI-enhanced production' in show notes (FTC-compliant).",
  },
  {
    q: "Can I cancel?",
    a: "Month-to-month. Cancel in one Telegram message. No phone calls, no retention teams, no guilt trips. We delete your voice clone within 30 days.",
  },
  {
    q: "What if the algorithm catches my voice is AI?",
    a: "Spotify, Apple, YouTube all explicitly allow AI-narrated content with disclosure (effective 2025). We disclose. We watermark. We stay on the right side of the line.",
  },
];

export function FAQ() {
  return (
    <section className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14 text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-4">
            The questions everyone asks
          </div>
          <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
            Still doubting?
            <br />
            <span className="text-white/40">Good — ask away.</span>
          </h2>
        </div>

        <div className="space-y-px bg-white/5">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group bg-black p-6 md:p-8 transition hover:bg-white/[0.02]"
              open={i === 0}
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                <span className="font-[family-name:var(--font-clash-display)] text-lg md:text-xl text-white font-semibold leading-tight">
                  {f.q}
                </span>
                <span className="flex-shrink-0 mt-1 text-[#e8b24a] text-xl leading-none transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-white/65 leading-relaxed text-sm md:text-base max-w-3xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
