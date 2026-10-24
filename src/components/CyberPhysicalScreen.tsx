import React from 'react';
import { CyberPhysicalScienceSubpage, CyberPhysicalSubTab } from './CyberPhysicalScienceSubpage';
import { buildAbsoluteUrl } from '../utils/router';

interface CyberPhysicalScreenProps {
  activeSubtab?: string;
  onNavigateSubtab?: (subtab: string) => void;
  onOrderClick: () => void;
  onSimulateSpray: () => void;
  onNavigateToScience?: () => void;
  onShowToast?: (message: string) => void;
}

export const CyberPhysicalScreen: React.FC<CyberPhysicalScreenProps> = ({
  activeSubtab,
  onNavigateSubtab,
  onOrderClick,
  onSimulateSpray,
  onNavigateToScience,
  onShowToast,
}) => {
  const handleCopySubtabLink = (tab: CyberPhysicalSubTab) => {
    const fullUrl = buildAbsoluteUrl({
      screen: 'cyberphysical',
      subtab: tab,
    });
    navigator.clipboard.writeText(fullUrl).then(() => {
      onShowToast?.(`Deep link copied: ${fullUrl}`);
    });
  };

  return (
    <div className="w-full bg-[#0e0e10] py-8 md:py-14 text-[#e5e1e4]">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Page Top Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#282a36]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e5e1e4] uppercase tracking-wider">
              Clinical Reality &amp; Architecture Engine
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {onNavigateToScience && (
              <button
                onClick={onNavigateToScience}
                className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] hover:text-[#00f0ff] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16171d] border border-[#282a36] hover:border-[#00f0ff]/40 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">biotech</span>
                <span>View Sublingual Delivery Page →</span>
              </button>
            )}

            <button
              onClick={() => handleCopySubtabLink((activeSubtab as CyberPhysicalSubTab) || 'overview')}
              className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] hover:text-[#ff5a1f] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1b1d] border border-[#282a36] hover:border-[#ff5a1f]/40 transition-all cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[15px]">share</span>
              <span>Share Page</span>
            </button>
          </div>
        </div>

        <CyberPhysicalScienceSubpage
          onOrderClick={onOrderClick}
          onSimulateSpray={onSimulateSpray}
          activeSubTab={(activeSubtab as CyberPhysicalSubTab) || 'overview'}
          onSubTabChange={(tab) => onNavigateSubtab?.(tab)}
          onCopyDeepLink={handleCopySubtabLink}
        />
      </div>
    </div>
  );
};
