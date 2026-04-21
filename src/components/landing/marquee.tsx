"use client";

export function Marquee() {
  const questions = [
    "Are you too busy to write but know Twitter matters?",
    "Just raised or launched and want to dominate mindshare?",
    "You want to be positioned as Tier 1, and not a sh*ty project?"
  ];

  const marqueeContent = questions
    .map(question => `◆ ${question.toUpperCase()}`)
    .join(" ");

  return (
    <div className="border-t border-b border-[#161616] py-5 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First copy of content */}
          <div className="flex-shrink-0">
            <span className="font-[family-name:var(--font-clash-display)] text-lg text-white px-8">
              {marqueeContent}
            </span>
          </div>
          {/* Second copy of content for seamless loop */}
          <div className="flex-shrink-0">
            <span className="font-[family-name:var(--font-clash-display)] text-lg text-white px-8">
              {marqueeContent}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}