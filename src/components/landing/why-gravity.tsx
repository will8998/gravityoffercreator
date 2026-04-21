"use client"

import { useState, useEffect, useRef } from "react"

interface FeatureCard {
  title: string
  subtitle: string
  description: string
}

const features: FeatureCard[] = [
  {
    title: "Web3-Native to the Core",
    subtitle: "No onboarding needed. We live in the ecosystem.",
    description: "No need to explain L2s, staking, or zk-rollups — we're already deep in the trenches. Your content won't sound like it was written by ChatGPT wearing a suit."
  },
  {
    title: "Twitter-First, Format-Obsessed",
    subtitle: "Threads. Memes. Animations. All native.",
    description: "We specialize in what actually performs on Twitter — no generic carousels or repurposed IG content. Just daily hits that move your brand forward."
  },
  {
    title: "Not Just Designers — Strategic Growth Partners",
    subtitle: "We think like a CMO, execute like a studio.",
    description: "You get content strategy, creative direction, and distribution input — not just 'deliverables.' That's how we drive engagement and conversions."
  },
  {
    title: "Zero Bottlenecks, Real Speed",
    subtitle: "Get content flowing within 72 hours.",
    description: "Our onboarding is fast, our delivery is daily, and we use async feedback loops to keep momentum. No 'waiting for creatives' BS."
  },
  {
    title: "Trusted by Founders Across Web3",
    subtitle: "We've helped projects go from invisible to unavoidable.",
    description: "From funded chains to stealth-mode startups, we've helped teams grow Twitter presence, launch tokens, and activate communities — with receipts."
  }
]

function FeatureCard({ feature, index }: { feature: FeatureCard; index: number }) {
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={cardRef}
      className="bg-[#0a0a0a] border border-[#161616] rounded-2xl p-8 hover:border-[#292929] transition-colors duration-300"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-clash-display)] mb-2">
            {feature.title}
          </h3>
          <p className="text-lg text-[rgba(255,255,255,0.6)] font-[family-name:var(--font-inter)]">
            {feature.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 bg-[#161616] rounded-full h-2 overflow-hidden mr-4">
              <div 
                className="h-full bg-[#14c700] rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: isInView ? '100%' : '0%',
                  transitionDelay: `${index * 100}ms`
                }}
              />
            </div>
            <span className="text-white font-bold text-lg font-[family-name:var(--font-inter)]">
              100%
            </span>
          </div>
        </div>

        <p className="text-[rgba(255,255,255,0.6)] leading-relaxed font-[family-name:var(--font-inter)]">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export function WhyGravity() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Number */}
        <div className="text-[200px] lg:text-[300px] font-bold text-[rgba(255,255,255,0.05)] leading-none font-[family-name:var(--font-clash-display)] mb-[-150px] lg:mb-[-200px]">
          010
        </div>

        {/* Section Labels */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div className="space-y-2">
            <p className="text-[#808080] uppercase tracking-wider text-sm font-[family-name:var(--font-inter)]">
              {"//Title"}
            </p>
            <p className="text-[#808080] uppercase tracking-wider text-sm font-[family-name:var(--font-inter)]">
              Sub Title
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Headings */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-clash-display)]">
              WHY WORK WITH GRAVITY?
            </h1>
            <p className="text-xl lg:text-2xl text-[rgba(255,255,255,0.6)] leading-relaxed font-[family-name:var(--font-inter)]">
              We don&apos;t just create content — We craft narratives that make people care.
            </p>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}