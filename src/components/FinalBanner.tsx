import React from 'react';

interface FinalBannerProps {
  onGetStarted: () => void;
  onTalkToBiohacker: () => void;
}

export const FinalBanner: React.FC<FinalBannerProps> = ({
  onGetStarted,
  onTalkToBiohacker
}) => {
  return (
    <section className="w-full bg-gradient-to-b from-[#0e0e10] to-[#131315] py-20 md:py-28 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#ff5a1f]/15 via-[#ff8a00]/10 to-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12 text-center relative z-10">
        <div className="inline-block px-4 py-1 rounded-full bg-[#121318] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-widest mb-6 font-semibold shadow-sm">
          Upgrade Human Vitality
        </div>

        <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#e5e1e4] max-w-3xl mx-auto mb-5 leading-tight">
          Master Your Energy. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] via-[#ffb77f] to-[#ffb95a]">
            Reclaim Your Sleep.
          </span>
        </h2>

        <p className="font-['Manrope'] text-base md:text-lg text-[#e4beb3]/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Experience the precision power of AI-calibrated sublingual nutrition. Backed by science, engineered for human peak performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_0_30px_rgba(255,90,31,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started Now</span>
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </button>

          <button
            onClick={onTalkToBiohacker}
            className="w-full sm:w-auto px-7 py-4 rounded-lg bg-[#121318] border border-[#282a36] text-[#e5e1e4] hover:bg-[#201f21] hover:border-[#ff5a1f]/40 font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
          >
            Talk to a Biohacker
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 text-[#8d90a5] font-['JetBrains_Mono'] text-xs uppercase">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#ffb59e]">verified</span>
            cGMP Facility
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#ffb77f]">local_shipping</span>
            Fast Carbon-Neutral Shipping
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#ffb95a]">replay</span>
            30-Day Money-Back Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};
