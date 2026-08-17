import React, { useState } from 'react';
import { Plane, Truck, Ship, Package, Anchor, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';
import type { ServiceItem } from '../content/schema';

interface ServiceCardsRowProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServiceCardsRow: React.FC<ServiceCardsRowProps> = ({ onSelectService }) => {
  const { services } = useSiteContent();
  const [activeId, setActiveId] = useState<string>('project-cargo');

  const renderIcon = (iconName: ServiceItem['iconName'], isActive: boolean) => {
    const iconClass = isActive
      ? 'text-white'
      : 'text-sky-500 group-hover:text-[#0077e6] transition-colors';

    switch (iconName) {
      case 'plane':
        return <Plane className={`w-8 h-8 ${iconClass}`} strokeWidth={1.5} />;
      case 'truck':
        return <Truck className={`w-8 h-8 ${iconClass}`} strokeWidth={1.5} />;
      case 'ship':
        return <Ship className={`w-8 h-8 ${iconClass}`} strokeWidth={1.5} />;
      case 'package':
        return <Package className={`w-8 h-8 ${iconClass}`} strokeWidth={1.5} />;
      case 'anchor':
        return <Anchor className={`w-8 h-8 ${iconClass}`} strokeWidth={1.5} />;
      default:
        return <Ship className={`w-8 h-8 ${iconClass}`} strokeWidth={1.5} />;
    }
  };

  return (
    <div id="services" className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 lg:-mt-24">
      {/* 5 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
        {services.map((card) => {
          const isActive = activeId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => {
                setActiveId(card.id);
                onSelectService(card.title);
              }}
              className={`group relative rounded-xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between min-h-[165px] ${
                isActive
                  ? 'bg-[#0077e6] text-white shadow-2xl scale-[1.03] sm:-translate-y-2 z-10'
                  : 'bg-white text-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 border border-slate-100'
              }`}
            >
              {/* Card Icon */}
              <div className="mb-3 flex items-center justify-center h-10">
                {renderIcon(card.iconName, isActive)}
              </div>

              {/* Card Title & Subtitle */}
              <div className="flex-1 flex flex-col justify-center">
                <h3
                  className={`font-montserrat text-xs sm:text-[13px] font-extrabold uppercase tracking-wider mb-1 ${
                    isActive ? 'text-white' : 'text-slate-800 group-hover:text-[#0077e6]'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`font-poppins text-[10px] sm:text-[11px] leading-tight ${
                    isActive ? 'text-white/85 font-light' : 'text-slate-400 font-normal'
                  }`}
                >
                  {card.subtitle}
                </p>
              </div>

              {/* Active Indicator Button (White circle with blue arrow for the active card, matching mockup) */}
              {isActive && (
                <div className="mt-3 pt-1">
                  <div className="w-7 h-7 rounded-full bg-white text-[#0077e6] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
