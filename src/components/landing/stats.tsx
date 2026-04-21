"use client";

import { useState, useEffect, useRef } from "react";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { target: 50, suffix: "+", label: "Global Clients" },
  { target: 10, suffix: "+", label: "years of experience" },
  { target: 1, suffix: "B", label: "FDV Clients" },
  { target: 5, suffix: "M", label: "Followers" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Number */}
        <div className="absolute top-12 left-6 text-[200px] font-[family-name:var(--font-clash-display)] font-bold leading-none text-white opacity-[0.03] pointer-events-none select-none">
          06
        </div>

        {/* Section Labels */}
        <div className="flex items-center justify-between mb-16 relative z-10">
          <div className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wide uppercase">
            {"//Stats"}
          </div>
          <div className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wide">
            Fun Facts
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-16 px-6 ${
                index < stats.length - 1 ? "border-r border-[#161616]" : ""
              } ${index < 2 ? "lg:border-r" : ""} ${
                index === 1 ? "border-r-0 lg:border-r" : ""
              } ${index >= 2 ? "border-t lg:border-t-0" : ""}`}
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-4 tabular-nums">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] text-center uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Top and bottom border */}
        <div className="border-t border-b border-[#161616] absolute left-6 right-6 top-[calc(50%+20px)] h-0 hidden lg:block" />
      </div>
    </section>
  );
}
