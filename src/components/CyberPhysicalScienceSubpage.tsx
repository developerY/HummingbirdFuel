import React, { useState, useEffect, useMemo } from 'react';

export type CyberPhysicalSubTab =
  | 'overview'
  | 'ingestion'
  | 'algorithm'
  | 'delivery'
  | 'clinical'
  | 'regulatory';

interface CyberPhysicalScienceSubpageProps {
  onOrderClick?: () => void;
  onSimulateSpray?: () => void;
  activeSubTab?: CyberPhysicalSubTab;
  onSubTabChange?: (tab: CyberPhysicalSubTab) => void;
  onCopyDeepLink?: (tab: CyberPhysicalSubTab) => void;
}

export const CyberPhysicalScienceSubpage: React.FC<CyberPhysicalScienceSubpageProps> = ({
  onOrderClick,
  onSimulateSpray,
  activeSubTab: propSubTab,
  onSubTabChange,
  onCopyDeepLink,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<CyberPhysicalSubTab>(propSubTab || 'overview');

  useEffect(() => {
    if (propSubTab && propSubTab !== activeSubTab) {
      setActiveSubTab(propSubTab);
    }
  }, [propSubTab]);

  const handleSelectTab = (tab: CyberPhysicalSubTab) => {
    setActiveSubTab(tab);
    onSubTabChange?.(tab);
  };

  // Simulator State (Tab 3)
  const [simGenotype, setSimGenotype] = useState<'fast' | 'slow'>('fast');
  const [simStrategy, setSimStrategy] = useState<'bolus' | 'micro' | 'late'>('micro');

  // Regulatory Wizard State (Tab 6)
  const [regCompound, setRegCompound] = useState<'caffeine' | 'adhd' | 'oncology'>('caffeine');
  const [regSensor, setRegSensor] = useState<'discrete' | 'continuous' | 'microneedle'>('continuous');
  const [regRecipient, setRegRecipient] = useState<'patient' | 'hcp'>('patient');
  const [regPharma, setRegPharma] = useState<'standalone' | 'copackaged'>('copackaged');

  // Compute PK/PD Bateman curves
  const pkpdData = useMemo(() => {
    const points = 97; // 24 hours at 15-min increments
    const ka = 2.0; // Absorption rate (1/hr)
    const ke = simGenotype === 'fast' ? 0.231 : 0.077; // Fast AA (t1/2 ~ 3h) vs Slow CC (t1/2 ~ 9h)

    let doses: [number, number][] = [];
    if (simStrategy === 'bolus') {
      doses = [[8.0, 200]]; // 200mg single coffee bolus at 08:00
    } else if (simStrategy === 'micro') {
      doses = [[8.0, 25], [10.5, 25], [13.0, 25], [15.5, 25]]; // 4x 25mg microdoses
    } else if (simStrategy === 'late') {
      doses = [[8.0, 100], [13.0, 50], [18.5, 50]]; // Late microdose at 18:30
    }

    const McData: number[] = [];
    const PData: number[] = [];

    for (let idx = 0; idx < points; idx++) {
      const t = idx * 0.25;

      // 1. Bateman superposition
      let Mc = 0;
      for (const d of doses) {
        const t_d = d[0];
        const dose = d[1];
        if (t >= t_d) {
          const dt = t - t_d;
          const conc = dose * (ka / (ka - ke)) * (Math.exp(-ke * dt) - Math.exp(-ka * dt));
          Mc += Math.max(0, conc);
        }
      }
      McData.push(Mc);

      // 2. Baseline sleepiness P0(t) = S(t) + C(t) (Borbély Two-Process Model)
      const wakeTime = 6.0;
      const awakeHours = t >= wakeTime ? t - wakeTime : t + 18.0;
      const S = 250 + 150 * (1 - Math.exp(-0.08 * awakeHours));
      const C = 40 * Math.sin(((2 * Math.PI) / 24) * (t - 11.0));
      const P0 = S + C;

      // 3. Pharmacodynamic reduction factor g_PD(t) via Hill equation
      const M0 = 0.8;
      const g_PD = 1 / (1 + M0 * (Mc / 30.0));
      const P = P0 * g_PD;
      PData.push(P);
    }

    return { Mc: McData, P: PData };
  }, [simGenotype, simStrategy]);

  // Regulatory Evaluation Logic (Tab 6)
  const regulatoryResult = useMemo(() => {
    if (regCompound === 'caffeine' && regSensor !== 'microneedle') {
      return {
        badge: 'General Wellness Exempt',
        badgeColor: 'bg-[#ff5a1f]/20 text-[#ffb59e] border-[#ff5a1f]/40',
        icon: 'spa',
        title: 'FDA Enforcement Discretion (Low Risk)',
        desc: 'Compliant with January 2026 General Wellness Guidance. Exempt from premarket submission (510k) and Section 524B medical device cyber mandates.',
        details: [
          'Labeling Limit: Must make zero disease claims or medical diagnosis statements.',
          'Sensor Rule: Non-invasive PPG and smart bottles are permitted under Examples 7 & 9.'
        ],
        cardClass: 'border-[#ff5a1f]/40 bg-[#1c1b1d]'
      };
    } else if (regSensor === 'microneedle') {
      return {
        badge: 'Disqualified from Wellness',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        icon: 'warning',
        title: 'Invasive Medical Device (Class II SaMD)',
        desc: 'Fails Jan 2026 General Wellness Example 8. Piercing skin or mucous membranes via microneedles strips low-risk status.',
        details: [
          'Regulatory Action: Requires 510(k) or De Novo premarket authorization.',
          'Precedent: FDA July 2025 Warning Letters for uncleared continuous sensor integration.'
        ],
        cardClass: 'border-rose-500/40 bg-[#1c1b1d]'
      };
    } else if (regCompound !== 'caffeine' && regSensor === 'continuous') {
      return {
        badge: 'Regulated SaMD (Class II / III)',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        icon: 'gavel',
        title: 'Fails Non-Device CDS Criterion 1 & 3',
        desc: 'Classified as Software as a Medical Device (SaMD) under the Jan 2026 CDS Final Guidance.',
        details: [
          'Criterion 1 Failure: Ingesting sequential signal patterns (HRV, CGM, continuous PPG) invalidates CDS exclusion.',
          'Criterion 3 Failure: Direct-to-patient dosing recommendations strip Non-Device CDS status.',
          ...(regPharma === 'copackaged'
            ? ['Oct 2026 PDURS Rule: Connected software MUST be described on FDA official drug prescribing label.']
            : [])
        ],
        cardClass: 'border-amber-500/40 bg-[#1c1b1d]'
      };
    } else if (regCompound !== 'caffeine' && regSensor === 'discrete' && regRecipient === 'hcp') {
      return {
        badge: 'Non-Device CDS Exempt',
        badgeColor: 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/40',
        icon: 'medical_services',
        title: 'Excluded from Device Regulation',
        desc: 'Meets all 4 statutory criteria of FD&C Act § 520(o)(1)(E) as clarified in Jan 2026 CDS Guidance.',
        details: [
          'Criterion 1: Uses discrete lab values, not continuous wearable signal patterns.',
          'Criterion 4: Displays full algorithm validation transparency so HCP can independently review basis.'
        ],
        cardClass: 'border-[#00f0ff]/40 bg-[#1c1b1d]'
      };
    } else {
      return {
        badge: 'Regulated SaMD',
        badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
        icon: 'smartphone',
        title: 'Class II Medical Device',
        desc: 'Requires premarket clearance (510k/De Novo) and Section 524B cybersecurity controls.',
        details: ['Direct-to-patient prescription dose calculation requires formal FDA clinical trials.'],
        cardClass: 'border-[#282a36] bg-[#1c1b1d]'
      };
    }
  }, [regCompound, regSensor, regRecipient, regPharma]);

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Subpage Header & Sub-Menu Bar */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#121318] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
              2026 Engineering &amp; Clinical Reality Standard
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e5e1e4]">
              Cyber-Physical Systems &amp; Clinical Explorer
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1b1d] border border-[#282a36] text-[11px] font-['JetBrains_Mono'] text-[#ffb59e] self-start md:self-auto">
            ZoeWave / YLabZ Architecture
          </span>
        </div>

        <p className="font-['Manrope'] text-xs sm:text-sm text-[#e4beb3]/80 max-w-4xl leading-relaxed mb-6">
          This technical specification deconstructs the gap between consumer wellness marketing concepts and the engineering, physiological, and regulatory boundaries of clinical closed-loop microdosing platforms.
        </p>

        {/* Clean Standard Sub-Menu Tabs Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 rounded-xl bg-[#121318] border border-[#282a36] mb-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#8d90a5] px-2 hidden lg:inline">
              Sub-Menu:
            </span>
            {[
              { id: 'overview', label: '📊 Reality Matrix' },
              { id: 'ingestion', label: '📡 Sensors & Pipeline' },
              { id: 'algorithm', label: '🧬 Bateman PK/PD' },
              { id: 'delivery', label: '💊 McCarthy Hardware' },
              { id: 'clinical', label: '🩺 ADHD / Cancer' },
              { id: 'regulatory', label: '🛡️ 2026 FDA Engine' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id as CyberPhysicalSubTab)}
                className={`px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-[#ff5a1f] text-[#0e0e10] font-bold shadow-md'
                    : 'text-[#8d90a5] hover:text-[#e5e1e4] hover:bg-[#1c1b1d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {onCopyDeepLink && (
            <button
              onClick={() => onCopyDeepLink(activeSubTab)}
              title="Copy deep link URL directly to this specific clinical subtab"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1b1d] border border-[#282a36] hover:border-[#ff5a1f] text-[#ffb59e] hover:text-[#ff8a00] text-xs font-['JetBrains_Mono'] shrink-0 cursor-pointer transition-all self-end sm:self-auto"
            >
              <span className="material-symbols-outlined text-[15px]">link</span>
              <span>Copy Section Link</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================== SUB-TAB 1: OVERVIEW & REALITY MATRIX ==================== */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#121318] border border-[#282a36]">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] mb-2">
              System Overview: Product Concept vs. Production Reality
            </h3>
            <p className="font-['Manrope'] text-xs sm:text-sm text-[#e4beb3]/80 leading-relaxed">
              Translating Hummingbird Fuel from a consumer wellness aerosol into an FDA-compliant closed-loop therapeutic control engine (<strong>Hummingbird Fuel Rx</strong>) exposes critical physiological, API latency, and pharmacodynamic boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Dimension 1 */}
            <div className="bg-[#121318] p-5 rounded-2xl border border-[#282a36] shadow-sm flex flex-col justify-between hover:border-[#ff5a1f]/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-[#ffb59e] bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 px-2.5 py-1 rounded">
                    Delivery Hardware
                  </span>
                  <span className="text-lg">🚿</span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-base mb-2">
                  Manual Spray vs. BLE Actuator
                </h4>
                <div className="space-y-3 text-xs font-['Manrope']">
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-amber-500/20">
                    <span className="font-bold text-[#ffb77f] font-['JetBrains_Mono'] block mb-0.5">Stated Marketing Concept:</span>
                    <p className="text-[#e4beb3]/70">Reusable $7.99 2 oz manual spray bottle paired with app push notifications.</p>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-[#282a36]">
                    <span className="font-bold text-[#e5e1e4] font-['JetBrains_Mono'] block mb-0.5">2026 Engineering Reality:</span>
                    <p className="text-[#8d90a5]">Manual sprays suffer severe adherence drift. Clinical dosing requires a Bluetooth Low Energy (BLE) metered-dose actuator with piezoresistive dose logging and solenoid lockout.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension 2 */}
            <div className="bg-[#121318] p-5 rounded-2xl border border-[#282a36] shadow-sm flex flex-col justify-between hover:border-[#ff5a1f]/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-[#ffb59e] bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 px-2.5 py-1 rounded">
                    Biometric Inputs
                  </span>
                  <span className="text-lg">⌚</span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-base mb-2">
                  Smartwatch Non-Invasive Sensors
                </h4>
                <div className="space-y-3 text-xs font-['Manrope']">
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-amber-500/20">
                    <span className="font-bold text-[#ffb77f] font-['JetBrains_Mono'] block mb-0.5">Stated Marketing Concept:</span>
                    <p className="text-[#e4beb3]/70">"Real-time" blood sugar, hydration, heart rate, sleep, and calendar ingestion via watch.</p>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-[#282a36]">
                    <span className="font-bold text-[#e5e1e4] font-['JetBrains_Mono'] block mb-0.5">2026 Engineering Reality:</span>
                    <p className="text-[#8d90a5]">No consumer watch has FDA clearance for non-invasive glucose; requires BLE continuous glucose monitors (CGM). Hydration requires spot wrist BIA, sweat patches, or smart bottles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension 3 */}
            <div className="bg-[#121318] p-5 rounded-2xl border border-[#282a36] shadow-sm flex flex-col justify-between hover:border-[#ff5a1f]/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-[#ffb59e] bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 px-2.5 py-1 rounded">
                    OS Data Pipeline
                  </span>
                  <span className="text-lg">📲</span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-base mb-2">
                  HealthKit &amp; Health Connect Sync
                </h4>
                <div className="space-y-3 text-xs font-['Manrope']">
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-amber-500/20">
                    <span className="font-bold text-[#ffb77f] font-['JetBrains_Mono'] block mb-0.5">Stated Marketing Concept:</span>
                    <p className="text-[#e4beb3]/70">Seamless real-time streaming from OS health hubs into mobile ML models.</p>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-[#282a36]">
                    <span className="font-bold text-[#e5e1e4] font-['JetBrains_Mono'] block mb-0.5">2026 Engineering Reality:</span>
                    <p className="text-[#8d90a5]">Neither HealthKit nor Health Connect stream in real time. OS throttles background wakes up to 60 minutes. Google Health v5.05 omits HRV SDNN/RMSSD translation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension 4 */}
            <div className="bg-[#121318] p-5 rounded-2xl border border-[#282a36] shadow-sm flex flex-col justify-between hover:border-[#00f0ff]/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-2.5 py-1 rounded">
                    AI Architecture
                  </span>
                  <span className="text-lg">🧠</span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-base mb-2">
                  Pure ML vs. Hybrid PK/PD Twin
                </h4>
                <div className="space-y-3 text-xs font-['Manrope']">
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-amber-500/20">
                    <span className="font-bold text-[#ffb77f] font-['JetBrains_Mono'] block mb-0.5">Stated Marketing Concept:</span>
                    <p className="text-[#e4beb3]/70">On-device ML models learning schedule purely from personal biometric data.</p>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-[#282a36]">
                    <span className="font-bold text-[#e5e1e4] font-['JetBrains_Mono'] block mb-0.5">2026 Engineering Reality:</span>
                    <p className="text-[#8d90a5]">Pure ML overfits on sparse outcomes. Requires a hybrid model pairing differential equations (US Army 2B-Alert / UMP) with Bayesian updating &amp; RL (UA-PPO).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension 5 */}
            <div className="bg-[#121318] p-5 rounded-2xl border border-[#282a36] shadow-sm flex flex-col justify-between hover:border-[#00f0ff]/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-2.5 py-1 rounded">
                    Pharmacokinetics
                  </span>
                  <span className="text-lg">⚡</span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-base mb-2">
                  Sublingual Speed vs. Volumetric Dose
                </h4>
                <div className="space-y-3 text-xs font-['Manrope']">
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-amber-500/20">
                    <span className="font-bold text-[#ffb77f] font-['JetBrains_Mono'] block mb-0.5">Stated Marketing Concept:</span>
                    <p className="text-[#e4beb3]/70">Sublingual spray gives instant energy boosts and generalizes flatly to ADHD/cancer.</p>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-[#282a36]">
                    <span className="font-bold text-[#e5e1e4] font-['JetBrains_Mono'] block mb-0.5">2026 Engineering Reality:</span>
                    <p className="text-[#8d90a5]">McCarthy (2025) trial proved sprays do NOT accelerate Tmax (90 min). Benefit stems from volumetric fractionation (15mg). Flat ADHD microdosing fails via tachyphylaxis.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension 6 */}
            <div className="bg-[#121318] p-5 rounded-2xl border border-[#282a36] shadow-sm flex flex-col justify-between hover:border-rose-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded">
                    FDA Regulation
                  </span>
                  <span className="text-lg">⚖️</span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-base mb-2">
                  General Wellness vs. SaMD
                </h4>
                <div className="space-y-3 text-xs font-['Manrope']">
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-amber-500/20">
                    <span className="font-bold text-[#ffb77f] font-['JetBrains_Mono'] block mb-0.5">Stated Marketing Concept:</span>
                    <p className="text-[#e4beb3]/70">Single consumer beta app seamlessly expanding into prescription therapeutics.</p>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1d] rounded border border-[#282a36]">
                    <span className="font-bold text-[#e5e1e4] font-['JetBrains_Mono'] block mb-0.5">2026 Engineering Reality:</span>
                    <p className="text-[#8d90a5]">Strictly bifurcated under 2026 FDA rules. Consumer caffeine is Wellness exempt; continuous wearable signal prescription software fails CDS Criterion 1, making it Class II/III SaMD.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 2: INGESTION & OS PIPELINE ==================== */}
      {activeSubTab === 'ingestion' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#ff5a1f]/20 text-[#ff5a1f] border border-[#ff5a1f]/30 rounded-xl text-lg">
                🩺
              </div>
              <div>
                <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg">The Non-Invasive Sensor Gap</h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">Hardware realities of Glucose and Hydration telemetry</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-['Manrope'] text-[#e4beb3]/80">
              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#e5e1e4] text-sm block mb-1 font-['Space_Grotesk']">
                  Continuous Glucose Monitoring (CGM)
                </span>
                <p className="mb-2 leading-relaxed text-[#8d90a5]">
                  Zero consumer smartwatches possess FDA clearance for optical/non-invasive blood glucose. Unvalidated optical wearables fail under motion/sweat artifacts.
                </p>
                <span className="inline-block px-2.5 py-0.5 bg-[#ff5a1f]/20 text-[#ffb59e] font-['JetBrains_Mono'] font-semibold rounded text-[11px] mb-1">
                  Production Solution:
                </span>
                <p className="text-[#e4beb3]/90">
                  Must pair via BLE with minimally invasive ISF devices (e.g. Dexcom G7 direct-to-watch) and adjust for 5–10 min ISF-to-blood lag.
                </p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#e5e1e4] text-sm block mb-1 font-['Space_Grotesk']">
                  Wearable Hydration Modalities
                </span>
                <p className="mb-2 text-[#8d90a5]">
                  Mass market smartwatches lack passive 24/7 continuous hydration sensors. Modalities split across four clinical categories:
                </p>
                <ul className="list-disc pl-4 space-y-1.5 text-[#e4beb3]/80">
                  <li><strong>Spot Wrist BIA:</strong> Requires manual multi-finger electrode placement (Galaxy Watch 7).</li>
                  <li><strong>Sweat Biosensors:</strong> Requires active perspiration (Nix, Epicore microfluidic patches).</li>
                  <li><strong>Optical/Microwave:</strong> Hydrostasis Geca optical wristbands sensing 0.5–1% fluid shifts.</li>
                  <li><strong>BLE Smart Bottles:</strong> Weight/pressure pucks (HidrateSpark PRO 2) logging volume per sip.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 rounded-xl text-lg">
                📲
              </div>
              <div>
                <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg">Mobile OS Sync &amp; Metric Incompatibility</h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">HealthKit, Health Connect, and Watch Daemon Workarounds</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-['Manrope'] text-[#e4beb3]/80">
              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#00f0ff] text-sm block mb-1 font-['Space_Grotesk']">
                  Background Wake Throttle (60-Minute Latency)
                </span>
                <p className="leading-relaxed text-[#8d90a5]">
                  Neither HealthKit nor Health Connect is a real-time streaming API. iOS throttles background health notifications to a maximum frequency of <strong>once per hour</strong>. Relying purely on health hub background wakes causes dose notifications to lag biological tiredness by 30–60 minutes. Production engines require a companion <strong>watchOS/WearOS daemon</strong> running an active background workout session.
                </p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-rose-500/30">
                <span className="font-bold text-rose-300 text-sm block mb-1 font-['Space_Grotesk']">
                  The HRV Mathematical Failure Mode (SDNN vs. RMSSD)
                </span>
                <p className="mb-2 text-[#8d90a5]">
                  Autonomic stress algorithms rely heavily on Heart Rate Variability. However, Apple and Google compute incompatible mathematical metrics:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-[#121318] p-2.5 rounded border border-[#282a36]">
                    <strong className="text-[#e5e1e4] block">Apple HealthKit:</strong>
                    Stores SDNN (Standard Deviation of NN intervals)
                  </div>
                  <div className="bg-[#121318] p-2.5 rounded border border-[#282a36]">
                    <strong className="text-[#e5e1e4] block">Google Health / WearOS:</strong>
                    Stores RMSSD (Root Mean Square of Successive Differences)
                  </div>
                </div>
                <p className="mt-2 text-[#8d90a5]">
                  When Google Health v5.05 enabled iOS sync, it <em>omitted outbound HRV conversion</em>. An AI engine ingesting cross-platform data without raw beat-to-beat RR extraction will calculate invalid autonomic fatigue states.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 3: ALGORITHMIC PK/PD SIMULATOR ==================== */}
      {activeSubTab === 'algorithm' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#282a36]">
            <div>
              <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-xl">
                Interactive PK/PD &amp; Alertness Simulator
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
                Simulate Bateman Caffeine Plasma Curves M_c(t) and Reaction Time Alertness P(t)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-['JetBrains_Mono'] font-bold text-[#8d90a5] uppercase mb-1">
                  CYP1A2 Genotype
                </label>
                <select
                  value={simGenotype}
                  onChange={(e) => setSimGenotype(e.target.value as any)}
                  className="text-xs font-['JetBrains_Mono'] font-semibold bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f]"
                >
                  <option value="fast">AA Allele (Fast Metabolizer: t½ ~ 3.0 hrs)</option>
                  <option value="slow">CC Allele (Slow Metabolizer: t½ ~ 9.0 hrs)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-['JetBrains_Mono'] font-bold text-[#8d90a5] uppercase mb-1">
                  Dosing Strategy
                </label>
                <select
                  value={simStrategy}
                  onChange={(e) => setSimStrategy(e.target.value as any)}
                  className="text-xs font-['JetBrains_Mono'] font-semibold bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f]"
                >
                  <option value="micro">4x Microdoses (25mg at 08:00, 10:30, 13:00, 15:30)</option>
                  <option value="bolus">1x Single Bolus (200mg Coffee at 08:00)</option>
                  <option value="late">Late Microdose Failure (50mg at 18:30)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Chart Canvas Simulation */}
          <div className="relative w-full h-80 bg-[#0e0e10] rounded-xl border border-[#282a36] p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center text-xs font-['JetBrains_Mono']">
              <span className="flex items-center gap-2 text-[#ff5a1f]">
                <span className="w-3 h-0.5 bg-[#ff5a1f] inline-block"></span>
                Circulating Drug Mass M_c(t) [mg]
              </span>
              <span className="flex items-center gap-2 text-[#00f0ff]">
                <span className="w-3 h-0.5 bg-[#00f0ff] border-t border-dashed inline-block"></span>
                Reaction Time Impairment P(t) [ms]
              </span>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full h-56 flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                {/* Horizontal Gridlines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#282a36" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#282a36" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#282a36" strokeDasharray="3 3" />

                {/* Mc(t) curve (Amber) */}
                <path
                  d={pkpdData.Mc.reduce((acc, val, i) => {
                    const x = (i / (pkpdData.Mc.length - 1)) * 500;
                    const y = 160 - Math.min(150, (val / 200) * 150);
                    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#ff5a1f"
                  strokeWidth="2.5"
                />

                {/* P(t) curve (Cyan dashed) */}
                <path
                  d={pkpdData.P.reduce((acc, val, i) => {
                    const x = (i / (pkpdData.P.length - 1)) * 500;
                    const y = 160 - Math.min(150, ((val - 200) / 250) * 150);
                    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-1">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00 (Dose)</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>24:00</span>
            </div>
          </div>

          {/* Dynamic Math Context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-['Manrope']">
            <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
              <span className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] block mb-1">Bateman PK Differential Eq:</span>
              <p className="font-mono text-[11px] text-[#ffb59e]">M_c(t) = Σ c_j * (k_a/(k_a - k_e)) * (e^(-k_e*Δt) - e^(-k_a*Δt))</p>
              <p className="text-[11px] text-[#8d90a5] mt-1.5">Calculates circulating plasma drug mass over 24 hours.</p>
            </div>

            <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
              <span className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] block mb-1">UMP Alertness Equation:</span>
              <p className="font-mono text-[11px] text-[#00f0ff]">P(t) = [S(t) + κ*C(t)] * g_PD(t, M_c)</p>
              <p className="text-[11px] text-[#8d90a5] mt-1.5">Combines Homeostatic sleep pressure S(t) and Circadian pacemaker C(t).</p>
            </div>

            <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
              <span className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] block mb-1">UA-PPO Reward Function:</span>
              <p className="font-mono text-[11px] text-[#ffb77f]">R = -w1*max(0, P-Pmax)² - w2*c_t - w3*SleepDisrupt</p>
              <p className="text-[11px] text-[#8d90a5] mt-1.5">RL policy penalizing high reaction times and bedtime drug residue.</p>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 4: DELIVERY MECHANICS & HARDWARE ==================== */}
      {activeSubTab === 'delivery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-500/20 text-[#ffb77f] border border-amber-500/30 rounded-xl text-lg">
                🧪
              </div>
              <div>
                <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg">The Sublingual Speed Myth Debunked</h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">McCarthy et al. (Feb 2025) Crossover Clinical Trial Results</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-['Manrope'] text-[#e4beb3]/80">
              <p className="leading-relaxed">
                A landmark randomized crossover trial compared 60mg caffeine delivered via sublingual mouth spray against ingested coffee and energy drinks across 14 healthy adults over 90 minutes of serial serum sampling:
              </p>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-amber-500/30 space-y-2">
                <div className="flex justify-between items-center font-bold font-['Space_Grotesk'] text-[#ffb77f]">
                  <span>Serum Tmax Peak Time:</span>
                  <span>90 Minutes Post-Spray</span>
                </div>
                <p className="text-[#8d90a5]">
                  Sublingual spray did NOT accelerate systemic absorption over coffee or energy drinks. At 5 minutes post-spray, serum caffeine was statistically indistinguishable from baseline (p = 0.50).
                </p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#e5e1e4] block mb-1 font-['Space_Grotesk']">Why Sublingual Spray Solutes Swallow:</span>
                <p className="text-[#8d90a5]">
                  Unlike chewing caffeinated gum (which forces drug across buccal mucosa during 10 minutes of mastication to reach Tmax in 30 mins), liquid spray mists trigger immediate swallowing, routing drug into the GI tract where caffeine already possesses ~100% natural bioavailability.
                </p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#ff5a1f]/30">
                <span className="font-bold text-[#ffb59e] block mb-1 font-['Space_Grotesk']">The True Advantage: Volumetric Fractionation</span>
                <p className="text-[#e4beb3]/90">
                  A metered 0.12mL spray nozzle acts as a precision micro-pipette. Delivering 15mg caffeine micro-aliquots maintains adenosine A1/A2A receptor occupancy without triggering cortisol surges or pressor tolerance.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 rounded-xl text-lg">
                ⚙️
              </div>
              <div>
                <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg">Hummingbird Fuel Rx Connected Actuators</h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">Upgrading from Passive Bottles to Connected Medical Devices</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-['Manrope'] text-[#e4beb3]/80">
              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#e5e1e4] text-sm block mb-1 font-['Space_Grotesk']">
                  Aptar HeroTracker-Class BLE Actuators
                </span>
                <p className="text-[#8d90a5]">
                  For prescription therapeutics (ADHD/Oncology), passive spray bottles fail due to unrecorded adherence drift. Clinical deployments require BLE metered-dose actuators equipped with piezoresistive strain gauges to log exact stroke compression timestamps to non-volatile memory.
                </p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#e5e1e4] text-sm block mb-1 font-['Space_Grotesk']">
                  Electromechanical Solenoid Lockout
                </span>
                <p className="text-[#8d90a5]">
                  To eliminate double-dosing or diversion of controlled substances, connected actuators feature motorized lockouts that physically prevent nozzle stroke actuation outside algorithmically authorized PK windows.
                </p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36]">
                <span className="font-bold text-[#e5e1e4] text-sm block mb-1 font-['Space_Grotesk']">
                  Closed-Loop Pharmacogenomic Inference
                </span>
                <p className="text-[#8d90a5]">
                  The app infers latent CYP1A2 and ADORA2A genotypes without DNA testing. If sleeping heart rate spikes and overnight HRV drops following afternoon sprays, the model dynamically reduces estimated elimination rate k_e and restricts late-day dosing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 5: CLINICAL VERTICALS (ADHD/CANCER) ==================== */}
      {activeSubTab === 'clinical' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-[#282a36]">
              <div>
                <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg">
                  ADHD Pharmacotherapy: The Tachyphylaxis &amp; Sensitization Paradox
                </h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
                  Why flat zero-order microdosing fails SKAMP clinical efficacy (Swanson et al. Classroom Trials)
                </p>
              </div>
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-['JetBrains_Mono'] font-bold rounded-lg">
                Clinical Alert: Low-Dose Sensitization Risk
              </span>
            </div>

            {/* ADHD Chart Visualization */}
            <div className="relative w-full h-64 bg-[#0e0e10] rounded-xl border border-[#282a36] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-xs font-['JetBrains_Mono']">
                <span className="text-[#00f0ff]">• Ascending Ramp Profile (Concerta / OROS-MPH)</span>
                <span className="text-rose-400">-- Flat Microdose Profile (Tachyphylaxis Decay)</span>
                <span className="text-amber-400">·· Sensitization Floor</span>
              </div>

              <div className="relative w-full h-44 flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                  {/* Ascending profile */}
                  <path d="M 0 80 Q 150 40, 250 20 T 500 100" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
                  {/* Flat profile decaying */}
                  <path d="M 0 80 Q 100 30, 200 90 T 500 120" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 5" />
                  {/* Sensitization floor */}
                  <line x1="0" y1="105" x2="500" y2="105" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#8d90a5] border-t border-[#282a36] pt-1">
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-['Manrope']">
              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-rose-500/20">
                <span className="font-['Space_Grotesk'] font-bold text-rose-300 block mb-1">1. Flat Microdosing Failure (Tachyphylaxis):</span>
                <p className="text-[#8d90a5]">Constant plasma levels cause rapid dopamine transporter (DAT) &amp; receptor desensitization. Behavioral efficacy decays after 3–4 hours despite high afternoon drug concentrations.</p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#00f0ff]/20">
                <span className="font-['Space_Grotesk'] font-bold text-[#00f0ff] block mb-1">2. Ascending Ramp Solution (Concerta-Style):</span>
                <p className="text-[#8d90a5]">Requires an initial morning bolus followed by progressively larger midday micro-boosters to sustain a positive dC/dt plasma slope, outpacing receptor adaptation.</p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-amber-500/20">
                <span className="font-['Space_Grotesk'] font-bold text-[#ffb77f] block mb-1">3. Ultra-Low Dose Sensitization Hazard:</span>
                <p className="text-[#8d90a5]">Sub-threshold amphetamine microdosing (1–3mg) induces dopamine reverse tolerance, persistent motor tics, sleep disruption, and psychosis risk. App must enforce a strict dose floor.</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-4">
            <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg">
              Precision Oncology: Low-Dose Metronomic (LDM) &amp; Circadian Chronotherapy
            </h3>
            <p className="font-['Manrope'] text-xs sm:text-sm text-[#e4beb3]/80 leading-relaxed">
              Unlike ADHD, cancer therapeutics benefit immensely from wearable-phenotyped microdosing. Metronomic dosing continuously targets tumor endothelial cell anti-angiogenesis, while circadian clock timing (CT0–CT24) aligns peak drug delivery with host mucosal detoxification windows to lower toxicity up to 5-fold.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-['Manrope']">
              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36] space-y-1.5">
                <span className="font-['Space_Grotesk'] font-bold text-[#ffb59e] block text-sm">5-Fluorouracil (5-FU)</span>
                <p className="text-[#e5e1e4]"><strong>Optimal Window:</strong> 01:00 – 04:00 AM (CT16–CT19)</p>
                <p className="text-[#8d90a5] text-[11px]">Aligns with peak host dihydropyrimidine dehydrogenase (DPD) clearance, reducing mucositis 5-fold.</p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36] space-y-1.5">
                <span className="font-['Space_Grotesk'] font-bold text-[#00f0ff] block text-sm">Oxaliplatin</span>
                <p className="text-[#e5e1e4]"><strong>Optimal Window:</strong> 13:00 – 16:00 (1–4 PM, CT6–CT9)</p>
                <p className="text-[#8d90a5] text-[11px]">Cuts peripheral sensory neuropathy in half (16% vs 31%, p &lt; 0.01) in metastatic colorectal cancer.</p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36] space-y-1.5">
                <span className="font-['Space_Grotesk'] font-bold text-[#ffb77f] block text-sm">Irinotecan</span>
                <p className="text-[#e5e1e4]"><strong>Optimal Window:</strong> 06:00 – 09:00 AM (CT0–CT3)</p>
                <p className="text-[#8d90a5] text-[11px]">Reduces severe diarrhea and neutropenia by timing delivery to intestinal epithelial circadian renewal.</p>
              </div>

              <div className="p-4 bg-[#1c1b1d] rounded-xl border border-[#282a36] space-y-1.5">
                <span className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] block text-sm">Checkpoint Inhibitors</span>
                <p className="text-[#e5e1e4]"><strong>Optimal Window:</strong> Biological Morning</p>
                <p className="text-[#8d90a5] text-[11px]">Matches dendritic cell lymph node migration and peak T-cell responsiveness to optimize anti-tumor response.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 6: 2026 FDA REGULATORY ENGINE ==================== */}
      {activeSubTab === 'regulatory' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl space-y-6">
          <div>
            <h3 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-xl mb-1">
              Interactive 2026 FDA Regulatory Classification Diagnostic
            </h3>
            <p className="font-['Manrope'] text-xs sm:text-sm text-[#e4beb3]/80">
              Evaluates software functionality against Section 520(o)(1)(E) statutory criteria under the Jan 2026 General Wellness, Jan 2026 CDS, and Oct 2026 PDURS guidance frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-['Manrope']">
            {/* Question Controls */}
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#e5e1e4] font-['Space_Grotesk'] mb-1.5">
                  1. Target Indication &amp; Compound Type:
                </label>
                <select
                  value={regCompound}
                  onChange={(e) => setRegCompound(e.target.value as any)}
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg p-2.5 text-xs text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                >
                  <option value="caffeine">Caffeine &amp; Hydration (OTC / General Energy)</option>
                  <option value="adhd">Prescription ADHD Stimulant (Methylphenidate / Amphetamine)</option>
                  <option value="oncology">Prescription Antineoplastic / Oncology Medication</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#e5e1e4] font-['Space_Grotesk'] mb-1.5">
                  2. Biometric Data Stream Modality:
                </label>
                <select
                  value={regSensor}
                  onChange={(e) => setRegSensor(e.target.value as any)}
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg p-2.5 text-xs text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                >
                  <option value="continuous">Continuous wearable signal patterns (HRV, CGM, PPG streams)</option>
                  <option value="discrete">Discrete point-in-time lab values / Manual logs</option>
                  <option value="microneedle">Minimally invasive microneedle patch for glucose</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#e5e1e4] font-['Space_Grotesk'] mb-1.5">
                  3. Primary Output Recipient:
                </label>
                <select
                  value={regRecipient}
                  onChange={(e) => setRegRecipient(e.target.value as any)}
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg p-2.5 text-xs text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                >
                  <option value="patient">Direct-to-Patient / Consumer dose recommendation</option>
                  <option value="hcp">Healthcare Professional (HCP) review portal only</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#e5e1e4] font-['Space_Grotesk'] mb-1.5">
                  4. Commercial Co-Packaging Status:
                </label>
                <select
                  value={regPharma}
                  onChange={(e) => setRegPharma(e.target.value as any)}
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg p-2.5 text-xs text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                >
                  <option value="copackaged">Distributed with prescription drug &amp; BLE smart actuator</option>
                  <option value="standalone">Standalone mobile software application</option>
                </select>
              </div>
            </div>

            {/* Diagnostic Output Card */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-xl ${regulatoryResult.cardClass}`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${regulatoryResult.badgeColor}`}>
                    {regulatoryResult.badge}
                  </span>
                  <span className="material-symbols-outlined text-[24px] text-[#ffb59e]">
                    {regulatoryResult.icon}
                  </span>
                </div>

                <h4 className="font-['Space_Grotesk'] font-bold text-[#e5e1e4] text-lg mb-2">
                  {regulatoryResult.title}
                </h4>

                <p className="text-xs text-[#e4beb3]/80 leading-relaxed mb-4">
                  {regulatoryResult.desc}
                </p>

                <div className="p-3.5 bg-[#121318] rounded-xl border border-[#282a36] space-y-2 text-[11px] font-['Manrope'] text-[#8d90a5]">
                  {regulatoryResult.details.map((detail, idx) => (
                    <p key={idx} className="leading-relaxed">
                      • {detail}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#282a36] text-[10px] font-['JetBrains_Mono'] text-[#8d90a5]">
                FD&amp;C Act § 520(o)(1)(E) 21st Century Cures Act Analysis
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cyber-Physical Explorer Footer Action Banner */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#121318] via-[#1a1c24] to-[#121318] border border-[#ff5a1f]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] shrink-0">
            <span className="material-symbols-outlined text-[28px]">air</span>
          </div>
          <div>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4]">
              Experience Cyber-Physical Sublingual Atomization
            </h4>
            <p className="font-['Manrope'] text-xs text-[#e4beb3]/80">
              Test real-time acoustic aerosol droplet kinetics or deploy Hummingbird 24H Titanium hardware.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onSimulateSpray && (
            <button
              onClick={onSimulateSpray}
              className="px-5 py-2.5 rounded-lg bg-[#201f21] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-wider hover:bg-[#2a2a2c] cursor-pointer flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">stream</span>
              Run Mist Simulator
            </button>
          )}
          {onOrderClick && (
            <button
              onClick={onOrderClick}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer transition-all"
            >
              Order System ($68)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
