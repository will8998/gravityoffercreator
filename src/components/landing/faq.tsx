"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What kinds of Web3 brands do you work with?",
    answer: "We work with L1/L2 chains, DeFi protocols, NFT projects, DAOs, and Web3 infrastructure companies. Whether you're pre-launch or scaling, we adapt to your stage."
  },
  {
    question: "How fast can we get started?",
    answer: "Most clients are fully onboarded within 72 hours. We move fast because we know Web3 moves faster."
  },
  {
    question: "What do I get each month?",
    answer: "Depending on your plan, you'll receive daily tweets, weekly threads, animated videos, analytics reports, and strategic guidance."
  },
  {
    question: "Can I start with just one month?",
    answer: "Yes. We offer month-to-month flexibility. No long-term contracts required — our work speaks for itself."
  },
  {
    question: "What if I don't have branding or a visual style yet?",
    answer: "No problem. We'll develop a brand voice guide and visual direction as part of onboarding."
  },
  {
    question: "Do you guarantee follower growth?",
    answer: "We don't sell vanity metrics. We focus on meaningful engagement, mindshare, and audience quality that drives real business outcomes."
  },
  {
    question: "Do you manage Discord or other platforms too?",
    answer: "Our core focus is Twitter/X, but our Partner plan includes community CTA strategies that extend to Discord and Telegram."
  },
  {
    question: "Can you work with stealth projects?",
    answer: "Absolutely. We've worked with pre-announcement projects under NDA. Discretion is standard practice."
  }
]

function FAQItem({ faq, index, isOpen, onToggle }: { 
  faq: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void 
}) {
  return (
    <div className="border-b border-[#161616] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 text-left hover:bg-[#0a0a0a] transition-colors duration-300 px-6 -mx-6 rounded-lg"
      >
        <div className="flex items-center space-x-8 flex-1">
          <span className="text-[#808080] text-lg font-bold font-[family-name:var(--font-inter)] min-w-[3rem]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-white font-[family-name:var(--font-clash-display)] pr-4">
            {faq.question}
          </h3>
        </div>
        
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transform transition-transform duration-300 text-white ${isOpen ? 'rotate-45' : ''}`}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-[5rem] pr-12 pb-8">
          <p className="text-[rgba(255,255,255,0.6)] leading-relaxed font-[family-name:var(--font-inter)]">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Number */}
        <div className="text-[200px] lg:text-[300px] font-bold text-[rgba(255,255,255,0.05)] leading-none font-[family-name:var(--font-clash-display)] mb-[-150px] lg:mb-[-200px]">
          012
        </div>

        {/* Section Labels */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div className="space-y-2">
            <p className="text-[#808080] uppercase tracking-wider text-sm font-[family-name:var(--font-inter)]">
              {"//FAQ"}
            </p>
            <p className="text-[#808080] uppercase tracking-wider text-sm font-[family-name:var(--font-inter)]">
              Concerns
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Headings */}
          <div className="text-center lg:text-left">
            <p className="text-2xl lg:text-3xl text-[rgba(255,255,255,0.6)] mb-4 font-[family-name:var(--font-inter)]">
              Frequently
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-clash-display)]">
              Asked Questions
            </h1>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}