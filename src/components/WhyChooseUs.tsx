import React, { useState } from 'react';
import { whyChooseUsSteps } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>('excellence');

  return (
    <section className="py-14 sm:py-20 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Heading */}
        <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#08182b] tracking-tight mb-10 sm:mb-12">
          Why Choose Us?
        </h2>

        {/* 3 Step Timeline Layout exactly matching the mockup */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Track Line */}
          <div className="absolute top-[22px] left-[15%] right-[15%] h-[1.5px] bg-slate-200 z-0"></div>

          {/* 3 Interactive Points */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 relative z-10">
            {whyChooseUsSteps.map((step) => {
              const isActive = selectedStep === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Step Title Label (Above or around the node) */}
                  <div className="mb-2 sm:mb-3 min-h-[44px] flex items-center justify-center">
                    <span
                      className={`text-xs sm:text-sm font-montserrat font-bold whitespace-pre-line leading-tight text-center transition-colors ${
                        isActive
                          ? 'text-[#0077e6]'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* Circle Node on Timeline Line */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#0077e6] ring-4 ring-sky-100 scale-125'
                          : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    ></div>
                  </div>

                  {/* Active highlight description below */}
                  <div
                    className={`mt-4 max-w-[240px] text-[11px] sm:text-xs text-slate-500 leading-relaxed transition-opacity duration-300 ${
                      isActive ? 'opacity-100 font-normal' : 'opacity-0 h-0 overflow-hidden sm:h-auto sm:opacity-40'
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
