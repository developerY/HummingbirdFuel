import React from 'react';

export const DeliveryPhysics: React.FC = () => {
  return (
    <section className="w-full bg-[#131315] py-16 md:py-24 border-y border-[#282a36]/60">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          <div className="lg:col-span-6">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-2">
              Nano-Delivery Physics
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#e5e1e4] tracking-tight">
              Why Microdose Spray Outperforms Pills &amp; High-Sugar Energy Drinks
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="font-['Manrope'] text-base md:text-lg text-[#e4beb3]/80 leading-relaxed">
              Pills lose up to 80% of active nootropics through first-pass liver degradation. Hummingbird Fuel's micronized aerosol directly hits the sublingual capillaries for clean instantaneous neurotransmitter transmission.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center justify-center text-[#ffb59e] mb-5 group-hover:border-[#ff5a1f]/40 transition-colors">
                <span className="material-symbols-outlined text-[26px]">network_intelligence</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] mb-2">
                AI Micro-Calibration
              </h3>
              <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
                Every pump dispenses an identical 0.12ml calibrated dosage, eliminating overstimulation and jitters.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#282a36]/60 font-['JetBrains_Mono'] text-xs text-[#ffb77f] font-semibold">
              METRIC: ±0.002 ML ACCURACY
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center justify-center text-[#ffb77f] mb-5 group-hover:border-[#ff8a00]/40 transition-colors">
                <span className="material-symbols-outlined text-[26px]">speed</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] mb-2">
                90-Second Bio-Uptake
              </h3>
              <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
                Absorbs through sublingual mucosa directly into the bloodstream without digestive delay.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#282a36]/60 font-['JetBrains_Mono'] text-xs text-[#ffb77f] font-semibold">
              RATE: 4.8X FASTER THAN CAPSULES
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center justify-center text-[#ffb95a] mb-5 group-hover:border-[#ffb95a]/40 transition-colors">
                <span className="material-symbols-outlined text-[26px]">battery_charging_full</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] mb-2">
                Clean Zero-Crash Curve
              </h3>
              <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
                No sugar spikes, no artificial fillers, and no adrenal exhaustion. Just pure, constant cognitive drive.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#282a36]/60 font-['JetBrains_Mono'] text-xs text-[#ffb95a] font-semibold">
              GLYCEMIC INDEX: 0.0
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#201f21] border border-[#282a36] flex items-center justify-center text-[#00f0ff] mb-5 group-hover:border-[#00f0ff]/40 transition-colors">
                <span className="material-symbols-outlined text-[26px]">sanitizer</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] mb-2">
                Pocket Form Factor
              </h3>
              <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
                High-tensile aluminum casing holds 90 sprays in a discreet, aviation-grade pocket flask.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#282a36]/60 font-['JetBrains_Mono'] text-xs text-[#00f0ff] font-semibold">
              CAPACITY: 45-DAY SUPPLY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
