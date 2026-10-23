import React from 'react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-[#131315] py-16 md:py-24 border-y border-[#282a36]/60">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <span className="font-['JetBrains_Mono'] text-xs text-[#ffb77f] uppercase tracking-widest font-semibold block mb-2">
            Validated Telemetry
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#e5e1e4] tracking-tight">
            Endorsed by Neuro-Athletes &amp; Biohackers
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between shadow-sm hover:border-[#ff5a1f]/30 transition-all group"
            >
              <div>
                {/* 5 Filled Stars */}
                <div className="flex items-center gap-1 text-[#ffb95a] mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/90 italic mb-8 leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author Lockup */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#282a36]/60">
                <div className={`w-11 h-11 rounded-full bg-[#2a2a2c] border border-[#282a36] flex items-center justify-center font-['Space_Grotesk'] text-sm font-bold ${item.colorClass}`}>
                  {item.initials}
                </div>
                <div>
                  <div className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                    {item.author}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
