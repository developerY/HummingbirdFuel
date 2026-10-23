import React from 'react';

interface HeroProps {
  onOrderClick: () => void;
  onExploreScienceClick: () => void;
  onSimulateSpray: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderClick,
  onExploreScienceClick,
  onSimulateSpray
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0e0e10] pt-8 md:pt-12 pb-16 md:pb-24">
      {/* Ambient Energy Core Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-[#ff5a1f]/20 via-[#ff8a00]/15 to-transparent blur-[140px] pointer-events-none"></div>
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-[#00f0ff]/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12 relative z-10">
        {/* Top Telemetry Micro-Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121318] border border-[#282a36] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-ping"></span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold">
              Next-Gen Bio-Enhancement
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs text-[#8d90a5] px-3 py-1 rounded-md bg-[#1c1b1d] border border-[#282a36]">
            <span className="material-symbols-outlined text-[15px] text-[#ffb95a]">bolt</span>
            <span>PATENTED SUBLINGUAL DELIVERY</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: High Impact Copy & Conversion Engine */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="mb-2">
              <span className="font-['JetBrains_Mono'] text-sm tracking-[0.2em] text-[#ffb77f] uppercase font-semibold block">
                Bio-Engineered For Humans
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-[56px] lg:leading-[1.1] uppercase tracking-tight text-[#e5e1e4] mb-5 font-bold">
              Hummingbird Fuel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] via-[#ffb77f] to-[#ffb95a]">
                For Humans.
              </span>
            </h1>

            <p className="font-['Manrope'] text-base md:text-lg text-[#e4beb3]/90 max-w-xl mb-8 leading-relaxed">
              Artificial Intelligent Microdose Energy Spray. Master your metabolic trajectory: Clean, crash-free cognitive fuel all day, and rapid sublingual neuro-reset for deep regenerative sleep at night.
            </p>

            {/* CTA Pod */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-base hover:brightness-110 shadow-[0_0_24px_rgba(255,90,31,0.35)] transition-all group cursor-pointer"
              >
                <span>Order Microdose Spray</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={onExploreScienceClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#201f21] border border-[#282a36] text-[#e5e1e4] hover:bg-[#2a2a2c] hover:border-[#ff5a1f]/40 font-['JetBrains_Mono'] text-sm uppercase tracking-wider transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb59e]">biotech</span>
                <span>Explore The Science</span>
              </button>

              <button
                onClick={onSimulateSpray}
                title="Trigger Nano-Mist Dispersion Simulation"
                className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-lg bg-[#1a1c24] border border-[#ff5a1f]/30 text-[#ffb77f] hover:text-[#fff] hover:bg-[#ff5a1f]/20 font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ff5a1f] animate-pulse">air</span>
                <span className="hidden xl:inline">Test Mist</span>
              </button>
            </div>

            {/* Micro Dose Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2">
              <div className="p-3.5 rounded-lg bg-[#121318] border border-[#282a36]">
                <div className="font-['JetBrains_Mono'] text-[11px] text-[#8d90a5] uppercase">Sugar Content</div>
                <div className="font-['Space_Grotesk'] text-xl font-bold text-[#ffb59e]">
                  0.0<span className="font-['JetBrains_Mono'] text-xs font-normal">g</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121318] border border-[#282a36]">
                <div className="font-['JetBrains_Mono'] text-[11px] text-[#8d90a5] uppercase">Absorption</div>
                <div className="font-['Space_Grotesk'] text-xl font-bold text-[#ffb77f]">
                  &lt;90<span className="font-['JetBrains_Mono'] text-xs font-normal">sec</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121318] border border-[#282a36]">
                <div className="font-['JetBrains_Mono'] text-[11px] text-[#8d90a5] uppercase">Crash Index</div>
                <div className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">ZERO</div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121318] border border-[#282a36]">
                <div className="font-['JetBrains_Mono'] text-[11px] text-[#8d90a5] uppercase">Circadian Sync</div>
                <div className="font-['Space_Grotesk'] text-xl font-bold text-[#00f0ff]">100%</div>
              </div>
            </div>
          </div>

          {/* Right: Kinetic Visual Pod (Hummingbird Emblem & Spray Rendering) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center">
              {/* Radiating Energy Rings */}
              <div className="absolute inset-0 rounded-full bg-[#2a2a2c]/40 animate-pulse pointer-events-none"></div>
              <div className="absolute inset-4 rounded-full border border-[#ff5a1f]/20 pointer-events-none animate-spin" style={{ animationDuration: '40s' }}></div>
              <div className="absolute inset-8 rounded-full bg-[#121318]/90 shadow-2xl flex items-center justify-center overflow-hidden border border-[#282a36]">
                <img
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 select-none"
                  alt="Futuristic cybernetic black hummingbird with incandescent flame-engulfed wings taking flight, glowing molten amber, neon orange embers, and sleek dark obsidian reflective backdrop in high biohacking luxury render aesthetic."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDIJQNh82OA3ohsVHpZtEv9VJgZp4uDeWTZSok7aMSITGyFg96NtHm0z2wRGxWIMsIwPxtSL7OgDXVGFlDqC4ZbbrUic0fo72a7jkreYQkdQKWIQ7pThBwMFWNxPvjX1nlCeOfC8_EQLWExQyqMhH84SOMOnnbco7AWbnmEdmuLAlddEJxleaZq36D_FXuSao0JGeVR_GKB3-hUogtkM9X_swGaeQrntrgVn6tbYYiINgGqa7MS3w"
                />
              </div>

              {/* Overlapping Floating Nano-Mist HUD Tag */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 p-3.5 rounded-xl bg-[#121318]/95 backdrop-blur-xl border border-[#282a36] shadow-xl flex items-center gap-3 max-w-xs transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f] shrink-0 border border-[#ff5a1f]/30">
                  <span className="material-symbols-outlined text-[24px]">air</span>
                </div>
                <div className="min-w-0">
                  <div className="font-['JetBrains_Mono'] text-[10px] text-[#ffb59e] uppercase font-bold tracking-wider">
                    Sublingual Micro-Mist
                  </div>
                  <div className="font-['Manrope'] text-xs font-medium text-[#e5e1e4] truncate">
                    99.8% Mucosal Bio-Uptake
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Circadian Dial Tag */}
              <div className="absolute -top-3 -right-2 sm:-right-4 p-3.5 rounded-xl bg-[#121318]/95 backdrop-blur-xl border border-[#282a36] shadow-xl flex items-center gap-2.5 transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-[#ffb95a] text-[20px]">schedule</span>
                <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#e5e1e4] uppercase tracking-wider">
                  Day / Night Sync
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
