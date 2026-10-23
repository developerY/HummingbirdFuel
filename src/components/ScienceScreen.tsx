import React, { useState } from 'react';

interface ScienceScreenProps {
  onOrderClick: () => void;
  onSimulateSpray: () => void;
}

export const ScienceScreen: React.FC<ScienceScreenProps> = ({
  onOrderClick,
  onSimulateSpray
}) => {
  const [activeComparison, setActiveComparison] = useState<'spray' | 'capsule' | 'drink'>('spray');

  return (
    <div className="w-full bg-[#0e0e10] py-12 md:py-20 text-[#e5e1e4]">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Screen Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            Pharmacokinetics &amp; Clinical Bio-Delivery
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#e5e1e4] mb-4">
            The Physics of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] via-[#ffb77f] to-[#00f0ff]">
              Sublingual Micro-Mist
            </span>
          </h1>
          <p className="font-['Manrope'] text-base md:text-lg text-[#e4beb3]/80 leading-relaxed">
            Why bypass the digestive tract entirely? Oral mucosal delivery provides a direct venous conduit to the cerebral circulation, bypassing hepatic first-pass metabolism and gastric enzymatic degradation.
          </p>
        </div>

        {/* Interactive Absorption Curve Visualizer */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-wider block mb-1">
                Comparative Pharmacokinetic Curve
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e5e1e4]">
                Plasma Concentration vs. Elapsed Time
              </h2>
            </div>

            {/* Comparison switcher */}
            <div className="flex rounded-lg bg-[#1c1b1d] p-1 border border-[#282a36] text-xs font-['JetBrains_Mono']">
              <button
                onClick={() => setActiveComparison('spray')}
                className={`px-3 py-1.5 rounded-md uppercase font-semibold cursor-pointer transition-all ${
                  activeComparison === 'spray'
                    ? 'bg-[#ff5a1f] text-[#0e0e10] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                Sublingual Mist
              </button>
              <button
                onClick={() => setActiveComparison('capsule')}
                className={`px-3 py-1.5 rounded-md uppercase font-semibold cursor-pointer transition-all ${
                  activeComparison === 'capsule'
                    ? 'bg-[#2a2a2c] text-[#ffb95a] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                Oral Capsule
              </button>
              <button
                onClick={() => setActiveComparison('drink')}
                className={`px-3 py-1.5 rounded-md uppercase font-semibold cursor-pointer transition-all ${
                  activeComparison === 'drink'
                    ? 'bg-[#2a2a2c] text-[#ffb4ab] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                Energy Drink
              </button>
            </div>
          </div>

          {/* Interactive Chart Graphic */}
          <div className="relative w-full h-64 bg-[#0e0e10] rounded-xl border border-[#282a36] p-4 flex flex-col justify-between overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#282a36_1px,transparent_1px),linear-gradient(to_bottom,#282a36_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="relative z-10 flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#8d90a5]">
              <span>100% Plasma Peak</span>
              <span>Therapeutic Window</span>
              <span>Baseline Return</span>
            </div>

            {/* Simulated Curve Renderings */}
            <div className="relative w-full h-36 flex items-end">
              {activeComparison === 'spray' && (
                <div className="w-full h-full flex flex-col justify-end relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sprayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff5a1f" />
                        <stop offset="50%" stopColor="#ff8a00" />
                        <stop offset="100%" stopColor="#00f0ff" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 120 C 15 20, 40 10, 100 15 C 220 20, 360 40, 500 115"
                      fill="none"
                      stroke="url(#sprayGrad)"
                      strokeWidth="4"
                    />
                    <circle cx="50" cy="12" r="5" fill="#ff5a1f" className="animate-pulse" />
                  </svg>
                  <div className="absolute top-0 left-12 p-2 rounded bg-[#1c1b1d]/90 border border-[#ff5a1f] text-[10px] font-['JetBrains_Mono'] text-[#ffb59e]">
                    Peak at 90s (99.8% Bioavailability)
                  </div>
                </div>
              )}

              {activeComparison === 'capsule' && (
                <div className="w-full h-full flex flex-col justify-end relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <path
                      d="M 0 120 C 120 120, 180 60, 240 55 C 320 50, 420 85, 500 115"
                      fill="none"
                      stroke="#ffb95a"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                    />
                    <circle cx="240" cy="55" r="4" fill="#ffb95a" />
                  </svg>
                  <div className="absolute top-8 left-48 p-2 rounded bg-[#1c1b1d]/90 border border-[#ffb95a] text-[10px] font-['JetBrains_Mono'] text-[#ffb95a]">
                    Lag 45m (Only 18-24% Survives Liver)
                  </div>
                </div>
              )}

              {activeComparison === 'drink' && (
                <div className="w-full h-full flex flex-col justify-end relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <path
                      d="M 0 120 C 30 5, 80 5, 120 20 C 180 80, 240 120, 500 120"
                      fill="none"
                      stroke="#ffb4ab"
                      strokeWidth="3"
                    />
                    <circle cx="80" cy="5" r="4" fill="#ffb4ab" />
                  </svg>
                  <div className="absolute top-2 left-16 p-2 rounded bg-[#1c1b1d]/90 border border-[#ffb4ab] text-[10px] font-['JetBrains_Mono'] text-[#ffb4ab]">
                    Spike + Extreme Afternoon Crash
                  </div>
                </div>
              )}
            </div>

            {/* Time markers */}
            <div className="relative z-10 flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-2">
              <span>0m</span>
              <span>15m</span>
              <span>45m</span>
              <span>2 Hours</span>
              <span>4 Hours</span>
              <span>6 Hours</span>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Sublingual Bio-Enhancement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
            <div className="w-10 h-10 rounded-lg bg-[#201f21] flex items-center justify-center text-[#ff5a1f] mb-4">
              <span className="material-symbols-outlined text-[24px]">bloodtype</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
              Sublingual Venous Conduit
            </h3>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
              The sublingual mucosa is richly vascularized with thin non-keratinized epithelial tissue. Active molecules pass directly into the deep lingual vein and internal jugular, reaching brain receptors without destructive stomach acids.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
            <div className="w-10 h-10 rounded-lg bg-[#201f21] flex items-center justify-center text-[#ffb77f] mb-4">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
              Micronized Droplet Aerosol
            </h3>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
              Our aviation dispenser atomizes the formula into sub-5-micron particles. This dramatically increases surface area contact with cellular receptors, ensuring complete mucosal retention in under 15 seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
            <div className="w-10 h-10 rounded-lg bg-[#201f21] flex items-center justify-center text-[#00f0ff] mb-4">
              <span className="material-symbols-outlined text-[24px]">bedtime</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
              Circadian Dual Polarity
            </h3>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
              Stimulants taken past noon ruin nighttime adenosine binding. By microdosing Day Fuel only during peak morning hours and transitioning to Night Reset calmants, you avoid hormonal exhaustion and maintain natural sleep cycles.
            </p>
          </div>
        </div>

        {/* CTA Box */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#121318] to-[#1a1c24] border border-[#ff5a1f]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4] mb-2">
              Ready to calibrate your daily performance?
            </h3>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 max-w-lg">
              Start with the flagship 24H Circadian Starter Kit. Delivered in aviation-grade aluminum pocket chassis with 180 calibrated sprays.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOrderClick}
              className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer"
            >
              Order 24H Kit ($68)
            </button>
            <button
              onClick={onSimulateSpray}
              className="px-5 py-3.5 rounded-lg bg-[#201f21] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-wider hover:bg-[#2a2a2c] cursor-pointer"
            >
              Simulate Mist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
