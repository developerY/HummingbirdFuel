import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenDosimeter?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; screen: ActiveScreen }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Store', screen: 'store' },
    { label: 'Science', screen: 'fuel' },
    { label: 'Contact', screen: 'contact' },
  ];

  const handleNavClick = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121318]/90 backdrop-blur-xl border-b border-[#282a36]/60 shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
      <div className="h-20 w-full max-w-[1280px] mx-auto px-5 md:px-12 flex items-center justify-between gap-4">
        {/* Brand & Badge Zone */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] rounded"
          >
            <img
              alt="Hummingbird Fuel Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XLi-jZTCiky9IhQb5zJtiwBMYASXOAJz0tXIAmozXDKLUJR9cLuI8CkR9v8CmnnDSOL5OmSZBLwDpNBGBn_iYOzf24lBrOSrlImaJPdYgqQAw_CcUI92BTyL9nSgtF8Mx9Z-DyaAbWa4fQcSweeu-ngQpmAzUWVSwvatt8n4EKrLSGrb0SrvuBEiWR3sPY9gcv7YWSp7A_4gbLn0qemdhqZBrresFpKgqJd-hL6NCPM5DaHCMAU-z0gQ"
            />
            <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-[#e5e1e4] hidden sm:inline-block">
              HUMMINGBIRD<span className="text-[#ff5a1f]">.FUEL</span>
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c1b1d] border border-[#282a36]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#e4beb3] uppercase tracking-widest">
              AI Microdose Spray
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.screen}
              onClick={() => handleNavClick(link.screen)}
              className={`font-['Manrope'] text-[15px] transition-all cursor-pointer relative py-1 focus:outline-none ${
                activeScreen === link.screen
                  ? 'text-[#ff5a1f] font-semibold'
                  : 'text-[#e4beb3]/80 hover:text-[#e5e1e4]'
              }`}
            >
              {link.label}
              {activeScreen === link.screen && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('store')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#39393b] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider transition-all border border-[#5b4038]/40 hover:border-[#ff5a1f]/50 cursor-pointer"
          >
            Shop Now
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121318] border-b border-[#282a36] px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.screen}
              onClick={() => handleNavClick(link.screen)}
              className={`text-left py-2 font-['Space_Grotesk'] text-lg transition-colors ${
                activeScreen === link.screen ? 'text-[#ff5a1f] font-bold' : 'text-[#e5e1e4]/80'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#282a36] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('store')}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold uppercase tracking-wider text-sm text-center"
            >
              Shop Direct Catalog
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
