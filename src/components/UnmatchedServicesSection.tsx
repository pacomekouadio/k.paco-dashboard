import React from 'react';
import { Truck, Ship, Plane, Package, Anchor, ArrowRight } from 'lucide-react';
import { unmatchedServices } from '../data/content';
import { ServiceCard } from '../types';

interface UnmatchedServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const UnmatchedServicesSection: React.FC<UnmatchedServicesSectionProps> = ({
  onSelectService,
}) => {
  const renderIcon = (iconName: ServiceCard['iconName']) => {
    const props = { className: 'w-7 h-7 text-white stroke-[1.5]' };
    switch (iconName) {
      case 'truck':
        return <Truck {...props} />;
      case 'ship':
        return <Ship {...props} />;
      case 'plane':
        return <Plane {...props} />;
      case 'package':
        return <Package {...props} />;
      case 'anchor':
        return <Anchor {...props} />;
      default:
        return <Ship {...props} />;
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-[#07172e] text-white overflow-hidden">
      {/* Background Watermark / Compass Rose in Bottom Right */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/4 translate-y-1/4 select-none">
        <svg width="600" height="600" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="100" ry="180" stroke="white" strokeWidth="1.5" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="white" strokeWidth="2" />
          <ellipse cx="200" cy="200" rx="180" ry="100" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M120 200L160 120L200 170L240 120L280 200H120Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Grid Layout matching the mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Title Column: Unmatched Services. Unmatched Excellence. */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[38px] font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Unmatched<br />
                Services.<br />
                Unmatched<br />
                Excellence.
              </h2>

              {/* Circular White Arrow Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectService('PROJECT CARGO')}
                  className="w-9 h-9 rounded-full bg-white hover:bg-sky-100 text-[#07172e] flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Explore unmatched freight services"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subtle trust note */}
            <div className="text-xs text-white/50 font-poppins hidden lg:block">
              Dedicated worldwide freight specialists with 24/7 proactive control tower monitoring.
            </div>
          </div>

          {/* Right Services Cards Grid (5 cards) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {unmatchedServices.map((service, idx) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.title)}
                className={`p-6 rounded-lg border border-white/15 bg-white/[0.02] hover:bg-white/[0.07] hover:border-sky-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group backdrop-blur-xs ${
                  idx === 0 || idx === 1 ? 'sm:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-start text-white group-hover:text-sky-400 transition-colors">
                    {renderIcon(service.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat text-xs sm:text-[13px] font-extrabold text-white uppercase tracking-wider mb-2 group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] leading-relaxed text-white/70 font-poppins">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-sky-400 font-medium">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
