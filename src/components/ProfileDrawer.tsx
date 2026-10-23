import React from 'react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStore: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToStore
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121318] border-l border-[#282a36] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#282a36] flex items-center justify-between bg-[#1c1b1d]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ffb59e] flex items-center justify-center font-['Space_Grotesk'] text-sm font-bold text-[#5e1700]">
                AM
              </div>
              <div>
                <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                  Alex Mercer
                </h2>
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#ffb77f]">
                  Biohacker Tier: Tier-1 Optimizer
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#201f21] text-[#8d90a5] hover:text-[#e5e1e4] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Circadian Sync Streak */}
            <div className="p-4 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] uppercase">
                  Circadian Adherence Streak
                </span>
                <span className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] font-bold">
                  14 Days Sync
                </span>
              </div>
              <div className="w-full h-2 bg-[#201f21] rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-[#ff5a1f] to-[#00f0ff] w-3/4 rounded-full" />
              </div>
              <div className="text-[11px] font-['Manrope'] text-[#e4beb3]/80">
                Consistent morning sublingual uptake has maintained steady daytime adenosine clearance without adrenal fatigue.
              </div>
            </div>

            {/* Wearable Biometric Telemetry */}
            <div>
              <div className="text-xs font-['JetBrains_Mono'] text-[#e5e1e4] font-bold uppercase tracking-wider mb-3">
                Biometric Wearable Telemetry
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#1c1b1d] border border-[#282a36]">
                  <div className="text-[10px] font-['JetBrains_Mono'] text-[#8d90a5]">Oura Deep Sleep</div>
                  <div className="font-['Space_Grotesk'] text-lg font-bold text-[#00f0ff] mt-0.5">+38 min</div>
                  <div className="text-[10px] text-[#8d90a5] mt-1">Delta cycle length</div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#1c1b1d] border border-[#282a36]">
                  <div className="text-[10px] font-['JetBrains_Mono'] text-[#8d90a5]">HRV Recovery</div>
                  <div className="font-['Space_Grotesk'] text-lg font-bold text-[#ffb59e] mt-0.5">+14%</div>
                  <div className="text-[10px] text-[#8d90a5] mt-1">Parasympathetic tone</div>
                </div>
              </div>
            </div>

            {/* Current Daily Protocol */}
            <div>
              <div className="text-xs font-['JetBrains_Mono'] text-[#e5e1e4] font-bold uppercase tracking-wider mb-3">
                Active Protocol Schedule
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#ff5a1f] text-[20px]">wb_sunny</span>
                    <div>
                      <div className="text-xs font-['Space_Grotesk'] font-bold text-[#e5e1e4]">AM Day Fuel Mist</div>
                      <div className="text-[11px] text-[#8d90a5]">2 Sprays at 07:30 AM</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#ffb77f] font-bold px-2 py-0.5 rounded bg-[#201f21]">
                    COMPLETED
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">nightlight</span>
                    <div>
                      <div className="text-xs font-['Space_Grotesk'] font-bold text-[#e5e1e4]">PM Night Reset Spray</div>
                      <div className="text-[11px] text-[#8d90a5]">2 Sprays at 10:15 PM</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#00f0ff] font-bold px-2 py-0.5 rounded bg-[#201f21]">
                    UPCOMING
                  </span>
                </div>
              </div>
            </div>

            {/* Active Subscription Shipment Status */}
            <div className="p-4 rounded-xl bg-[#1c1b1d] border border-[#282a36]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-['JetBrains_Mono'] text-[#e5e1e4] font-bold">
                  Autoship Refill Duo
                </span>
                <span className="text-[10px] font-['JetBrains_Mono'] text-[#ffb77f]">
                  Active (-15%)
                </span>
              </div>
              <div className="text-xs text-[#8d90a5] font-['Manrope'] mb-3">
                Next fresh nitrogen-sealed batch #HF-2025-05 ships in 18 days.
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToStore();
                }}
                className="w-full py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#e5e1e4] cursor-pointer"
              >
                Manage Autoship in Store
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#282a36] bg-[#1c1b1d]">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#8d90a5] hover:text-[#e5e1e4] font-['JetBrains_Mono'] text-xs uppercase tracking-wider cursor-pointer"
            >
              Close Telemetry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
