import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface StoreScreenProps {
  products: Product[];
  onAddToCart: (product: Product, isSubscription: boolean, quantity?: number) => void;
  onViewProduct: (product: Product) => void;
  onOpenCoaModal?: (batchId: string) => void;
  activeSubpage?: string;
  onNavigateSubpage?: (subpage: string) => void;
  onShowToast?: (message: string) => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  products,
  onAddToCart,
  onViewProduct,
  onOpenCoaModal,
  activeSubpage,
  onNavigateSubpage,
  onShowToast
}) => {
  // Navigation & Category Filters
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    if (activeSubpage) {
      if (activeSubpage === 'coa') {
        const coaSection = document.getElementById('coa-section');
        if (coaSection) {
          coaSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setSelectedFilter(activeSubpage);
      }
    }
  }, [activeSubpage]);

  // Hero Mastery System Bundle state
  const [heroPlan, setHeroPlan] = useState<'sub' | 'once'>('sub');
  const [heroQty, setHeroQty] = useState<number>(1);

  // Bundle Customizer Algorithm Stack state
  const [customAmIndex, setCustomAmIndex] = useState<number>(0);
  const [customPmCount, setCustomPmCount] = useState<number>(1);
  const [includeDock, setIncludeDock] = useState<boolean>(false);

  // COA verification input
  const [coaBatchInput, setCoaBatchInput] = useState<string>('HF-2025-04');
  const [coaVerifiedModal, setCoaVerifiedModal] = useState<boolean>(false);

  // Bottom warehouse catalog search
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionMode, setSubscriptionMode] = useState<Record<string, boolean>>({});

  const toggleSubscription = (productId: string) => {
    setSubscriptionMode((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Find specific products from database
  const masteryProduct = products.find((p) => p.id === 'circadian-mastery-system') || products[0];
  const amProduct = products.find((p) => p.id === 'am-day-fuel') || products[1];
  const pmProduct = products.find((p) => p.id === 'pm-night-reset') || products[2];
  const am3xProduct = products.find((p) => p.id === 'am-refills-3x') || products[3];
  const titaniumCaseProduct = products.find((p) => p.id === 'titanium-pocket-case') || products[4];

  // Customizer Data
  const amOptions = [
    { title: 'Standard 5mg Alkaloid Matrix', shortTitle: 'Standard', sub: '90 Mists • 5mg Matrix', price: 38 },
    { title: 'Double 10mg Velocity Matrix', shortTitle: 'High Velocity', sub: '90 Mists • 10mg Matrix', price: 44 },
    { title: 'Zero Alkaloid Adaptogen Focus', shortTitle: 'Pure Focus', sub: "Lion's Mane + B12 Only", price: 36 }
  ];

  const selectedAm = amOptions[customAmIndex];
  const pmUnitPrice = 38;
  const dockPrice = includeDock ? 24 : 0;
  const customGross = selectedAm.price + customPmCount * pmUnitPrice + dockPrice;
  const customItemCount = 1 + customPmCount + (includeDock ? 1 : 0);
  const customDiscountRate = customItemCount >= 3 ? 0.25 : 0.15;
  const customDiscountVal = customGross * customDiscountRate;
  const customFinalTotal = customGross - customDiscountVal;

  const handleHeroAddToCart = () => {
    const isSub = heroPlan === 'sub';
    onAddToCart(masteryProduct, isSub, heroQty);
  };

  const handleCustomStackAddToCart = () => {
    const customBundleProduct: Product = {
      id: `custom-stack-${Date.now()}`,
      name: `Custom Circadian Protocol (${selectedAm.shortTitle} + ${customPmCount}x PM${includeDock ? ' + Dock' : ''})`,
      subtitle: 'Personalized AI-configured circadian stack with bundle savings',
      price: customFinalTotal,
      rating: 5.0,
      reviewCount: 1,
      image: masteryProduct.image,
      altText: 'Custom personalized circadian stack',
      category: 'kit',
      spraysCount: `${90 + customPmCount * 90} Total Mists`,
      flavorOrScent: 'Custom Multi-Phase Terpenes',
      features: [
        `AM Day Fuel: ${selectedAm.title}`,
        `PM Night Reset: ${customPmCount}x Month Supply (${customPmCount * 90} Sprays)`,
        includeDock ? 'Includes Titanium Dual Dock Case' : 'Compact pocket flasks'
      ],
      keyIngredients: masteryProduct.keyIngredients,
      description: 'Custom optimized neuro-metabolic stack tailored to your daily cognitive schedule and sleep requirements.',
      usageProtocol: 'Follow standard morning and evening sublingual micro-dispense protocol.',
      inStock: true,
      batchNumber: 'HF-2025-04'
    };

    onAddToCart(customBundleProduct, false, 1);
  };

  // Filter products for the bottom warehouse section
  const filteredProducts = products.filter((p) => {
    let matchesCategory = true;
    if (selectedFilter === 'systems') matchesCategory = p.category === 'kit';
    else if (selectedFilter === 'day') matchesCategory = p.category === 'day';
    else if (selectedFilter === 'night') matchesCategory = p.category === 'night';
    else if (selectedFilter === 'refills') matchesCategory = p.category === 'accessory';

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0e0e10] text-[#e5e1e4] relative overflow-hidden">
      {/* Dynamic Atmospheric Glow Background Nodes */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#ff5a1f]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-96 right-10 w-[480px] h-[480px] bg-[#ff8a00]/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* SECTION 1: Store Header & Telemetry Filter Bar */}
      <section className="w-full max-w-[1280px] mx-auto px-5 md:px-12 pt-8 md:pt-12 pb-6">
        <div className="flex flex-col gap-4">
          {/* Live Batch Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1c1b1d] border border-[#282a36] px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#ff5a1f] animate-ping"></span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase font-bold tracking-wider">
                TELEMETRY: BATCH #HF-2025-04 LIVE IN STOCK
              </span>
              <span className="text-[#353437]">•</span>
              <span className="font-['Manrope'] text-xs text-[#e4beb3]/80 hidden sm:inline">
                99.8% Certified Sublingual Bioavailability
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
                EXPEDITED REFRIGERATED DISPATCH READY
              </span>
              <span className="material-symbols-outlined text-[#ff5a1f] text-[16px]">local_shipping</span>
            </div>
          </div>

          {/* Main Title & Breadcrumb Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
            <div>
              <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#8d90a5] uppercase mb-1">
                <span className="hover:text-[#ffb59e] transition-colors cursor-pointer">Store</span>
                <span>/</span>
                <span className="text-[#ff5a1f]">Bio-Energetic Dispensary</span>
              </div>
              <h1 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-[#e5e1e4] tracking-tight">
                Precision Circadian Formulations
              </h1>
            </div>
            <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 max-w-md leading-relaxed">
              Engineered sublingual micro-mists formulated for neuro-cellular uptake. Instant daytime velocity and rapid delta-wave recovery.
            </p>
          </div>

          {/* Filter & Sorting Navigation Toolbar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-4 border-t border-[#282a36]/60">
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: 'all', label: `All Formulations (${products.length})` },
                { id: 'systems', label: 'Circadian Systems' },
                { id: 'day', label: 'Day Protocols (Ignite)' },
                { id: 'night', label: 'Night Protocols (Delta Sleep)' },
                { id: 'refills', label: 'Hardware & Refills' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedFilter(btn.id)}
                  className={`px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === btn.id
                      ? 'bg-[#2a2a2c] text-[#e5e1e4] font-bold border border-[#ff5a1f]/50 shadow-sm'
                      : 'bg-[#1c1b1d] hover:bg-[#201f21] text-[#8d90a5] hover:text-[#e5e1e4] border border-[#282a36]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Sort & Count Meta */}
            <div className="flex items-center justify-between lg:justify-end gap-3">
              <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5] hidden sm:inline">
                SORT BY TELEMETRY:
              </span>
              <div className="relative inline-block w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-[#1c1b1d] text-[#e5e1e4] font-['JetBrains_Mono'] text-xs px-4 py-2.5 rounded-lg border border-[#282a36] focus:outline-none focus:border-[#ff5a1f] cursor-pointer"
                >
                  <option value="featured">Featured Protocol</option>
                  <option value="absorption">Highest Absorption Rate</option>
                  <option value="rating">Top Rated (Clinical)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <span className="material-symbols-outlined text-[#8d90a5] absolute right-3 top-2.5 pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Featured System Bundle (Hero Conversion Unit) */}
      <section className="w-full max-w-[1280px] mx-auto px-5 md:px-12 py-6">
        <div className="relative rounded-2xl bg-[#121318] border border-[#282a36] overflow-hidden shadow-2xl">
          {/* Chromatic Ember Gradient Edge */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a1f] to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 p-6 md:p-10 items-center">
            {/* Visual Pod */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0e0e10] flex items-center justify-center border border-[#282a36]">
                <img
                  className="w-full h-full object-cover select-none cursor-pointer hover:scale-105 transition-transform duration-700"
                  alt={masteryProduct.altText}
                  src={masteryProduct.image}
                  onClick={() => onViewProduct(masteryProduct)}
                />

                {/* Floating Micro-Telemetry Overlays */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <div className="px-3 py-1 rounded bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] text-[#ffb59e] flex items-center gap-1.5 shadow-md border border-[#282a36]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]"></span>
                    DUAL MATRIX EMISSION
                  </div>
                  <div className="px-3 py-1 rounded bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] text-[#00f0ff] flex items-center gap-1.5 shadow-md border border-[#282a36]">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    24-HOUR CIRCADIAN LOCK
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[11px] text-[#e5e1e4] border border-[#282a36]">
                  INCLUDES AEROSPACE TITANIUM DOCK
                </div>
              </div>

              {/* Kinetic Quick Stats Strip */}
              <div className="grid grid-cols-3 w-full gap-2 mt-3">
                <div className="bg-[#1c1b1d] border border-[#282a36] p-2.5 rounded-lg text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d90a5] block uppercase">DAY MIST</span>
                  <span className="font-['Space_Grotesk'] text-base md:text-lg font-bold text-[#ffb59e]">90 Sprays</span>
                </div>
                <div className="bg-[#1c1b1d] border border-[#282a36] p-2.5 rounded-lg text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d90a5] block uppercase">NIGHT RESET</span>
                  <span className="font-['Space_Grotesk'] text-base md:text-lg font-bold text-[#00f0ff]">90 Sprays</span>
                </div>
                <div className="bg-[#1c1b1d] border border-[#282a36] p-2.5 rounded-lg text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#8d90a5] block uppercase">PRECISION NOZZLE</span>
                  <span className="font-['Space_Grotesk'] text-base md:text-lg font-bold text-[#e5e1e4]">0.01 mL</span>
                </div>
              </div>
            </div>

            {/* Product Details & Conversion Pod */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 text-[#ffb59e] mb-2">
                  <span className="material-symbols-outlined text-[16px] text-[#ff5a1f]">auto_awesome</span>
                  <span className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider">
                    Recommended Starter Protocol • Save 28%
                  </span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4] tracking-tight">
                  The 24H Circadian Mastery System
                </h2>

                <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 mt-2 leading-relaxed">
                  The apex full-spectrum stack. Ignites ATP phosphorylation &amp; dopamine release at dawn; resets GABA and triggers endogenous melatonin production at dusk. Instant sublingual mucosal delivery bypasses gastrointestinal degradation.
                </p>
              </div>

              {/* Review Stars & Clinical Seal */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-[#ffb95a]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] font-semibold ml-1">
                    4.96 / 5.0
                  </span>
                </div>
                <span className="font-['Manrope'] text-xs text-[#8d90a5]">
                  • 1,420 Verified Biohacker Reviews
                </span>
              </div>

              {/* Purchase Model Selector Cards */}
              <div className="flex flex-col gap-2.5 mt-1">
                {/* Subscribe Option (Default Selected) */}
                <label
                  onClick={() => setHeroPlan('sub')}
                  className={`cursor-pointer relative flex items-center justify-between p-4 rounded-xl border transition-all ${
                    heroPlan === 'sub'
                      ? 'bg-[#201f21] border-[#ff5a1f]'
                      : 'bg-[#1c1b1d] border-[#282a36] hover:bg-[#201f21]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="hero_plan_input"
                      checked={heroPlan === 'sub'}
                      onChange={() => setHeroPlan('sub')}
                      className="w-4 h-4 text-[#ff5a1f] accent-[#ff5a1f]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                          Subscribe &amp; Optimize
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#ff5a1f]/20 text-[#ffb59e] font-['JetBrains_Mono'] text-[10px] font-bold">
                          SAVE 20% + FREE TRAVEL DOCK
                        </span>
                      </div>
                      <span className="font-['Manrope'] text-xs text-[#e4beb3]/80 block mt-0.5">
                        Automated 30-day circadian replenishment. Cancel or reschedule anytime.
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-3">
                    <div className="font-['Space_Grotesk'] text-xl font-bold text-[#ff5a1f]">
                      $54<span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">/mo</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5] line-through">$94.00</span>
                  </div>
                </label>

                {/* One-Time Purchase Option */}
                <label
                  onClick={() => setHeroPlan('once')}
                  className={`cursor-pointer relative flex items-center justify-between p-4 rounded-xl border transition-all ${
                    heroPlan === 'once'
                      ? 'bg-[#201f21] border-[#ff5a1f]'
                      : 'bg-[#1c1b1d] border-[#282a36] hover:bg-[#201f21]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="hero_plan_input"
                      checked={heroPlan === 'once'}
                      onChange={() => setHeroPlan('once')}
                      className="w-4 h-4 text-[#ff5a1f] accent-[#ff5a1f]"
                    />
                    <div>
                      <span className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                        One-Time Dispensary Order
                      </span>
                      <span className="font-['Manrope'] text-xs text-[#e4beb3]/80 block mt-0.5">
                        Dual 30-day sprays + docking base. Full trial guarantee included.
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-3">
                    <div className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">$68</div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5] line-through">$94.00</span>
                  </div>
                </label>
              </div>

              {/* Action Cluster: Quantity & CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                {/* Stepper */}
                <div className="inline-flex items-center justify-between bg-[#0e0e10] border border-[#282a36] px-4 py-3 rounded-xl min-w-[120px]">
                  <button
                    onClick={() => setHeroQty(Math.max(1, heroQty - 1))}
                    className="text-[#8d90a5] hover:text-white transition-colors font-['Space_Grotesk'] text-lg cursor-pointer"
                    type="button"
                  >
                    -
                  </button>
                  <span className="font-['JetBrains_Mono'] text-sm text-[#e5e1e4] font-bold">
                    {heroQty}
                  </span>
                  <button
                    onClick={() => setHeroQty(heroQty + 1)}
                    className="text-[#8d90a5] hover:text-white transition-colors font-['Space_Grotesk'] text-lg cursor-pointer"
                    type="button"
                  >
                    +
                  </button>
                </div>

                {/* Main Add Button */}
                <button
                  onClick={handleHeroAddToCart}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_24px_rgba(255,90,31,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span>Add Mastery System to Cart — ${(heroPlan === 'sub' ? 54 : 68) * heroQty}</span>
                </button>
              </div>

              {/* Live In-Cart Perks */}
              <div className="flex flex-wrap items-center justify-between font-['JetBrains_Mono'] text-xs text-[#8d90a5] pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb59e]">check_circle</span>
                  Free US Cold-Chain Shipping
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb59e]">verified_user</span>
                  30-Day Zero Risk Protocol
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb59e]">qr_code_2</span>
                  COA Batch Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Targeted Cognitive Sprays & Accessories Grid */}
      <section className="w-full max-w-[1280px] mx-auto px-5 md:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-1">
              INDIVIDUAL METABOLIC FORMULAS
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
              Targeted Cognitive Sprays &amp; Accessories
            </h2>
          </div>
          <p className="font-['Manrope'] text-sm text-[#8d90a5] max-w-sm">
            Sublingual precision units engineered with lipid nanoparticle carriers for 99.8% bioavailability within 45 seconds.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CARD 1: AM Day Fuel Mist */}
          <div className="rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#ff5a1f]/40 hover:shadow-[0_0_24px_rgba(255,90,31,0.2)]">
            <div>
              <div className="relative w-full aspect-square bg-[#0e0e10] overflow-hidden border-b border-[#282a36]">
                <img
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  alt={amProduct.altText}
                  src={amProduct.image}
                  onClick={() => onViewProduct(amProduct)}
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] text-[#ffb59e] border border-[#282a36]">
                  SKU: HF-AM-01
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#ff5a1f] text-[#0e0e10] font-['JetBrains_Mono'] text-[10px] font-bold">
                  POPULAR
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb59e] uppercase font-semibold">
                    90 MICRO-MISTS (30 DAYS)
                  </span>
                  <div className="flex items-center gap-1 text-[#ffb95a] font-['JetBrains_Mono'] text-xs">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.9 (890)</span>
                  </div>
                </div>

                <h3
                  onClick={() => onViewProduct(amProduct)}
                  className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] hover:text-[#ff5a1f] cursor-pointer"
                >
                  AM Day Fuel Mist
                </h3>

                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed line-clamp-3">
                  Lion’s Mane mycelium, bioactive Methyl-B12, and pure alkaloid nanodroplets for clean adrenergic velocity.
                </p>

                <div className="flex items-center gap-2 bg-[#1c1b1d] border border-[#282a36] px-2.5 py-1.5 rounded-lg text-[#8d90a5] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[#ff5a1f] text-[16px]">local_florist</span>
                  <span className="truncate">Terpene Profile: Citrus Zest &amp; Yuzu Peel</span>
                </div>

                <div className="pt-1 flex items-baseline justify-between">
                  <div>
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">$38</span>
                    <span className="font-['Manrope'] text-xs text-[#8d90a5] ml-1">or $31/mo sub</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] font-semibold">Save 18%</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onAddToCart(amProduct, false, 1)}
                className="w-full py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#ff5a1f] hover:text-[#0e0e10] text-[#e5e1e4] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#282a36]"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Quick Add • $38</span>
              </button>
            </div>
          </div>

          {/* CARD 2: PM Night Reset Spray */}
          <div className="rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#00f0ff]/40 hover:shadow-[0_0_24px_rgba(0,240,255,0.18)]">
            <div>
              <div className="relative w-full aspect-square bg-[#0e0e10] overflow-hidden border-b border-[#282a36]">
                <img
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  alt={pmProduct.altText}
                  src={pmProduct.image}
                  onClick={() => onViewProduct(pmProduct)}
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] text-[#00f0ff] border border-[#282a36]">
                  SKU: HF-PM-02
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#2a2a2c] text-[#e5e1e4] font-['JetBrains_Mono'] text-[10px]">
                  DELTA DEEP SLEEP
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] uppercase font-semibold">
                    90 MICRO-MISTS (30 DAYS)
                  </span>
                  <div className="flex items-center gap-1 text-[#ffb95a] font-['JetBrains_Mono'] text-xs">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.9 (640)</span>
                  </div>
                </div>

                <h3
                  onClick={() => onViewProduct(pmProduct)}
                  className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] hover:text-[#00f0ff] cursor-pointer"
                >
                  PM Night Reset Spray
                </h3>

                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed line-clamp-3">
                  Chelated Magnesium Bisglycinate, Pharma-grade L-Theanine, and botanical GABA triggers for rapid deep-wave REM sleep.
                </p>

                <div className="flex items-center gap-2 bg-[#1c1b1d] border border-[#282a36] px-2.5 py-1.5 rounded-lg text-[#8d90a5] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">nights_stay</span>
                  <span className="truncate">Terpene Profile: Alpine Mint &amp; French Lavender</span>
                </div>

                <div className="pt-1 flex items-baseline justify-between">
                  <div>
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">$38</span>
                    <span className="font-['Manrope'] text-xs text-[#8d90a5] ml-1">or $31/mo sub</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#00f0ff] font-semibold">Save 18%</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onAddToCart(pmProduct, false, 1)}
                className="w-full py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#00f0ff] hover:text-[#0e0e10] text-[#e5e1e4] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#282a36]"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Quick Add • $38</span>
              </button>
            </div>
          </div>

          {/* CARD 3: 3-Pack AM Protocol Refills */}
          <div className="rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#ff5a1f]/40 hover:shadow-[0_0_24px_rgba(255,90,31,0.2)]">
            <div>
              <div className="relative w-full aspect-square bg-[#0e0e10] overflow-hidden border-b border-[#282a36]">
                <img
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  alt={am3xProduct.altText}
                  src={am3xProduct.image}
                  onClick={() => onViewProduct(am3xProduct)}
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] text-[#ffb59e] border border-[#282a36]">
                  SKU: HF-AM3X-BULK
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#2a2a2c] text-[#ffb95a] font-['JetBrains_Mono'] text-[10px] font-semibold">
                  BEST BULK VALUE
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb59e] uppercase font-semibold">
                    270 SPRAYS (90 DAYS)
                  </span>
                  <div className="flex items-center gap-1 text-[#ffb95a] font-['JetBrains_Mono'] text-xs">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>5.0 (312)</span>
                  </div>
                </div>

                <h3
                  onClick={() => onViewProduct(am3xProduct)}
                  className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] hover:text-[#ff5a1f] cursor-pointer"
                >
                  3-Pack AM Protocol Refills
                </h3>

                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed line-clamp-3">
                  Triple batch cartridge refill kit. Zero plastic waste, hermetically sealed amber glass cartridges ready to snap into your actuator.
                </p>

                <div className="flex items-center gap-2 bg-[#1c1b1d] border border-[#282a36] px-2.5 py-1.5 rounded-lg text-[#8d90a5] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[#ff5a1f] text-[16px]">inventory_2</span>
                  <span>Supply: 3x Full 30-Day Reservoirs</span>
                </div>

                <div className="pt-1 flex items-baseline justify-between">
                  <div>
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">$95</span>
                    <span className="font-['Manrope'] text-xs text-[#8d90a5] ml-1">or $79/mo sub</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] font-semibold">Save $19</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onAddToCart(am3xProduct, false, 1)}
                className="w-full py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#ff5a1f] hover:text-[#0e0e10] text-[#e5e1e4] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#282a36]"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Quick Add • $95</span>
              </button>
            </div>
          </div>

          {/* CARD 4: Titanium Pocket Shell */}
          <div className="rounded-2xl bg-[#121318] border border-[#282a36] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_24px_rgba(255,255,255,0.1)]">
            <div>
              <div className="relative w-full aspect-square bg-[#0e0e10] overflow-hidden border-b border-[#282a36]">
                <img
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  alt={titaniumCaseProduct.altText}
                  src={titaniumCaseProduct.image}
                  onClick={() => onViewProduct(titaniumCaseProduct)}
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0e0e10]/90 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] text-[#8d90a5] border border-[#282a36]">
                  SKU: HF-EDC-TI
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#2a2a2c] text-[#e5e1e4] font-['JetBrains_Mono'] text-[10px]">
                  HARDWARE
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#8d90a5] uppercase font-semibold">
                    LIFETIME WARRANTY
                  </span>
                  <div className="flex items-center gap-1 text-[#ffb95a] font-['JetBrains_Mono'] text-xs">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.9 (420)</span>
                  </div>
                </div>

                <h3
                  onClick={() => onViewProduct(titaniumCaseProduct)}
                  className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] hover:text-[#ffb59e] cursor-pointer"
                >
                  Precision Billet Titanium Case
                </h3>

                <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 leading-relaxed line-clamp-3">
                  5-Axis CNC machined aerospace titanium Grade 5 armor. Shockproof, airtight, magnetic quick-snap lock for pocket carry.
                </p>

                <div className="flex items-center gap-2 bg-[#1c1b1d] border border-[#282a36] px-2.5 py-1.5 rounded-lg text-[#8d90a5] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[#e5e1e4] text-[16px]">shield</span>
                  <span>Material: Grade 5 Titanium • 42 Grams</span>
                </div>

                <div className="pt-1 flex items-baseline justify-between">
                  <div>
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">$24</span>
                    <span className="font-['Manrope'] text-xs text-[#8d90a5] ml-1">Hardware Accessory</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5]">In Stock</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onAddToCart(titaniumCaseProduct, false, 1)}
                className="w-full py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#39393b] text-[#e5e1e4] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#282a36]"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Add Hardware • $24</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Interactive Bundle & Save Customizer (Algorithm Stack Configurator) */}
      <section className="w-full max-w-[1280px] mx-auto px-5 md:px-12 py-8">
        <div className="rounded-2xl bg-[#1c1b1d] border border-[#282a36] p-6 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-10">
            {/* Customizer Controls */}
            <div className="flex-1 w-full flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase mb-1">
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Algorithm Stack Configurator</span>
                </div>
                <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4]">
                  Build Your Custom Circadian Protocol
                </h2>
                <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 mt-1">
                  Select your daytime cognitive intensity and nocturnal sleep depth. Bundles with 2 items receive 15% off; 3+ items unlock 25% off automatically.
                </p>
              </div>

              {/* Option 1: Daytime Mist Selection */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] uppercase font-semibold flex items-center justify-between">
                  <span>1. Select AM Day Mist Strength</span>
                  <span className="text-[#ffb59e] font-normal">{selectedAm.title}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {amOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCustomAmIndex(i)}
                      className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                        customAmIndex === i
                          ? 'bg-[#201f21] border-[#ff5a1f] shadow-md'
                          : 'bg-[#0e0e10] border-[#282a36] hover:bg-[#201f21]'
                      }`}
                    >
                      <div className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                        {opt.shortTitle}
                      </div>
                      <div className="font-['Manrope'] text-xs text-[#8d90a5] mt-0.5">{opt.sub}</div>
                      <div className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] font-bold mt-2">
                        ${opt.price} / unit
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Nighttime Mist Quantity Stepper */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] uppercase font-semibold flex items-center justify-between">
                  <span>2. PM Night Reset Sprays</span>
                  <span className="text-[#00f0ff] font-normal">
                    {customPmCount} Month Supply ({customPmCount * 90} Sprays)
                  </span>
                </label>
                <div className="flex items-center gap-4 bg-[#0e0e10] border border-[#282a36] p-4 rounded-xl">
                  <button
                    onClick={() => setCustomPmCount(Math.max(1, customPmCount - 1))}
                    className="w-10 h-10 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#e5e1e4] flex items-center justify-center font-['Space_Grotesk'] text-lg cursor-pointer"
                    type="button"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">
                      {customPmCount}
                    </span>
                    <span className="font-['Manrope'] text-xs text-[#8d90a5] ml-2">
                      Canisters ($38 each)
                    </span>
                  </div>
                  <button
                    onClick={() => setCustomPmCount(Math.min(4, customPmCount + 1))}
                    className="w-10 h-10 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#e5e1e4] flex items-center justify-center font-['Space_Grotesk'] text-lg cursor-pointer"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Option 3: Titanium Dock Add-on */}
              <label
                onClick={() => setIncludeDock(!includeDock)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  includeDock ? 'bg-[#201f21] border-[#ff5a1f]' : 'bg-[#0e0e10] border-[#282a36]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeDock}
                    onChange={(e) => setIncludeDock(e.target.checked)}
                    className="w-4 h-4 text-[#ff5a1f] accent-[#ff5a1f]"
                  />
                  <div>
                    <span className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                      Include Titanium Dual Dock Case
                    </span>
                    <span className="font-['Manrope'] text-xs text-[#8d90a5] block">
                      Aerospace CNC Machined Dock (+$24)
                    </span>
                  </div>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#ffb77f]">
                  {includeDock ? 'Included' : 'Optional'}
                </span>
              </label>
            </div>

            {/* Protocol Live Summary Ledger */}
            <div className="w-full lg:w-96 rounded-xl bg-[#201f21] border border-[#282a36] p-6 flex flex-col justify-between gap-6 shrink-0 shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#282a36]">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] uppercase font-bold">
                    Protocol Ledger
                  </span>
                  <span className="px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold bg-[#ff5a1f]/20 text-[#ffb59e]">
                    {customItemCount >= 3 ? '25% POWER STACK APPLIED' : '15% BUNDLE APPLIED'}
                  </span>
                </div>

                {/* Item Breakdown List */}
                <div className="space-y-2 text-xs font-['Manrope']">
                  <div className="flex justify-between text-[#e4beb3]/80">
                    <span>1x AM Day Fuel ({selectedAm.shortTitle})</span>
                    <span className="text-[#e5e1e4] font-['JetBrains_Mono']">${selectedAm.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#e4beb3]/80">
                    <span>{customPmCount}x PM Night Reset Spray</span>
                    <span className="text-[#e5e1e4] font-['JetBrains_Mono']">
                      ${(customPmCount * pmUnitPrice).toFixed(2)}
                    </span>
                  </div>
                  {includeDock && (
                    <div className="flex justify-between text-[#e4beb3]/80">
                      <span>1x Titanium Dual Dock</span>
                      <span className="text-[#e5e1e4] font-['JetBrains_Mono']">$24.00</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#282a36] space-y-1.5 font-['JetBrains_Mono'] text-xs">
                  <div className="flex justify-between text-[#8d90a5]">
                    <span>Gross Subtotal</span>
                    <span>${customGross.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#ff5a1f]">
                    <span>Bundle Optimization</span>
                    <span>-${customDiscountVal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#8d90a5]">
                    <span>Shipping</span>
                    <span className="text-[#ffb59e]">FREE (Carbon Neutral)</span>
                  </div>
                </div>
              </div>

              {/* Total & Add Stack CTA */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#8d90a5] uppercase">
                    OPTIMIZED TOTAL
                  </span>
                  <div className="text-right">
                    <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#e5e1e4]">
                      ${customFinalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCustomStackAddToCart}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">layers</span>
                  <span>Lock In Custom Stack</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Transparent Formulation & Lab Certificate Telemetry */}
      <section id="coa-section" className="w-full max-w-[1280px] mx-auto px-5 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Lab Telemetry Data Card */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase">
              <span className="material-symbols-outlined text-[16px]">biotech</span>
              <span>Batch Verification System</span>
            </div>

            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
              Cellular Bioavailability &amp; 3rd-Party Lab COA
            </h2>

            <p className="font-['Manrope'] text-sm md:text-base text-[#e4beb3]/80 leading-relaxed">
              Every production run is quarantined and tested by independent third-party laboratories via high-performance liquid chromatography (HPLC) and mass spectrometry. Verified 100% free of heavy metals, residual solvents, or adulterants.
            </p>

            {/* Interactive COA Batch Lookup Tool */}
            <div className="bg-[#1c1b1d] border border-[#282a36] p-3 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8d90a5] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={coaBatchInput}
                  onChange={(e) => setCoaBatchInput(e.target.value)}
                  placeholder="Enter Batch ID..."
                  className="w-full bg-[#121318] text-[#e5e1e4] pl-10 pr-3 py-2 rounded-lg font-['JetBrains_Mono'] text-xs border border-[#282a36] focus:outline-none focus:border-[#ff5a1f] uppercase"
                />
              </div>
              <button
                type="button"
                onClick={() => setCoaVerifiedModal(true)}
                className="px-5 py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#e5e1e4] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer"
              >
                Verify Lab COA
              </button>
            </div>

            {/* Verified Lab Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#0e0e10] border border-[#282a36] text-center">
                <span className="material-symbols-outlined text-[#ffb59e] text-[24px] mb-1">verified</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] block font-semibold">cGMP CERTIFIED</span>
                <span className="font-['Manrope'] text-[11px] text-[#8d90a5]">Facility Reg #30194</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0e0e10] border border-[#282a36] text-center">
                <span className="material-symbols-outlined text-[#00f0ff] text-[24px] mb-1">science</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] block font-semibold">HPLC TESTED</span>
                <span className="font-['Manrope'] text-[11px] text-[#8d90a5]">99.8% Purity Index</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0e0e10] border border-[#282a36] text-center">
                <span className="material-symbols-outlined text-[#ffb95a] text-[24px] mb-1">eco</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] block font-semibold">VEGAN &amp; CLEAN</span>
                <span className="font-['Manrope'] text-[11px] text-[#8d90a5]">Zero Artificial Dyes</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0e0e10] border border-[#282a36] text-center">
                <span className="material-symbols-outlined text-[#ffb77f] text-[24px] mb-1">block</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] block font-semibold">ZERO SUGAR</span>
                <span className="font-['Manrope'] text-[11px] text-[#8d90a5]">Keto-Friendly Carrier</span>
              </div>
            </div>
          </div>

          {/* SVG Absorption Kinetics Comparison Chart */}
          <div className="lg:col-span-5 bg-[#201f21] border border-[#282a36] p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] uppercase font-bold">
                KINETIC PHARMACOKINETICS
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ff5a1f] font-semibold">
                BLOODSTREAM UPTAKE
              </span>
            </div>

            {/* Clean Inline Kinetics Chart */}
            <div className="w-full h-48 relative flex items-end pt-4 pb-2">
              <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 300 120">
                {/* Gridlines */}
                <line className="text-[#353437]/40" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="300" y1="30" y2="30" />
                <line className="text-[#353437]/40" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="300" y1="70" y2="70" />
                <line className="text-[#353437]/40" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="300" y1="110" y2="110" />

                {/* Traditional Pills Curve (Slow, Low Peak) */}
                <path className="text-[#8d90a5]" d="M 0 110 Q 70 105, 140 85 T 300 70" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" />

                {/* Hummingbird Fuel Sublingual Spray (Instant Steep Spike) */}
                <path className="text-[#ff5a1f]" d="M 0 110 Q 30 15, 80 18 T 300 50" fill="none" stroke="currentColor" strokeWidth="3.5" />

                {/* Active Peak Indicator Dot */}
                <circle className="text-[#ffb59e]" cx="80" cy="18" fill="currentColor" r="4.5" />
                <circle className="text-[#ff5a1f]/40" cx="80" cy="18" fill="none" r="9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Chart Legend */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-['Manrope'] pt-2 bg-[#1c1b1d] border border-[#282a36] p-3 rounded-lg gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#ff5a1f] rounded"></span>
                <span className="text-[#e5e1e4] font-medium">Hummingbird Sublingual (45s Peak)</span>
              </div>
              <div className="flex items-center gap-2 text-[#8d90a5]">
                <span className="w-3 h-1 bg-[#8d90a5] rounded"></span>
                <span>Traditional Ingestion (60-90m)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: E-Commerce Trust & Guarantee Row */}
      <section className="w-full max-w-[1280px] mx-auto px-5 md:px-12 pt-4 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl bg-[#1c1b1d] border border-[#282a36]">
          {/* Pillar 1 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center shrink-0 text-[#ff5a1f]">
              <span className="material-symbols-outlined text-[26px]">verified_user</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                30-Day Zero Risk Protocol
              </h3>
              <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1 leading-relaxed">
                If your focus or sleep metrics do not visibly improve within 30 days, keep the bottles and claim a prompt 100% refund.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center shrink-0 text-[#00f0ff]">
              <span className="material-symbols-outlined text-[26px]">flight_takeoff</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                Cold-Chain Free Dispatch
              </h3>
              <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1 leading-relaxed">
                Complimentary expedited climate-controlled logistics on all protocol orders over $50. Packaged in recyclable thermal shells.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ffb95a]/10 border border-[#ffb95a]/20 flex items-center justify-center shrink-0 text-[#ffb95a]">
              <span className="material-symbols-outlined text-[26px]">lock_reset</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                Flexible Optimization Cadence
              </h3>
              <p className="font-['Manrope'] text-xs text-[#e4beb3]/80 mt-1 leading-relaxed">
                Full subscription sovereignty. Swap spray potencies, pause for travel, or change delivery cadence with a single tap in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Complete Searchable Dispensary Warehouse (Existing Catalog) */}
      <section className="w-full max-w-[1280px] mx-auto px-5 md:px-12 py-10 border-t border-[#282a36]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-1">
              FULL REFILL &amp; ACCESSORY CATALOG
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#e5e1e4]">
              All Dispensers &amp; Eco-Refills
            </h2>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search all formulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg pl-9 pr-3 py-2 text-xs text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none placeholder:text-[#8d90a5]/50"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#8d90a5] text-[16px]">
              search
            </span>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => {
            const isSub = !!subscriptionMode[product.id];
            const finalPrice = isSub ? product.price * 0.85 : product.price;

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#121318] border border-[#282a36] p-6 flex flex-col justify-between shadow-xl relative group hover:border-[#ff5a1f]/30 transition-all"
              >
                {product.badge && (
                  <div className="absolute -top-3 left-6 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-widest shadow-md">
                    {product.badge}
                  </div>
                )}

                <div>
                  {/* Image container */}
                  <div className="w-full h-64 rounded-xl overflow-hidden bg-[#2a2a2c] mb-5 relative flex items-center justify-center border border-[#282a36]">
                    <img
                      src={product.image}
                      alt={product.altText}
                      onClick={() => onViewProduct(product)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0e0e10]/85 backdrop-blur-md text-[#e5e1e4] font-['JetBrains_Mono'] text-xs border border-[#282a36]">
                      {product.rating} ★ ({product.reviewCount})
                    </span>

                    <button
                      onClick={() => onViewProduct(product)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#121318]/90 hover:bg-[#201f21] text-xs font-['JetBrains_Mono'] text-[#e5e1e4] border border-[#282a36] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Formula Specs</span>
                    </button>
                  </div>

                  {/* Header info */}
                  <div className="flex justify-between items-baseline mb-2">
                    <h3
                      onClick={() => onViewProduct(product)}
                      className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] hover:text-[#ff5a1f] cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="text-right shrink-0 ml-2">
                      <span className="font-['Space_Grotesk'] text-xl font-bold text-[#ff5a1f]">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {product.originalPrice && !isSub && (
                        <span className="text-[#8d90a5] font-['Manrope'] text-sm line-through ml-1.5">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-['Manrope'] text-xs sm:text-sm text-[#e4beb3]/80 mb-4 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="px-2.5 py-1 rounded bg-[#201f21] border border-[#282a36] font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
                      {product.spraysCount}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#201f21] border border-[#282a36] font-['JetBrains_Mono'] text-xs text-[#ffb77f]">
                      {product.flavorOrScent}
                    </span>
                  </div>

                  {/* Subscription toggle */}
                  <div className="p-2.5 rounded-lg bg-[#1c1b1d] border border-[#282a36] mb-5 flex items-center justify-between text-xs font-['JetBrains_Mono']">
                    <div>
                      <span className="text-[#e5e1e4] font-bold block">Autoship &amp; Save 15%</span>
                      <span className="text-[10px] text-[#8d90a5]">Fresh refill every 45 days</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSubscription(product.id)}
                      className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                        isSub ? 'bg-[#ff5a1f]' : 'bg-[#2a2a2c]'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          isSub ? 'right-0.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => onAddToCart(product, isSub, 1)}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>Add to Cart (${finalPrice.toFixed(2)})</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* COA Batch Verification Modal */}
      {coaVerifiedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setCoaVerifiedModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-lg bg-[#121318] border border-[#282a36] rounded-2xl shadow-2xl p-6 z-10">
            <div className="flex justify-between items-center pb-3 border-b border-[#282a36] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff5a1f] text-[22px]">verified</span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4]">
                  HPLC Verified: Batch {coaBatchInput}
                </span>
              </div>
              <button
                onClick={() => setCoaVerifiedModal(false)}
                className="text-[#8d90a5] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs font-['JetBrains_Mono'] mb-6">
              <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                <span className="text-[#8d90a5]">Heavy Metals (Lead, Cadmium, Arsenic):</span>
                <span className="text-[#ffb59e] font-bold">&lt;0.001 PPM (PASSED)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                <span className="text-[#8d90a5]">Active Peptide Potency Calibration:</span>
                <span className="text-[#ffb77f] font-bold">100.2% Target (PASSED)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                <span className="text-[#8d90a5]">Microbial Colony Purity:</span>
                <span className="text-[#00f0ff] font-bold">0 CFU/g (STERILE)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex justify-between">
                <span className="text-[#8d90a5]">Aerosol Droplet Mean Diameter:</span>
                <span className="text-[#e5e1e4] font-bold">5.12 μm ±0.15 μm</span>
              </div>
            </div>

            <button
              onClick={() => setCoaVerifiedModal(false)}
              className="w-full py-2.5 rounded-lg bg-[#ff5a1f] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-[#ff8a00] cursor-pointer"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
