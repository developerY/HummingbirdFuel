import React, { useState } from 'react';

interface MicrodoseCalculatorProps {
  onSimulateSpray?: () => void;
}

export const MicrodoseCalculator: React.FC<MicrodoseCalculatorProps> = ({ onSimulateSpray }) => {
  const [sprayCount, setSprayCount] = useState<number>(2);
  const [mode, setMode] = useState<'AM' | 'PM'>('AM');
  const [dispensingAnimation, setDispensingAnimation] = useState(false);

  // AM calculations
  const getAmMetrics = (val: number) => {
    switch (val) {
      case 1:
        return {
          label: '1 Spray (Micro Focus)',
          window: '2.5 Hours',
          resistance: '75% Precision',
          melatonin: 'Unaltered (Natural)',
          activeBioavailability: '0.12 ml nano-droplets',
          adenosineClearance: 'Rapid clearance, gentle slope',
        };
      case 2:
        return {
          label: '2 Sprays (Peak Flow)',
          window: '4.5 Hours',
          resistance: '92% Precision',
          melatonin: 'Unaltered (Natural)',
          activeBioavailability: '0.24 ml nano-droplets',
          adenosineClearance: 'Sustained focus, zero crash plateau',
        };
      case 3:
        return {
          label: '3 Sprays (Deep Drive)',
          window: '6.5 Hours',
          resistance: '97% Sustained',
          melatonin: 'Sync with PM Spray',
          activeBioavailability: '0.36 ml nano-droplets',
          adenosineClearance: 'High mental throughput for long sessions',
        };
      case 4:
      default:
        return {
          label: '4 Sprays (Hyper Metabolic)',
          window: '8.0+ Hours',
          resistance: '99.4% Total Drive',
          melatonin: 'Requires PM Spray Reset',
          activeBioavailability: '0.48 ml nano-droplets',
          adenosineClearance: 'Maximal neuro-metabolic overdrive',
        };
    }
  };

  // PM calculations
  const getPmMetrics = (val: number) => {
    switch (val) {
      case 1:
        return {
          label: '1 Spray (Wind Down)',
          window: '6.0 Hours Rest',
          resistance: 'Vagal Latency: 22m',
          melatonin: 'Natural Amplification',
          activeBioavailability: '0.12 ml calmant peptides',
          adenosineClearance: 'Gentle somatic deceleration',
        };
      case 2:
        return {
          label: '2 Sprays (Delta Deep)',
          window: '8.0 Hours Rest',
          resistance: 'Vagal Latency: 11m',
          melatonin: '+34% REM Quality',
          activeBioavailability: '0.24 ml calmant peptides',
          adenosineClearance: 'Accelerated mitochondrial repair',
        };
      case 3:
        return {
          label: '3 Sprays (Jetlag Override)',
          window: '9.0 Hours Rest',
          resistance: 'Vagal Latency: 8m',
          melatonin: '+52% Deep Delta',
          activeBioavailability: '0.36 ml calmant peptides',
          adenosineClearance: 'Full circadian reset after timezone shift',
        };
      case 4:
      default:
        return {
          label: '4 Sprays (Anabolic Recovery)',
          window: '9.5+ Hours Rest',
          resistance: 'Vagal Latency: 6m',
          melatonin: '+68% Delta / REM',
          activeBioavailability: '0.48 ml calmant peptides',
          adenosineClearance: 'Intense physical & central nervous system reset',
        };
    }
  };

  const metrics = mode === 'AM' ? getAmMetrics(sprayCount) : getPmMetrics(sprayCount);

  const handleDispenseClick = () => {
    setDispensingAnimation(true);
    if (onSimulateSpray) {
      onSimulateSpray();
    }
    setTimeout(() => {
      setDispensingAnimation(false);
    }, 1200);
  };

  return (
    <section className="w-full bg-[#131315] py-12 md:py-16 border-y border-[#282a36]/60">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="p-6 md:p-10 rounded-2xl bg-[#121318] border border-[#282a36] shadow-xl relative overflow-hidden">
          {/* Subtle glow accent */}
          <div
            className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 ${
              mode === 'AM' ? 'bg-[#ff5a1f]/10' : 'bg-[#00f0ff]/10'
            }`}
          />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold">
                  Precision Dosimeter
                </span>
                {/* Mode Selector Toggle */}
                <div className="inline-flex rounded-lg bg-[#201f21] p-0.5 border border-[#282a36]">
                  <button
                    onClick={() => setMode('AM')}
                    className={`px-2.5 py-0.5 rounded text-xs font-['JetBrains_Mono'] uppercase transition-colors cursor-pointer ${
                      mode === 'AM'
                        ? 'bg-[#ff5a1f] text-[#0e0e10] font-bold shadow-sm'
                        : 'text-[#e4beb3]/70 hover:text-[#e5e1e4]'
                    }`}
                  >
                    AM Day
                  </button>
                  <button
                    onClick={() => setMode('PM')}
                    className={`px-2.5 py-0.5 rounded text-xs font-['JetBrains_Mono'] uppercase transition-colors cursor-pointer ${
                      mode === 'PM'
                        ? 'bg-[#00f0ff] text-[#0e0e10] font-bold shadow-sm'
                        : 'text-[#e4beb3]/70 hover:text-[#e5e1e4]'
                    }`}
                  >
                    PM Night
                  </button>
                </div>
              </div>
              <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4]">
                Interactive Microdose Calculator
              </h2>
              <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 mt-1">
                {mode === 'AM'
                  ? 'Calibrate your daily sublingual sprays for targeted sustained adenosine clearance.'
                  : 'Calibrate your nocturnal calmant sprays for accelerated sleep onset and deep delta wave restoration.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#201f21] border border-[#282a36] px-3.5 py-2 rounded-lg">
                <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">STATUS:</span>
                <span className={`font-['JetBrains_Mono'] text-xs font-bold flex items-center gap-1.5 ${
                  mode === 'AM' ? 'text-[#ffb77f]' : 'text-[#00f0ff]'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    mode === 'AM' ? 'bg-[#ff8a00]' : 'bg-[#00f0ff]'
                  }`}></span>
                  ACTIVE DISPENSE
                </span>
              </div>

              <button
                onClick={handleDispenseClick}
                className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-['JetBrains_Mono'] uppercase font-bold tracking-wider cursor-pointer border transition-all ${
                  dispensingAnimation
                    ? 'bg-[#ff5a1f] text-[#0e0e10] border-transparent scale-95'
                    : 'bg-[#1c1b1d] hover:bg-[#2a2a2c] text-[#ffb59e] border-[#5b4038]/60 hover:border-[#ff5a1f]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {dispensingAnimation ? 'waves' : 'water_drop'}
                </span>
                <span>{dispensingAnimation ? 'Dispensing...' : 'Test Mist'}</span>
              </button>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Slider Control */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <div className="flex justify-between items-center font-['JetBrains_Mono'] text-xs">
                <span className="text-[#e4beb3]/80 uppercase tracking-wider">
                  SELECT SPRAYS ({mode}):
                </span>
                <span className={`font-['Space_Grotesk'] text-lg font-bold ${
                  mode === 'AM' ? 'text-[#ff5a1f]' : 'text-[#00f0ff]'
                }`}>
                  {metrics.label}
                </span>
              </div>

              {/* Range Slider */}
              <div className="relative py-2">
                <input
                  id="spray-slider"
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={sprayCount}
                  onChange={(e) => setSprayCount(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-[#201f21] rounded-lg appearance-none cursor-pointer accent-[#ff5a1f] focus:outline-none focus:ring-1 focus:ring-[#ff5a1f]"
                />
              </div>

              {/* Slider Labels */}
              <div className="grid grid-cols-4 font-['JetBrains_Mono'] text-[11px] text-[#8d90a5] text-center">
                <span className={sprayCount === 1 ? 'text-[#ffb59e] font-bold' : ''}>1 Spray (Light)</span>
                <span className={sprayCount === 2 ? 'text-[#ffb59e] font-bold' : ''}>2 Sprays (Peak)</span>
                <span className={sprayCount === 3 ? 'text-[#ffb59e] font-bold' : ''}>3 Sprays (Deep)</span>
                <span className={sprayCount === 4 ? 'text-[#ffb59e] font-bold' : ''}>4 Sprays (Max)</span>
              </div>

              {/* Live Bio-Feedback Note */}
              <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] text-xs font-['Manrope'] text-[#e4beb3]/80 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#ffb77f]">tune</span>
                <span>Active formulation output: <strong className="text-[#e5e1e4] font-mono">{metrics.activeBioavailability}</strong> — {metrics.adenosineClearance}</span>
              </div>
            </div>

            {/* Real-Time Metrics Output Panel */}
            <div className="md:col-span-5 p-5 rounded-xl bg-[#2a2a2c]/70 border border-[#282a36] flex flex-col gap-3.5 backdrop-blur-sm">
              <div className="flex justify-between items-center text-sm font-['Manrope']">
                <span className="text-[#e4beb3]/80">
                  {mode === 'AM' ? 'Sustained Cognitive Window:' : 'Target Sleep Window:'}
                </span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#e5e1e4] font-bold">
                  {metrics.window}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-['Manrope']">
                <span className="text-[#e4beb3]/80">
                  {mode === 'AM' ? 'Adenosine Resistance:' : 'Sleep Latency Index:'}
                </span>
                <span className={`font-['JetBrains_Mono'] text-sm font-bold ${
                  mode === 'AM' ? 'text-[#ff5a1f]' : 'text-[#00f0ff]'
                }`}>
                  {metrics.resistance}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-['Manrope']">
                <span className="text-[#e4beb3]/80">
                  {mode === 'AM' ? 'Night Melatonin Onset:' : 'Sleep Architecture:'}
                </span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#ffb95a] font-bold">
                  {metrics.melatonin}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
