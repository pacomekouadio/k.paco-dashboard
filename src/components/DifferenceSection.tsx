import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';

interface DifferenceSectionProps {
  onLearnMore?: (cardId: string) => void;
  onOpenQuote?: () => void;
}

export const DifferenceSection: React.FC<DifferenceSectionProps> = ({ onLearnMore, onOpenQuote }) => {
  const { difference } = useSiteContent();
  const differenceCards = difference.cards;

  return (
    <section id="difference" className="py-16 sm:py-20 lg:py-24 bg-[#f4f6f9] text-slate-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading & Founder message */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Grand Multi-line Title */}
              <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#08182b] tracking-tight leading-[1.2] mb-5">
                {difference.titleLine1}<br />
                {difference.titleLine2}<br />
                <span className="text-[#0077e6]">{difference.titleHighlight}</span>
              </h2>

              {/* Descriptive Body Paragraph */}
              <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 mb-6 font-normal">
                {difference.description}
              </p>

              {/* Founder Signature Info */}
              <div className="pt-2 mb-6">
                <div className="font-montserrat text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  {difference.founderName}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {difference.founderRole}
                </div>
              </div>

              {/* Action Button: ABOUT US */}
              <div>
                <a
                  href={difference.ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0077e6] hover:bg-[#0066c7] text-white font-montserrat font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {difference.ctaLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Cards (WHO WE ARE & LOGISTICS REDEFINED) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {differenceCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100 group"
              >
                <div>
                  {/* Card Image */}
                  <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40"></div>
                  </div>

                  {/* Card Text Content */}
                  <div className="p-5 sm:p-6 pb-2">
                    <h3 className="font-montserrat text-xs sm:text-[13px] font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-4">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Circular Blue Arrow Button matching mockup */}
                <div className="p-5 sm:p-6 pt-3 flex justify-start">
                  <button
                    onClick={() => onLearnMore?.(card.id)}
                    className="w-8 h-8 rounded-full bg-[#0077e6] hover:bg-[#0066c7] text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110 cursor-pointer"
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
