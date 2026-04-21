"use client"

import { useState, useRef } from "react"
import Image from "next/image"

interface Testimonial {
  photo: string
  name: string
  role: string
  companyLogo?: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    photo: "/images/testimonial-hanjin.png",
    name: "HAN JIN",
    role: "CEO, BLUWHALE",
    companyLogo: "/images/logo-bluwhale.png",
    quote: "Gravity simply made everything X related autopilot for me. Nuff said."
  },
  {
    photo: "/images/testimonial-0xnifty.jpeg",
    name: "0xNifty",
    role: "CEO, Veritas",
    companyLogo: "/images/logo-veritas.png",
    quote: "Their creativity turned our followers into diehard evangelists. Gravity is more than just an agency, they are a reliable growth engine."
  },
  {
    photo: "/images/testimonial-sebastian.jpeg",
    name: "SEBASTIAN",
    role: "CMO - RWA.IO",
    quote: "GravityLabs turned our complex RWA narrative into sharp, compelling content. It clicked with both crypto natives and institutions—tripling inbound from allocators. They're the signal in the noise."
  }
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-[#0f0f0f] border border-[#161616] rounded-2xl p-6 flex-shrink-0 w-[400px] lg:w-[450px] hover:border-[#292929] transition-colors duration-300">
      <div className="space-y-6">
        {/* Quote */}
        <blockquote className="text-lg lg:text-xl text-white leading-relaxed font-[family-name:var(--font-inter)]">
          {`"${testimonial.quote}"`}
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg font-[family-name:var(--font-clash-display)]">
              {testimonial.name}
            </h4>
            <p className="text-[rgba(255,255,255,0.6)] text-sm font-[family-name:var(--font-inter)]">
              {testimonial.role}
            </p>
          </div>

          {testimonial.companyLogo && (
            <div className="flex-shrink-0">
              <Image
                src={testimonial.companyLogo}
                alt="Company Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = 470 // card width + gap
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      setCurrentIndex(Math.max(0, currentIndex - 1))
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = 470 // card width + gap
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1))
    }
  }

  return (
    <section className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Number */}
        <div className="text-[200px] lg:text-[300px] font-bold text-[rgba(255,255,255,0.05)] leading-none font-[family-name:var(--font-clash-display)] mb-[-150px] lg:mb-[-200px]">
          011
        </div>

        {/* Section Labels */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div className="space-y-2">
            <p className="text-[#808080] uppercase tracking-wider text-sm font-[family-name:var(--font-inter)]">
              {"//Testimonial"}
            </p>
            <p className="text-[#808080] uppercase tracking-wider text-sm font-[family-name:var(--font-inter)]">
              Voices
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Headings */}
          <div className="text-center lg:text-left">
            <p className="text-2xl lg:text-3xl text-[rgba(255,255,255,0.6)] mb-4 font-[family-name:var(--font-inter)]">
              Trusted By
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-clash-display)]">
              WEB3 FOUNDERS
            </h1>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm border border-[#161616] rounded-full flex items-center justify-center text-white hover:border-[#292929] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={scrollRight}
              disabled={currentIndex >= testimonials.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm border border-[#161616] rounded-full flex items-center justify-center text-white hover:border-[#292929] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Testimonials Container */}
            <div 
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide px-16"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>

            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}