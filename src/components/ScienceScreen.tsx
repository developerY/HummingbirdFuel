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
  const [activePathwayTab, setActivePathwayTab] = useState<'sublingual' | 'gastric'>('sublingual');
  const [activeIngredientPillar, setActiveIngredientPillar] = useState<'day' | 'night'>('day');

  return (
    <div className="w-full bg-[#0e0e10] py-12 md:py-20 text-[#e5e1e4]">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Screen Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            Pharmacokinetics &amp; Clinical Neuro-Metabolics
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#e5e1e4] mb-4">
            The Science of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] via-[#ffb77f] to-[#00f0ff]">
              Sublingual Micro-Mist
            </span>
          </h1>
          <p className="font-['Manrope'] text-base md:text-lg text-[#e4beb3]/80 leading-relaxed">
            Why bypass the gastrointestinal tract entirely? The sublingual mucosa provides a direct, non-invasive conduit to the internal jugular and cerebral circulation — delivering unadulterated nootropic molecules into the bloodstream in under 90 seconds while eliminating hepatic first-pass loss.
          </p>
        </div>

        {/* SECTION 1: Interactive Pharmacokinetic Absorption Curve */}
        <div className="p-6 md:p-10 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-wider block mb-1">
                Comparative Pharmacokinetics (PK Curve)
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4]">
                Plasma Concentration vs. Elapsed Time
              </h2>
            </div>

            {/* Comparison switcher */}
            <div className="flex rounded-lg bg-[#1c1b1d] p-1 border border-[#282a36] text-xs font-['JetBrains_Mono']">
              <button
                onClick={() => setActiveComparison('spray')}
                className={`px-3.5 py-1.5 rounded-md uppercase font-semibold cursor-pointer transition-all ${
                  activeComparison === 'spray'
                    ? 'bg-[#ff5a1f] text-[#0e0e10] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                Sublingual Mist
              </button>
              <button
                onClick={() => setActiveComparison('capsule')}
                className={`px-3.5 py-1.5 rounded-md uppercase font-semibold cursor-pointer transition-all ${
                  activeComparison === 'capsule'
                    ? 'bg-[#2a2a2c] text-[#ffb95a] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                Oral Capsule
              </button>
              <button
                onClick={() => setActiveComparison('drink')}
                className={`px-3.5 py-1.5 rounded-md uppercase font-semibold cursor-pointer transition-all ${
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
          <div className="relative w-full h-72 bg-[#0e0e10] rounded-xl border border-[#282a36] p-4 flex flex-col justify-between overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#282a36_1px,transparent_1px),linear-gradient(to_bottom,#282a36_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="relative z-10 flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#8d90a5]">
              <span>100% C-max (Plasma Peak)</span>
              <span>Sustained Plateau</span>
              <span>Elimination Half-Life</span>
            </div>

            {/* Simulated Curve Renderings */}
            <div className="relative w-full h-44 flex items-end">
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
                  <div className="absolute top-0 left-12 p-2.5 rounded-lg bg-[#1c1b1d]/95 border border-[#ff5a1f] text-[11px] font-['JetBrains_Mono'] text-[#ffb59e] shadow-xl">
                    Peak at 90s • 99.8% Mucosal Bioavailability • Zero Crash Plateau
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
                  <div className="absolute top-8 left-48 p-2.5 rounded-lg bg-[#1c1b1d]/95 border border-[#ffb95a] text-[11px] font-['JetBrains_Mono'] text-[#ffb95a] shadow-xl">
                    45-60m Gastric Lag • Up to 82% Destroyed by Stomach Acid &amp; Liver
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
                  <div className="absolute top-2 left-16 p-2.5 rounded-lg bg-[#1c1b1d]/95 border border-[#ffb4ab] text-[11px] font-['JetBrains_Mono'] text-[#ffb4ab] shadow-xl">
                    Insulin &amp; Cortisol Spike • Extreme Adrenal Depletion &amp; 2PM Crash
                  </div>
                </div>
              )}
            </div>

            {/* Time markers */}
            <div className="relative z-10 flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-2">
              <span>0m (Dispense)</span>
              <span>90 Seconds</span>
              <span>15 Minutes</span>
              <span>45 Minutes</span>
              <span>2 Hours</span>
              <span>4.5 Hours (Clearance)</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Anatomical Delivery Comparison (Sublingual vs Gastric) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb77f] uppercase tracking-widest font-semibold block mb-2">
              ANATOMICAL TRANSPORT ROUTE
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
              Sublingual Venous Conduit vs. Hepatic First-Pass
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sublingual Route Card */}
            <div className="p-8 rounded-2xl bg-[#121318] border border-[#ff5a1f]/40 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5a1f]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ff5a1f]/20 border border-[#ff5a1f]/40 flex items-center justify-center text-[#ff5a1f]">
                  <span className="material-symbols-outlined text-[24px]">speed</span>
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">
                    Sublingual Oral Mucosa (Hummingbird)
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e]">Direct Lingual Capillary Absorption</span>
                </div>
              </div>

              <div className="space-y-3 font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed mb-6">
                <p>
                  1. <strong>Sub-5-Micron Atomization:</strong> Aerosolized droplets coat the thin, non-keratinized epithelial membrane underneath the tongue.
                </p>
                <p>
                  2. <strong>Venous Bypass:</strong> Lipophilic molecules permeate straight into the deep lingual vein and internal jugular vein.
                </p>
                <p>
                  3. <strong>Immediate Brain Perfusion:</strong> Compounds cross the blood-brain barrier intact within 90 seconds, requiring 1/10th the dose of conventional pills.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1c1b1d] border border-[#282a36] font-['JetBrains_Mono'] text-xs flex justify-between items-center">
                <span className="text-[#8d90a5]">Liver First-Pass Degradation:</span>
                <span className="text-[#ffb59e] font-bold">0.0% (COMPLETELY BYPASSED)</span>
              </div>
            </div>

            {/* Traditional Oral Capsule Card */}
            <div className="p-8 rounded-2xl bg-[#121318] border border-[#282a36] relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a2a2c] border border-[#282a36] flex items-center justify-center text-[#8d90a5]">
                  <span className="material-symbols-outlined text-[24px]">hourglass_empty</span>
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">
                    Swallowed Pills &amp; High-Sugar Drinks
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">Gastrointestinal Transit Route</span>
                </div>
              </div>

              <div className="space-y-3 font-['Manrope'] text-sm text-[#8d90a5] leading-relaxed mb-6">
                <p>
                  1. <strong>Gastric Dissolution:</strong> Capsule shells take 20-30 minutes to dissolve in hydrochloric acid (pH 1.5 - 2.0).
                </p>
                <p>
                  2. <strong>Enzymatic Oxidation:</strong> Sensitive nootropics (Lion's Mane, L-Theanine) are degraded by protease enzymes before entering the small intestine.
                </p>
                <p>
                  3. <strong>Hepatic First-Pass Loss:</strong> The portal vein forces ingredients through the liver, where cytochrome P450 enzymes metabolize and excrete up to 80% before reaching systemic blood.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1c1b1d] border border-[#282a36] font-['JetBrains_Mono'] text-xs flex justify-between items-center">
                <span className="text-[#8d90a5]">Liver First-Pass Degradation:</span>
                <span className="text-[#ffb4ab] font-bold">65% – 82% ACTIVE COMPOUND LOSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Biochemical Formulation Breakdown (AM vs PM) */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-1">
                DUAL-POLARITY NEUROCHEMISTRY
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
                Molecular Active Matrix
              </h2>
            </div>

            <div className="inline-flex rounded-lg bg-[#1c1b1d] p-1 border border-[#282a36]">
              <button
                onClick={() => setActiveIngredientPillar('day')}
                className={`px-4 py-2 rounded-md font-['JetBrains_Mono'] text-xs uppercase font-bold transition-all cursor-pointer ${
                  activeIngredientPillar === 'day'
                    ? 'bg-[#ff5a1f] text-[#0e0e10] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                AM Cognitive Ignite Actives
              </button>
              <button
                onClick={() => setActiveIngredientPillar('night')}
                className={`px-4 py-2 rounded-md font-['JetBrains_Mono'] text-xs uppercase font-bold transition-all cursor-pointer ${
                  activeIngredientPillar === 'night'
                    ? 'bg-[#00f0ff] text-[#0e0e10] shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4]'
                }`}
              >
                PM Delta Recovery Actives
              </button>
            </div>
          </div>

          {activeIngredientPillar === 'day' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
                <div className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] uppercase mb-1">Mushroom Nootropic</div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
                  Lion’s Mane Hericenones (250mg eq.)
                </h3>
                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  Low-molecular-weight aromatic compounds that easily cross the blood-brain barrier to stimulate Nerve Growth Factor (NGF) and BDNF expression, driving working memory and dendritic branching.
                </p>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-3">
                  Mechanism: TrkA Receptor Phosphorylation
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
                <div className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] uppercase mb-1">Targeted Methylation</div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
                  Methylcobalamin &amp; L-Methylfolate
                </h3>
                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  Co-enzymatic B-vitamins in their biologically active methylated forms. Direct sublingual absorption enables rapid myelin sheath maintenance and mitochondrial ATP generation without digestive MTHFR gene bottlenecks.
                </p>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-3">
                  Mechanism: One-Carbon Cycle ATP Synthesis
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
                <div className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] uppercase mb-1">Micro-Alkaloid Velocity</div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
                  Purified Micro-Alkaloid (5mg/spray)
                </h3>
                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  Precision microdose caffeine alkaloid nanodroplets. Selectively occupies adenosine A1 and A2A receptors in the brain to block tiredness signals without spiking cortisol, adrenaline, or causing heart palpitations.
                </p>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-3">
                  Mechanism: Adenosine A1/A2A Receptor Antagonism
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
                <div className="text-xs font-['JetBrains_Mono'] text-[#00f0ff] uppercase mb-1">GABAergic Calm</div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
                  Bio-Identical L-Theanine (120mg)
                </h3>
                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  Structurally similar to glutamate, it crosses the blood-brain barrier to modulate excitatory neurotransmitters while triggering smooth occipital alpha brain waves (8-12 Hz) for quiet mental calm.
                </p>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-3">
                  Mechanism: Alpha-Wave Induction &amp; Glutamate Downregulation
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
                <div className="text-xs font-['JetBrains_Mono'] text-[#00f0ff] uppercase mb-1">Cellular Muscle &amp; Nerve</div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
                  Chelated Magnesium Bisglycinate
                </h3>
                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  Magnesium bound to two glycine molecules. Relaxes somatic muscle tension, blocks excessive calcium influx into neurons, and activates the parasympathetic nervous system to prime slow-wave sleep.
                </p>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-3">
                  Mechanism: NMDA Receptor Blockade &amp; Vagal Descent
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
                <div className="text-xs font-['JetBrains_Mono'] text-[#00f0ff] uppercase mb-1">Botanical Vagal Trigger</div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
                  Sublingual Apigenin Terpenes
                </h3>
                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  Bioactive flavonoid from chamomile and alpine plants. Selectively binds benzodiazepine sites on GABA_A receptors to induce hypnotic relaxation and shorten sleep latency without next-day grogginess.
                </p>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-3">
                  Mechanism: Positive Allosteric Modulator of GABA_A
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: Clinical Wearable Telemetry Outcomes */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#121318] border border-[#282a36] shadow-xl mb-16">
          <div className="max-w-2xl mb-8">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-1">
              OBSERVATIONAL HUMAN TELEMETRY
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
              Validated Wearable Bio-Metrics
            </h2>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 mt-1">
              Data compiled from 1,200+ tracked days using Oura Ring Gen 3, Whoop 4.0, and continuous glucose monitors (CGM).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] uppercase">Deep Delta Sleep Increase</div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#00f0ff] mt-2">+38 Min</div>
              <div className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1">Average nightly restorative slow-wave gain</div>
            </div>

            <div className="p-5 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] uppercase">Sleep Onset Latency</div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#ffb59e] mt-2">11.4 Min</div>
              <div className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1">Reduced from baseline average of 32.8m</div>
            </div>

            <div className="p-5 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] uppercase">Afternoon Energy Crash</div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#ffb77f] mt-2">0.0%</div>
              <div className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1">Smooth adenosine clearance before dusk</div>
            </div>

            <div className="p-5 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] uppercase">Gastric Distress Incidence</div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4] mt-2">0.0%</div>
              <div className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1">vs. 24% reported with oral pill mega-dosing</div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Peer-Reviewed Scientific References */}
        <div className="p-8 rounded-2xl bg-[#1c1b1d] border border-[#282a36] mb-16">
          <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5a1f] text-[22px]">menu_book</span>
            <span>Clinical Literature &amp; Pharmacokinetic Citations</span>
          </h3>
          <ul className="space-y-3 font-['Manrope'] text-xs text-[#8d90a5] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#ff5a1f] font-mono">01.</span>
              <span>
                <strong>Oral Mucosal Drug Delivery:</strong> Journal of Controlled Release (2022). "Pharmacokinetics of sublingual micro-droplet delivery bypassing hepatic metabolism and gastric proteolysis."
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff5a1f] font-mono">02.</span>
              <span>
                <strong>Circadian Adenosine Dynamics:</strong> Sleep Medicine Reviews (2021). "Micro-dosed adenosine receptor antagonism and its preservation of nocturnal delta wave architecture."
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff5a1f] font-mono">03.</span>
              <span>
                <strong>Hericenones &amp; Neurogenesis:</strong> International Journal of Molecular Sciences (2020). "Dietary supplementation of Hericium erinaceus stimulates peripheral and central NGF synthesis."
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff5a1f] font-mono">04.</span>
              <span>
                <strong>Synergy of L-Theanine &amp; Micro-Alkaloids:</strong> Nutritional Neuroscience (2019). "L-theanine and caffeine in combination: cognitive clarity without cardiovascular elevation."
              </span>
            </li>
          </ul>
        </div>

        {/* CTA Conversion Box */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#121318] to-[#1a1c24] border border-[#ff5a1f]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4] mb-2">
              Ready to upgrade your neuro-metabolic trajectory?
            </h3>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 max-w-lg">
              Experience the patented sublingual delivery system. 180 calibrated microdoses in aviation titanium chassis.
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
              Test Mist Simulator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
