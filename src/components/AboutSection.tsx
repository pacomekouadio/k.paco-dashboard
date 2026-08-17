import React from 'react';
import { MapPin, Globe2 } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';

export const AboutSection: React.FC = () => {
  const { about } = useSiteContent();

  return (
    <section id="corporate" className="py-12 sm:py-16 lg:py-20 bg-white text-slate-700">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Layered Offset Image Stack */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[480px]">
              {/* Backing Depth Layer (Dark slate card behind image) */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full bg-[#0a192f] rounded-xl shadow-md z-0 transform -rotate-1 hidden sm:block"></div>

              {/* Foreground Image: Professional logistics meeting / team around whiteboard */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-slate-100 aspect-4/3 sm:aspect-16/11 bg-slate-100">
                <img
                  src={about.image}
                  alt={about.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-20 bg-white rounded-xl shadow-xl p-3.5 sm:p-4 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0077e6] flex items-center justify-center">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold font-montserrat text-slate-900">{about.badgeTitle}</div>
                  <div className="text-[11px] text-slate-500">{about.badgeSubtitle}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Texts matching mockup verbatim */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-600 font-normal">
                {about.paragraph1}
              </p>

              <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-600 font-normal">
                {about.paragraph2}
              </p>
            </div>

            {/* Quick Hub Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {about.hubs.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold font-montserrat text-slate-800">
                    <MapPin className="w-3 h-3 text-[#0077e6] shrink-0" />
                    <span className="truncate">{loc.city}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{loc.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
