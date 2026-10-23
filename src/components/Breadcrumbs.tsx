import React from 'react';
import { RouteState, buildAbsoluteUrl } from '../utils/router';

interface BreadcrumbsProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
  onShowToast: (message: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentRoute,
  onNavigate,
  onShowToast,
}) => {
  // If at root home, don't clutter the hero, or render minimal status
  if (currentRoute.screen === 'home') {
    return null;
  }

  const screenLabels: Record<string, string> = {
    store: 'Store',
    fuel: 'Science Hub',
    contact: 'Contact & Concierge',
  };

  const subpageLabels: Record<string, string> = {
    cyberphysical: 'Cyber-Physical Systems & Clinical Explorer',
    delivery: 'Sublingual Cellular Delivery',
    all: 'All Products',
    kit: 'Circadian Starter Kits',
    day: 'AM Day Fuel',
    night: 'PM Night Reset',
    refills: 'Formula Refills',
    accessory: 'Titanium Hardware',
    coa: 'COA Lab Verification',
  };

  const subtabLabels: Record<string, string> = {
    overview: 'Reality Matrix',
    ingestion: 'Sensors & Pipeline',
    algorithm: 'Bateman PK/PD Simulator',
    delivery: 'Spray Kinetics & McCarthy Hardware',
    clinical: 'Clinical Verticals (ADHD / Oncology)',
    regulatory: '2026 FDA Section 520(o) Engine',
  };

  const handleCopyCurrentLink = () => {
    const fullUrl = buildAbsoluteUrl(currentRoute);
    navigator.clipboard.writeText(fullUrl).then(() => {
      onShowToast(`Deep link copied to clipboard: ${fullUrl}`);
    });
  };

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="w-full bg-[#101014] border-b border-[#282a36]/40 px-5 md:px-12 py-2.5 text-xs font-['JetBrains_Mono'] text-[#8d90a5] mt-20"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        {/* Breadcrumb Path Links */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onNavigate({ screen: 'home' })}
            className="hover:text-[#ff5a1f] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Home</span>
          </button>

          <span className="text-[#3b3c4a]">/</span>

          {/* Screen Link */}
          <button
            onClick={() => onNavigate({ screen: currentRoute.screen })}
            className={`hover:text-[#ff5a1f] transition-colors cursor-pointer ${
              !currentRoute.subpage ? 'text-[#ff5a1f] font-semibold' : ''
            }`}
          >
            {screenLabels[currentRoute.screen] || currentRoute.screen}
          </button>

          {/* Subpage Link if present */}
          {currentRoute.subpage && (
            <>
              <span className="text-[#3b3c4a]">/</span>
              <button
                onClick={() =>
                  onNavigate({
                    screen: currentRoute.screen,
                    subpage: currentRoute.subpage,
                  })
                }
                className={`hover:text-[#ff5a1f] transition-colors cursor-pointer ${
                  !currentRoute.subtab ? 'text-[#ff5a1f] font-semibold' : ''
                }`}
              >
                {subpageLabels[currentRoute.subpage] || currentRoute.subpage}
              </button>
            </>
          )}

          {/* Subtab Link if present */}
          {currentRoute.subtab && (
            <>
              <span className="text-[#3b3c4a]">/</span>
              <span className="text-[#ffb59e] font-semibold">
                {subtabLabels[currentRoute.subtab] || currentRoute.subtab}
              </span>
            </>
          )}
        </div>

        {/* Share Deep Link Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyCurrentLink}
            title="Copy shareable deep link"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1c1b1d] border border-[#282a36] text-[#ffb59e] hover:bg-[#ff5a1f]/10 hover:border-[#ff5a1f]/40 transition-all cursor-pointer text-[11px]"
          >
            <span className="material-symbols-outlined text-[14px]">share</span>
            <span>Copy Deep Link</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
