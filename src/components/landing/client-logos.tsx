"use client";

import Image from 'next/image';

export function ClientLogos() {
  const logos = [
    '/images/client-logo-1.png',
    '/images/client-logo-2.png',
    '/images/client-logo-3.png',
  ];

  // Duplicate logos multiple times for seamless infinite scroll
  const duplicatedLogos = Array(8).fill(logos).flat();

  return (
    <section className="relative py-8 bg-black border-t border-b border-[#161616] overflow-hidden">
      <div className="relative">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .logo-track {
            animation: scroll 25s linear infinite;
          }
        `}</style>
        
        <div className="flex logo-track">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <Image
                src={logo}
                alt={`Client logo ${(index % 3) + 1}`}
                width={100}
                height={60}
                className="h-16 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 filter brightness-0 invert"
                priority={index < 6}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}