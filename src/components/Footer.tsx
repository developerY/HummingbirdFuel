import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2500);
    }
  };

  return (
    <footer className="w-full bg-[#0e0e10] border-t border-[#282a36] text-[#e4beb3]/80">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12 pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer text-left"
            >
              <img
                alt="Hummingbird Fuel Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XLi-jZTCiky9IhQb5zJtiwBMYASXOAJz0tXIAmozXDKLUJR9cLuI8CkR9v8CmnnDSOL5OmSZBLwDpNBGBn_iYOzf24lBrOSrlImaJPdYgqQAw_CcUI92BTyL9nSgtF8Mx9Z-DyaAbWa4fQcSweeu-ngQpmAzUWVSwvatt8n4EKrLSGrb0SrvuBEiWR3sPY9gcv7YWSp7A_4gbLn0qemdhqZBrresFpKgqJd-hL6NCPM5DaHCMAU-z0gQ"
              />
              <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] tracking-tight">
                HUMMINGBIRD<span className="text-[#ff5a1f]">.FUEL</span>
              </span>
            </button>

            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 max-w-md leading-relaxed">
              Artificial Intelligent Microdose Energy Spray — Energy All Day / Sleep All Night. High-performance biohacking, cognitive acceleration, and circadian rhythm optimization delivered at cellular speed.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="px-3 py-1 rounded bg-[#201f21] border border-[#282a36] font-['JetBrains_Mono'] text-xs text-[#ffb59e] font-semibold">
                99.8% BIOAVAILABILITY
              </div>
              <div className="px-3 py-1 rounded bg-[#201f21] border border-[#282a36] font-['JetBrains_Mono'] text-xs text-[#00f0ff] font-semibold">
                SUBLINGUAL MIST
              </div>
            </div>
          </div>

          {/* System Navigation Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#e5e1e4] font-bold">
              System Navigation
            </span>
            <ul className="flex flex-col gap-2.5 font-['Manrope'] text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#ff5a1f] transition-colors cursor-pointer text-left"
                >
                  Formula Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fuel')}
                  className="hover:text-[#ff5a1f] transition-colors cursor-pointer text-left"
                >
                  Science &amp; Clinical Trials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-[#ff5a1f] transition-colors cursor-pointer text-left"
                >
                  Microdose Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#ff5a1f] transition-colors cursor-pointer text-left"
                >
                  Biohacker Support &amp; Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Telemetry Dispatch Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#e5e1e4] font-bold">
              Telemetry Dispatch
            </span>
            <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 leading-relaxed">
              Receive circadian timing protocols, metabolic optimization data, and early access batch alerts.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121318] text-[#e5e1e4] px-4 py-2.5 rounded-lg font-['JetBrains_Mono'] text-xs border border-[#282a36] focus:outline-none focus:border-[#ff5a1f] placeholder:text-[#8d90a5]/50"
                placeholder="neuro@domain.com"
                required
                type="email"
              />
              <button
                className="px-6 py-2.5 rounded-lg bg-[#ff5a1f] text-[#541400] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-[#ff8a00] transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-md"
                type="submit"
              >
                {subscribed ? 'Subscribed' : 'Join'}
              </button>
            </form>
            {subscribed && (
              <span className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] animate-fadeIn">
                Protocol link dispatched to your inbox.
              </span>
            )}

            <div className="flex items-center gap-4 pt-1 text-[#8d90a5] font-['JetBrains_Mono'] text-xs">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#ffb59e]">verified</span>
                <span>cGMP Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#ffb95a]">biotech</span>
                <span>Lab Tested</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">bolt</span>
                <span>Rapid Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#282a36]/60 flex flex-col md:flex-row items-center justify-between gap-4 font-['Manrope'] text-xs">
          <div className="text-[#8d90a5]">
            © {new Date().getFullYear()} Hummingbird Fuel Inc. All rights reserved. Precision neuro-metabolic delivery systems.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="text-[#8d90a5] hover:text-[#e5e1e4] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="text-[#8d90a5] hover:text-[#e5e1e4] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate('fuel')}
              className="text-[#8d90a5] hover:text-[#ff5a1f] transition-colors cursor-pointer"
            >
              Circadian Protocol
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
