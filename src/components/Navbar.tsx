import React, { useState, useRef, useEffect } from 'react';
import { RouteState, buildAbsoluteUrl } from '../utils/router';

interface NavbarProps {
  currentRoute: RouteState;
  onNavigateRoute: (route: RouteState) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenCommandPalette: () => void;
  onShowToast: (message: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigateRoute,
  cartCount,
  onOpenCart,
  onOpenProfile,
  onOpenCommandPalette,
  onShowToast,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scienceMenuOpen, setScienceMenuOpen] = useState(false);
  const [storeMenuOpen, setStoreMenuOpen] = useState(false);
  const [mobileScienceExpanded, setMobileScienceExpanded] = useState(true);
  const [mobileStoreExpanded, setMobileStoreExpanded] = useState(false);

  const scienceMenuRef = useRef<HTMLDivElement>(null);
  const storeMenuRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Safe hover handlers with 300ms debounce
  const handleMouseEnterStore = () => {
    clearTimer();
    setScienceMenuOpen(false);
    setStoreMenuOpen(true);
  };

  const handleMouseLeaveStore = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setStoreMenuOpen(false);
    }, 300);
  };

  const handleMouseEnterScience = () => {
    clearTimer();
    setStoreMenuOpen(false);
    setScienceMenuOpen(true);
  };

  const handleMouseLeaveScience = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setScienceMenuOpen(false);
    }, 300);
  };

  // Toggle & pin on click
  const handleToggleStore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimer();
    setScienceMenuOpen(false);
    setStoreMenuOpen((prev) => !prev);
  };

  const handleToggleScience = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimer();
    setStoreMenuOpen(false);
    setScienceMenuOpen((prev) => !prev);
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (scienceMenuRef.current && !scienceMenuRef.current.contains(e.target as Node)) {
        setScienceMenuOpen(false);
      }
      if (storeMenuRef.current && !storeMenuRef.current.contains(e.target as Node)) {
        setStoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimer();
    };
  }, []);

  const handleNavigate = (route: RouteState) => {
    clearTimer();
    onNavigateRoute(route);
    setMobileMenuOpen(false);
    setScienceMenuOpen(false);
    setStoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = (e: React.MouseEvent, route: RouteState) => {
    e.stopPropagation();
    const fullUrl = buildAbsoluteUrl(route);
    navigator.clipboard.writeText(fullUrl).then(() => {
      onShowToast(`Deep link copied: ${fullUrl}`);
    });
  };

  const isScienceActive = currentRoute.screen === 'fuel';
  const isStoreActive = currentRoute.screen === 'store';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121318]/95 backdrop-blur-xl border-b border-[#282a36]/60 shadow-[0_1px_12px_rgba(0,0,0,0.6)]">
      <div className="h-20 w-full max-w-[1280px] mx-auto px-5 md:px-12 flex items-center justify-between gap-4">
        {/* Brand & Logo Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavigate({ screen: 'home' })}
            className="flex items-center cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] rounded"
          >
            <img
              alt="Hummingbird Fuel Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XLi-jZTCiky9IhQb5zJtiwBMYASXOAJz0tXIAmozXDKLUJR9cLuI8CkR9v8CmnnDSOL5OmSZBLwDpNBGBn_iYOzf24lBrOSrlImaJPdYgqQAw_CcUI92BTyL9nSgtF8Mx9Z-DyaAbWa4fQcSweeu-ngQpmAzUWVSwvatt8n4EKrLSGrb0SrvuBEiWR3sPY9gcv7YWSp7A_4gbLn0qemdhqZBrresFpKgqJd-hL6NCPM5DaHCMAU-z0gQ"
            />
          </button>
        </div>

        {/* Desktop Navigation Links with Subpage Mega Flyouts */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {/* Home */}
          <button
            onClick={() => handleNavigate({ screen: 'home' })}
            className={`font-['Manrope'] text-[14px] lg:text-[15px] transition-all cursor-pointer relative py-2 focus:outline-none ${
              currentRoute.screen === 'home'
                ? 'text-[#ff5a1f] font-semibold'
                : 'text-[#e4beb3]/80 hover:text-[#e5e1e4]'
            }`}
          >
            Home
            {currentRoute.screen === 'home' && (
              <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] rounded-full" />
            )}
          </button>

          {/* Store with Subpage Dropdown */}
          <div
            ref={storeMenuRef}
            className="relative py-3"
            onMouseEnter={handleMouseEnterStore}
            onMouseLeave={handleMouseLeaveStore}
          >
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleNavigate({ screen: 'store', subpage: 'all' })}
                className={`font-['Manrope'] text-[14px] lg:text-[15px] transition-all cursor-pointer relative py-2 focus:outline-none select-none ${
                  isStoreActive ? 'text-[#ff5a1f] font-semibold' : 'text-[#e4beb3]/80 hover:text-[#e5e1e4]'
                }`}
              >
                <span>Store</span>
                {isStoreActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] rounded-full" />
                )}
              </button>
            </div>

            {/* Store Subpage Dropdown Menu - Continuous Bridge with Zero Dead Gap */}
            {storeMenuOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-80 z-50 animate-fadeIn"
                onMouseEnter={clearTimer}
                onMouseLeave={handleMouseLeaveStore}
              >
                {/* Invisible hover bridge to eliminate any gap between trigger and panel */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                <div className="rounded-2xl bg-[#14151b] border border-[#282a36] shadow-2xl p-3">
                  <div className="text-[10px] font-['JetBrains_Mono'] text-[#ffb59e] uppercase tracking-wider px-3 py-1.5 font-bold border-b border-[#282a36]/60 flex items-center justify-between">
                    <span>Store Subpages &amp; Catalog</span>
                    <span className="text-[9px] text-[#8d90a5]">Direct Deep Links</span>
                  </div>

                  <div className="mt-1.5 space-y-1">
                    <button
                      onClick={() => handleNavigate({ screen: 'store', subpage: 'all' })}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1c1d25] transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#ff5a1f] mt-0.5">storefront</span>
                      <div>
                        <div className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4] group-hover:text-[#ff5a1f]">
                          Full Catalog &amp; 24H Kits
                        </div>
                        <div className="font-['Manrope'] text-[11px] text-[#8d90a5]">
                          All circadian starter packages and hardware
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavigate({ screen: 'store', subpage: 'kit' })}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1c1d25] transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#ffb77f] mt-0.5">inventory_2</span>
                      <div>
                        <div className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4] group-hover:text-[#ffb77f]">
                          Circadian Mastery Kits
                        </div>
                        <div className="font-['Manrope'] text-[11px] text-[#8d90a5]">
                          Includes milled aviation titanium pocket case
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavigate({ screen: 'store', subpage: 'day' })}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1c1d25] transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#ff8a00] mt-0.5">wb_sunny</span>
                      <div>
                        <div className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4] group-hover:text-[#ff8a00]">
                          AM Cognitive Day Fuel
                        </div>
                        <div className="font-['Manrope'] text-[11px] text-[#8d90a5]">
                          Lion's Mane + 5mg Micro-Alkaloid Velocity
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavigate({ screen: 'store', subpage: 'night' })}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1c1d25] transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#00f0ff] mt-0.5">nights_stay</span>
                      <div>
                        <div className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4] group-hover:text-[#00f0ff]">
                          PM Delta Night Reset
                        </div>
                        <div className="font-['Manrope'] text-[11px] text-[#8d90a5]">
                          L-Theanine + Chelated Magnesium Bisglycinate
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavigate({ screen: 'store', subpage: 'refills' })}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1c1d25] transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#a0e8af] mt-0.5">recycling</span>
                      <div>
                        <div className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4] group-hover:text-[#a0e8af]">
                          Refill Duos &amp; 3-Packs
                        </div>
                        <div className="font-['Manrope'] text-[11px] text-[#8d90a5]">
                          Continuous delivery cartridge replenishments
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavigate({ screen: 'store', subpage: 'coa' })}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1c1d25] transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#ffb59e] mt-0.5">verified_user</span>
                      <div>
                        <div className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4] group-hover:text-[#ffb59e]">
                          COA Lab Verification
                        </div>
                        <div className="font-['Manrope'] text-[11px] text-[#8d90a5]">
                          HPLC purity assays &amp; batch certificates
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Science Hub with Subpage Mega Dropdown */}
          <div
            ref={scienceMenuRef}
            className="relative py-3"
            onMouseEnter={handleMouseEnterScience}
            onMouseLeave={handleMouseLeaveScience}
          >
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'overview' })}
                className={`font-['Manrope'] text-[14px] lg:text-[15px] transition-all cursor-pointer relative py-2 focus:outline-none select-none ${
                  isScienceActive ? 'text-[#ff5a1f] font-semibold' : 'text-[#e4beb3]/80 hover:text-[#e5e1e4]'
                }`}
              >
                <span>Science</span>
                {isScienceActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] rounded-full" />
                )}
              </button>
            </div>

            {/* Science Mega Dropdown with Subpages & Deep Tabs - Continuous Bridge with Zero Dead Gap */}
            {scienceMenuOpen && (
              <div
                className="absolute top-full -left-20 pt-2 w-[480px] z-50 animate-fadeIn"
                onMouseEnter={clearTimer}
                onMouseLeave={handleMouseLeaveScience}
              >
                {/* Invisible hover bridge to eliminate any gap between trigger and panel */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                <div className="rounded-2xl bg-[#14151b] border border-[#282a36] shadow-2xl p-4">
                  <div className="text-[10px] font-['JetBrains_Mono'] text-[#ffb59e] uppercase tracking-wider px-3 py-1 font-bold border-b border-[#282a36]/60 flex items-center justify-between mb-3">
                    <span>Science Subpage Explorer</span>
                    <span className="text-[9px] text-[#8d90a5]">Direct URL Deep-Links</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {/* Subpage 1: Cyber-Physical Architecture */}
                    <div className="p-3 rounded-xl bg-[#1a1b22] border border-[#ff5a1f]/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
                          <span className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4]">
                            Subpage 01: Cyber-Physical Systems &amp; Clinical Reality
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleCopyLink(e, { screen: 'fuel', subpage: 'cyberphysical', subtab: 'overview' })}
                          title="Copy deep link to subpage"
                          className="text-[#8d90a5] hover:text-[#ff5a1f] text-[10px] font-['JetBrains_Mono'] flex items-center gap-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">link</span>
                          Copy Link
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-['Manrope']">
                        <button
                          onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'overview' })}
                          className="p-1.5 rounded-lg bg-[#21222b] hover:bg-[#ff5a1f]/20 hover:text-[#ffb59e] text-[#8d90a5] text-left transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#ff5a1f]">grid_view</span>
                          <span className="truncate">Reality Matrix</span>
                        </button>

                        <button
                          onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'ingestion' })}
                          className="p-1.5 rounded-lg bg-[#21222b] hover:bg-[#ff5a1f]/20 hover:text-[#ffb59e] text-[#8d90a5] text-left transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#ff5a1f]">sensors</span>
                          <span className="truncate">Sensors &amp; Pipeline</span>
                        </button>

                        <button
                          onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'algorithm' })}
                          className="p-1.5 rounded-lg bg-[#21222b] hover:bg-[#ff5a1f]/20 hover:text-[#ffb59e] text-[#8d90a5] text-left transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#ff5a1f]">query_stats</span>
                          <span className="truncate">Bateman Simulator</span>
                        </button>

                        <button
                          onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'delivery' })}
                          className="p-1.5 rounded-lg bg-[#21222b] hover:bg-[#ff5a1f]/20 hover:text-[#ffb59e] text-[#8d90a5] text-left transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#ff5a1f]">air</span>
                          <span className="truncate">McCarthy Hardware</span>
                        </button>

                        <button
                          onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'clinical' })}
                          className="p-1.5 rounded-lg bg-[#21222b] hover:bg-[#ff5a1f]/20 hover:text-[#ffb59e] text-[#8d90a5] text-left transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#ff5a1f]">biotech</span>
                          <span className="truncate">ADHD &amp; Oncology</span>
                        </button>

                        <button
                          onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'regulatory' })}
                          className="p-1.5 rounded-lg bg-[#21222b] hover:bg-[#ff5a1f]/20 hover:text-[#ffb59e] text-[#8d90a5] text-left transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#ff5a1f]">gavel</span>
                          <span className="truncate">2026 FDA Engine</span>
                        </button>
                      </div>
                    </div>

                    {/* Subpage 2: Sublingual Cellular Delivery */}
                    <div className="p-3 rounded-xl bg-[#1a1b22] border border-[#00f0ff]/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                          <span className="font-['Space_Grotesk'] text-xs font-bold text-[#e5e1e4]">
                            Subpage 02: Sublingual Bio-Delivery &amp; Formulations
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleCopyLink(e, { screen: 'fuel', subpage: 'delivery' })}
                          title="Copy deep link to subpage"
                          className="text-[#8d90a5] hover:text-[#00f0ff] text-[10px] font-['JetBrains_Mono'] flex items-center gap-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">link</span>
                          Copy Link
                        </button>
                      </div>

                      <p className="font-['Manrope'] text-[11px] text-[#8d90a5] mb-2 leading-relaxed">
                        90-second venous bypass eliminating hepatic first-pass loss, AM/PM molecular matrix, and human wearable telemetry data.
                      </p>

                      <button
                        onClick={() => handleNavigate({ screen: 'fuel', subpage: 'delivery' })}
                        className="w-full py-1.5 px-3 rounded-lg bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-center cursor-pointer transition-colors"
                      >
                        Open Sublingual Bio-Delivery Page →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <button
            onClick={() => handleNavigate({ screen: 'contact' })}
            className={`font-['Manrope'] text-[14px] lg:text-[15px] transition-all cursor-pointer relative py-2 focus:outline-none ${
              currentRoute.screen === 'contact'
                ? 'text-[#ff5a1f] font-semibold'
                : 'text-[#e4beb3]/80 hover:text-[#e5e1e4]'
            }`}
          >
            Contact
            {currentRoute.screen === 'contact' && (
              <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] rounded-full" />
            )}
          </button>
        </nav>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Modern Command Palette / Search Trigger (⌘K) */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Search destinations and subpages"
            title="Search pages, subpages, tools (⌘K)"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c1b1d] hover:bg-[#282a36] text-[#8d90a5] hover:text-[#e5e1e4] border border-[#282a36] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ff5a1f]">search</span>
            <span className="hidden lg:inline font-['Manrope'] text-xs">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#121318] border border-[#282a36] text-[10px] font-['JetBrains_Mono'] text-[#ffb59e]">
              ⌘K
            </kbd>
          </button>

          {/* Shop Direct CTA */}
          <button
            onClick={() => handleNavigate({ screen: 'store', subpage: 'all' })}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#39393b] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider transition-all border border-[#5b4038]/40 hover:border-[#ff5a1f]/50 cursor-pointer"
          >
            Shop Direct
          </button>

          {/* Cart Trigger */}
          <button
            aria-label="View Cart"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#e4beb3] hover:text-[#e5e1e4] transition-colors cursor-pointer border border-transparent hover:border-[#282a36]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] leading-none">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff5a1f] text-[#541400] font-['JetBrains_Mono'] text-[10px] flex items-center justify-center font-bold animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Biohacker Profile Trigger */}
          <button
            onClick={onOpenProfile}
            aria-label="Biohacker Telemetry"
            title="Bio-Optimization Telemetry"
            className="w-9 h-9 rounded-full bg-[#ffb59e] hover:bg-[#ffdcc4] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[#5e1700] text-[20px]">person</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#201f21] text-[#e5e1e4] cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Subpage Accordions */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121318] border-b border-[#282a36] px-5 py-5 flex flex-col gap-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Quick Command Palette Button for mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommandPalette();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1c1b1d] border border-[#282a36] text-[#8d90a5]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff5a1f] text-[18px]">search</span>
              <span className="font-['Manrope'] text-xs text-[#e5e1e4]">Quick Search Subpages &amp; Tools</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-[#121318] text-[10px] font-['JetBrains_Mono'] text-[#ffb59e]">
              ⌘K
            </kbd>
          </button>

          {/* Primary Nav Links */}
          <button
            onClick={() => handleNavigate({ screen: 'home' })}
            className={`text-left py-2 font-['Space_Grotesk'] text-lg ${
              currentRoute.screen === 'home' ? 'text-[#ff5a1f] font-bold' : 'text-[#e5e1e4]/80'
            }`}
          >
            Home
          </button>

          {/* Science Accordion */}
          <div className="border border-[#282a36] rounded-xl p-3 bg-[#16171d]">
            <button
              onClick={() => setMobileScienceExpanded(!mobileScienceExpanded)}
              className="w-full flex items-center justify-between text-left font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff5a1f] text-[20px]">science</span>
                <span>Science Subpages</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] transition-transform ${mobileScienceExpanded ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {mobileScienceExpanded && (
              <div className="mt-3 pl-2 space-y-2 border-l-2 border-[#ff5a1f]/40 font-['Manrope'] text-xs">
                <div className="text-[10px] font-['JetBrains_Mono'] text-[#ffb59e] uppercase tracking-wider font-bold">
                  Subpage 01 • Cyber-Physical Architecture
                </div>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'overview' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • Reality Matrix
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'ingestion' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • Sensors &amp; Pipeline
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'algorithm' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • Bateman PK/PD Simulator
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'delivery' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • Spray Kinetics &amp; McCarthy Hardware
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'clinical' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • ADHD &amp; Oncology Verticals
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'cyberphysical', subtab: 'regulatory' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • 2026 FDA Section 520(o) Engine
                </button>

                <div className="pt-2 text-[10px] font-['JetBrains_Mono'] text-[#00f0ff] uppercase tracking-wider font-bold">
                  Subpage 02 • Cellular Delivery
                </div>
                <button
                  onClick={() => handleNavigate({ screen: 'fuel', subpage: 'delivery' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#00f0ff]"
                >
                  • Sublingual Venous Conduit &amp; Matrices
                </button>
              </div>
            )}
          </div>

          {/* Store Accordion */}
          <div className="border border-[#282a36] rounded-xl p-3 bg-[#16171d]">
            <button
              onClick={() => setMobileStoreExpanded(!mobileStoreExpanded)}
              className="w-full flex items-center justify-between text-left font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff8a00] text-[20px]">storefront</span>
                <span>Store Catalog &amp; Subpages</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] transition-transform ${mobileStoreExpanded ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {mobileStoreExpanded && (
              <div className="mt-3 pl-2 space-y-2 border-l-2 border-[#ff8a00]/40 font-['Manrope'] text-xs">
                <button
                  onClick={() => handleNavigate({ screen: 'store', subpage: 'all' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • All Products &amp; System Bundles
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'store', subpage: 'kit' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • Circadian Starter Kits &amp; Titanium Case
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'store', subpage: 'day' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • AM Cognitive Day Fuel
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'store', subpage: 'night' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • PM Delta Night Reset
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'store', subpage: 'refills' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • Cartridge Refills (3-Packs)
                </button>
                <button
                  onClick={() => handleNavigate({ screen: 'store', subpage: 'coa' })}
                  className="block w-full text-left py-1 text-[#8d90a5] hover:text-[#ff5a1f]"
                >
                  • COA HPLC Purity Verification
                </button>
              </div>
            )}
          </div>

          {/* Contact Link */}
          <button
            onClick={() => handleNavigate({ screen: 'contact' })}
            className={`text-left py-2 font-['Space_Grotesk'] text-lg ${
              currentRoute.screen === 'contact' ? 'text-[#ff5a1f] font-bold' : 'text-[#e5e1e4]/80'
            }`}
          >
            Contact
          </button>

          {/* Bottom Action */}
          <div className="pt-2 border-t border-[#282a36] flex flex-col gap-2">
            <button
              onClick={() => handleNavigate({ screen: 'store', subpage: 'all' })}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold uppercase tracking-wider text-sm text-center cursor-pointer"
            >
              Shop Direct Catalog
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
