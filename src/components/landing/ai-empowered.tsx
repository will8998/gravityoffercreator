"use client";

import { useState } from "react";

interface AccordionItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

const accordionItems: AccordionItem[] = [
  {
    id: "research",
    icon: "⚙️",
    title: "RESEARCH AUTOMATION",
    subtitle: "AI-POWERED INSIGHT ENGINE",
    description: "We use AI to scrape, cluster, and analyze the latest Web3 content — from founder tweets to trending narratives. This lets us spot angles others miss, and move faster than human-only teams."
  },
  {
    id: "thread",
    icon: "🧵",
    title: "THREAD ENGINEERING",
    subtitle: "Lead Product Designer",
    description: "Fitness and well-being with personalized coaching and innovative wellness solutions."
  },
  {
    id: "visual",
    icon: "🎨",
    title: "VISUAL CONCEPTING",
    subtitle: "MIDJOURNEY-LEVEL IDEAS, HUMAN POLISH",
    description: "We explore meme formats, animation styles, and visual metaphors using AI tools — then design and animate by hand. Think faster drafts, better moodboards, fewer creative stalls."
  },
  {
    id: "performance",
    icon: "📈",
    title: "PERFORMANCE FEEDBACK",
    subtitle: "ALWAYS LEARNING, NEVER LOOPING",
    description: "We use AI tools to process post-level analytics weekly — finding what's working, where growth is stuck, and what to test next. That means smarter decisions and tighter execution."
  }
];

export function AiEmpowered() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <section className="relative bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Number */}
        <div className="absolute top-12 left-6 text-[200px] font-[family-name:var(--font-clash-display)] font-bold leading-none text-white opacity-5 pointer-events-none select-none">
          07
        </div>

        {/* Section Labels */}
        <div className="flex items-center justify-between mb-16 relative z-10">
          <div className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wide uppercase">
            {"//Experience"}
          </div>
          <div className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wide">
            2013 - Present
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Heading */}
          <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-8 leading-tight tracking-tight">
            AI-EMPOWERED,<br />
            HUMAN-LED
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] mb-16 max-w-2xl">
            We use AI as a weapon — not a crutch.
          </p>

          {/* Accordion Items */}
          <div className="space-y-0">
            {accordionItems.map((item, index) => (
              <div
                key={item.id}
                className={`border-t border-[#161616] ${
                  index === accordionItems.length - 1 ? "border-b" : ""
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left py-8 px-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] uppercase tracking-wide">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="text-white text-2xl transform transition-transform duration-300">
                      {openItem === item.id ? "−" : "+"}
                    </div>
                  </div>
                </button>

                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openItem === item.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-8 px-0 ml-14">
                    <p className="text-base md:text-lg font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.8)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}