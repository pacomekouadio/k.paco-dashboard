import React from 'react';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="home"
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-[#07172e] text-white overflow-hidden pt-24 pb-32 sm:pb-36"
    >
      {/* Background Image: Deep container cargo vessel & port perspective with dark blue tone matching mockup */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Ocean Cargo Container Ship"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-125 saturate-75"
        />
        {/* Navy blue overlay strictly matching the mockup's deep cinematic lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08182b]/85 via-[#08182b]/75 to-[#061426]/95"></div>
        {/* Subtle radial spotlight in the center behind the text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,119,230,0.15)_0%,transparent_70%)]"></div>
      </div>

      {/* Hero Content Centered */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Small subtitle: SHIPS ANYTHING */}
        <span className="font-montserrat text-xs sm:text-sm md:text-[15px] font-semibold tracking-[0.28em] text-sky-200/90 uppercase mb-2 sm:mb-3 drop-shadow-sm">
          SHIPS ANYTHING
        </span>

        {/* Grand Title: AROUND THE WORLD */}
        <h1 className="font-montserrat text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight sm:tracking-normal uppercase text-white leading-tight mb-8 sm:mb-10 drop-shadow-md">
          AROUND THE WORLD
        </h1>

        {/* Pill Button: QUOTE? */}
        <button
          id="hero-quote-btn"
          onClick={onOpenQuote}
          className="px-9 sm:px-12 py-2.5 sm:py-3 bg-white hover:bg-slate-100 text-[#0066cc] font-montserrat font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white"
        >
          QUOTE?
        </button>
      </div>
    </section>
  );
};
