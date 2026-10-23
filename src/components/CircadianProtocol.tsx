import React from 'react';

interface CircadianProtocolProps {
  onLearnMore?: () => void;
}

export const CircadianProtocol: React.FC<CircadianProtocolProps> = ({ onLearnMore }) => {
  return (
    <section className="w-full bg-[#0e0e10] py-16 md:py-24 relative" id="fuel-protocol">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest mb-2 font-semibold">
            Circadian Resonance
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#e5e1e4] tracking-tight mb-4">
            Energy All Day. Sleep All Night.
          </h2>
          <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 leading-relaxed">
            Conventional stimulants flood your system with synthetic caffeine and crash your adrenals. Hummingbird Fuel uses dual-polarity sublingual nano-mists to sync flawlessly with your biological clock.
          </p>
        </div>

        {/* Dual Protocol Cards (AM / PM Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AM PROTOCOL: DAY FUEL */}
          <div className="relative rounded-2xl bg-[#121318] border border-[#282a36] p-7 md:p-9 flex flex-col justify-between overflow-hidden group hover:bg-[#1a1c24] transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5a1f]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff5a1f]/20 transition-all duration-500"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded bg-[#ff5a1f]/20 text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold border border-[#ff5a1f]/30">
                  Phase 01 // AM Protocol
                </span>
                <span className="material-symbols-outlined text-[#ff5a1f] text-[28px]">
                  light_mode
                </span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4] mb-3">
                Day Fuel: Cognitive Ignite
              </h3>

              <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 mb-6 leading-relaxed">
                Delivers micro-dosed methylated B-complex, natural caffeine alkaloid micro-droplets, and Lion’s Mane nano-compounds directly via oral mucosa for immediate cellular ATP creation.
              </p>

              {/* Metric list */}
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3 font-['Manrope'] text-sm text-[#e5e1e4]">
                  <span className="material-symbols-outlined text-[#ffb77f] text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Immediate 90-second mental clarity without jitters</span>
                </li>
                <li className="flex items-start gap-3 font-['Manrope'] text-sm text-[#e5e1e4]">
                  <span className="material-symbols-outlined text-[#ffb77f] text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Sublingual bypass prevents stomach acidity and bloating</span>
                </li>
                <li className="flex items-start gap-3 font-['Manrope'] text-sm text-[#e5e1e4]">
                  <span className="material-symbols-outlined text-[#ffb77f] text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Zero afternoon slump; smoothly metabolized before dusk</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">DOSAGE:</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] font-semibold">
                  1-2 Sprays Under Tongue
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ff5a1f] font-bold uppercase tracking-wider">
                PEAK: 10:00 AM
              </span>
            </div>
          </div>

          {/* PM PROTOCOL: NIGHT RESET */}
          <div className="relative rounded-2xl bg-[#121318] border border-[#282a36] p-7 md:p-9 flex flex-col justify-between overflow-hidden group hover:bg-[#1a1c24] transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00f0ff]/20 transition-all duration-500"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded bg-[#00f0ff]/15 text-[#00f0ff] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold border border-[#00f0ff]/30">
                  Phase 02 // PM Protocol
                </span>
                <span className="material-symbols-outlined text-[#00f0ff] text-[28px]">
                  bedtime
                </span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4] mb-3">
                Night Reset: Delta Recovery
              </h3>

              <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 mb-6 leading-relaxed">
                A gentle neuro-chemical descent. AI-quantified L-Theanine, Magnesium Bisglycinate micro-droplets, and botanical calmants signal the vagus nerve to induce rapid Delta-wave and REM rejuvenation.
              </p>

              {/* Metric list */}
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3 font-['Manrope'] text-sm text-[#e5e1e4]">
                  <span className="material-symbols-outlined text-[#00f0ff] text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Reduces sleep latency to under 12 minutes</span>
                </li>
                <li className="flex items-start gap-3 font-['Manrope'] text-sm text-[#e5e1e4]">
                  <span className="material-symbols-outlined text-[#00f0ff] text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Enhances nocturnal cellular mitochondrial repair</span>
                </li>
                <li className="flex items-start gap-3 font-['Manrope'] text-sm text-[#e5e1e4]">
                  <span className="material-symbols-outlined text-[#00f0ff] text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>Zero morning grogginess or synthetic hormone dependency</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">DOSAGE:</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] font-semibold">
                  2 Sprays 30m Pre-Sleep
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#00f0ff] font-bold uppercase tracking-wider">
                RECOVERY: 10:30 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
