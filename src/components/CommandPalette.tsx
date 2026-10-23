import React, { useState, useEffect, useRef } from 'react';
import { NAV_DESTINATIONS, NavDestination, RouteState, buildAbsoluteUrl } from '../utils/router';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (route: RouteState) => void;
  onShowToast: (message: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onShowToast,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter destinations
  const filtered = NAV_DESTINATIONS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onSelectDestination(filtered[selectedIndex].route);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, onSelectDestination]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleCopyLink = (e: React.MouseEvent, dest: NavDestination) => {
    e.stopPropagation();
    const fullUrl = buildAbsoluteUrl(dest.route);
    navigator.clipboard.writeText(fullUrl).then(() => {
      onShowToast(`Copied deep link: ${fullUrl}`);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#121318] border border-[#282a36] shadow-2xl overflow-hidden animate-fadeIn z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#282a36] bg-[#16171d]">
          <span className="material-symbols-outlined text-[#ff5a1f] text-[22px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, science subpages, store categories, or tools..."
            className="flex-1 bg-transparent text-[#e5e1e4] placeholder-[#8d90a5] font-['Manrope'] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8d90a5] hover:text-[#e5e1e4] text-xs font-['JetBrains_Mono'] px-1.5 py-0.5 rounded cursor-pointer"
            >
              CLEAR
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#1c1b1d] border border-[#282a36] text-[10px] font-['JetBrains_Mono'] text-[#8d90a5]">
            ESC TO EXIT
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-[#282a36]/40">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#8d90a5]">
              <span className="material-symbols-outlined text-[36px] mb-2 block text-[#8d90a5]/50">
                travel_explore
              </span>
              <p className="font-['Space_Grotesk'] text-sm font-semibold">No destinations matching "{query}"</p>
              <p className="font-['Manrope'] text-xs text-[#8d90a5]/70 mt-1">
                Try searching for "Bateman", "Sensors", "FDA", "Starter Kit", "AM Fuel", or "COA".
              </p>
            </div>
          ) : (
            filtered.map((dest, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={dest.id}
                  onClick={() => {
                    onSelectDestination(dest.route);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c1b1d] border border-[#ff5a1f]/40 shadow-md'
                      : 'border border-transparent hover:bg-[#16171d]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#ff5a1f]/20 border-[#ff5a1f]/40 text-[#ff5a1f]'
                          : 'bg-[#1e1f26] border-[#282a36] text-[#8d90a5] group-hover:text-[#e5e1e4]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{dest.icon}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-['Space_Grotesk'] text-sm font-bold text-[#e5e1e4] truncate">
                          {dest.title}
                        </span>
                        {dest.badge && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-['JetBrains_Mono'] uppercase tracking-wider bg-[#282a36] text-[#ffb59e] shrink-0">
                            {dest.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-['Manrope'] text-xs text-[#8d90a5] truncate mt-0.5">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleCopyLink(e, dest)}
                      title="Copy deep link URL to clipboard"
                      className="p-1.5 rounded-lg bg-[#282a36]/50 hover:bg-[#ff5a1f]/20 text-[#8d90a5] hover:text-[#ff5a1f] transition-colors cursor-pointer text-xs flex items-center gap-1 font-['JetBrains_Mono'] opacity-70 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-[15px]">link</span>
                      <span className="hidden md:inline text-[10px]">Copy Link</span>
                    </button>

                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform ${
                        isSelected ? 'text-[#ff5a1f] translate-x-0.5' : 'text-[#8d90a5] opacity-40'
                      }`}
                    >
                      chevron_right
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-5 py-3 border-t border-[#282a36] bg-[#121318] flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#8d90a5]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1d] border border-[#282a36]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1d] border border-[#282a36]">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1d] border border-[#282a36]">↵</kbd>
              <span>to select</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#ffb59e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]"></span>
            <span>Web Deep-Link Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
