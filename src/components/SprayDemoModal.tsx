import React, { useState, useEffect } from 'react';

interface SprayDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SprayDemoModal: React.FC<SprayDemoModalProps> = ({ isOpen, onClose }) => {
  const [activeFormula, setActiveFormula] = useState<'AM' | 'PM'>('AM');
  const [isSpraying, setIsSpraying] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);
  const [absorptionMeter, setAbsorptionMeter] = useState(0);

  useEffect(() => {
    if (isOpen) {
      triggerSpray();
    }
  }, [isOpen, activeFormula]);

  const triggerSpray = () => {
    setIsSpraying(true);
    setAbsorptionMeter(0);

    // Generate random particle cloud
    const newParticles = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 240 - 120,
      y: -(Math.random() * 180 + 40),
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setParticles(newParticles);

    // Animate absorption meter up to 99.8%
    let current = 0;
    const interval = setInterval(() => {
      current += 6;
      if (current >= 99.8) {
        setAbsorptionMeter(99.8);
        clearInterval(interval);
        setIsSpraying(false);
      } else {
        setAbsorptionMeter(current);
      }
    }, 40);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <div className="relative w-full max-w-lg bg-[#121318] border border-[#282a36] rounded-2xl shadow-2xl p-6 md:p-8 z-10 overflow-hidden">
        {/* Glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-colors duration-500 ${
            activeFormula === 'AM' ? 'bg-[#ff5a1f]/20' : 'bg-[#00f0ff]/20'
          }`}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5a1f] text-[22px]">air</span>
            <span className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
              Sublingual Aerosol Simulator
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8d90a5] hover:text-[#e5e1e4] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Formula Switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg bg-[#1c1b1d] p-1 border border-[#282a36]">
            <button
              onClick={() => setActiveFormula('AM')}
              className={`px-4 py-1.5 rounded-md text-xs font-['JetBrains_Mono'] uppercase font-bold transition-all cursor-pointer ${
                activeFormula === 'AM'
                  ? 'bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] shadow-md'
                  : 'text-[#8d90a5] hover:text-white'
              }`}
            >
              AM Fuel (Cognitive)
            </button>
            <button
              onClick={() => setActiveFormula('PM')}
              className={`px-4 py-1.5 rounded-md text-xs font-['JetBrains_Mono'] uppercase font-bold transition-all cursor-pointer ${
                activeFormula === 'PM'
                  ? 'bg-[#00f0ff] text-[#0e0e10] shadow-md'
                  : 'text-[#8d90a5] hover:text-white'
              }`}
            >
              PM Reset (Delta REM)
            </button>
          </div>
        </div>

        {/* Kinetic Spray Chamber Simulation */}
        <div className="relative w-full h-56 rounded-xl bg-[#0e0e10] border border-[#282a36] flex flex-col items-center justify-end pb-4 overflow-hidden mb-6">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#282a36_1px,transparent_1px),linear-gradient(to_bottom,#282a36_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />

          {/* Particle Mist Cloud */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
            {particles.map((p) => (
              <span
                key={p.id}
                className={`absolute rounded-full transition-all duration-700 ease-out ${
                  activeFormula === 'AM' ? 'bg-[#ff5a1f]' : 'bg-[#00f0ff]'
                }`}
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  opacity: isSpraying ? p.opacity : 0.1,
                  boxShadow: activeFormula === 'AM' ? '0 0 8px #ff5a1f' : '0 0 8px #00f0ff'
                }}
              />
            ))}
          </div>

          {/* Spray Canister Head Graphic */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Spray Nozzle */}
            <div className={`w-3 h-3 rounded-full mb-1 transition-colors ${
              activeFormula === 'AM' ? 'bg-[#ff5a1f]' : 'bg-[#00f0ff]'
            } ${isSpraying ? 'animate-ping' : ''}`} />
            {/* Actuator Button */}
            <div className="w-12 h-6 bg-[#2a2a2c] rounded-t-md border-t border-x border-[#ff5a1f]/40 flex items-center justify-center">
              <span className="w-4 h-1 bg-[#ffb59e] rounded-full"></span>
            </div>
            {/* Collar & Canister Neck */}
            <div className="w-16 h-8 bg-[#1c1b1d] border-t border-x border-[#282a36] rounded-t-sm" />
          </div>

          <div className="absolute top-3 left-3 text-[11px] font-['JetBrains_Mono'] text-[#8d90a5]">
            CHAMBER VELOCITY: <span className="text-[#ffb77f]">14.2 m/s</span>
          </div>
          <div className="absolute top-3 right-3 text-[11px] font-['JetBrains_Mono'] text-[#8d90a5]">
            DROPLET: <span className="text-[#00f0ff]">~5.2 μm NANO-MIST</span>
          </div>
        </div>

        {/* Telemetry Meter */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-xs font-['JetBrains_Mono']">
            <span className="text-[#8d90a5]">Oral Mucosal Bio-Uptake</span>
            <span className={`font-bold ${activeFormula === 'AM' ? 'text-[#ff5a1f]' : 'text-[#00f0ff]'}`}>
              {absorptionMeter.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#1c1b1d] rounded-full overflow-hidden border border-[#282a36]">
            <div
              className={`h-full transition-all duration-150 rounded-full ${
                activeFormula === 'AM'
                  ? 'bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00]'
                  : 'bg-gradient-to-r from-[#00f0ff] to-[#3982f7]'
              }`}
              style={{ width: `${absorptionMeter}%` }}
            />
          </div>
        </div>

        {/* Action Button to trigger another burst */}
        <div className="flex gap-3">
          <button
            onClick={triggerSpray}
            disabled={isSpraying}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">water_drop</span>
            <span>{isSpraying ? 'Dispensing Aerosol...' : 'Dispense Calibrated 0.12ml Dose'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
