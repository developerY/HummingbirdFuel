import React, { useState } from 'react';
import { Product } from '../types';

interface StoreScreenProps {
  products: Product[];
  onAddToCart: (product: Product, isSubscription: boolean) => void;
  onViewProduct: (product: Product) => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  products,
  onAddToCart,
  onViewProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kit' | 'day' | 'night'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionMode, setSubscriptionMode] = useState<Record<string, boolean>>({});

  const toggleSubscription = (productId: string) => {
    setSubscriptionMode((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0e0e10] py-12 md:py-20 text-[#e5e1e4]">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-widest mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
              Direct Dispenser Warehouse
            </div>
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#e5e1e4]">
              Microdose Dispensers <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] via-[#ffb77f] to-[#ffb95a]">
                &amp; Eco-Refill Packs
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-[#8d90a5]">
            <span className="material-symbols-outlined text-[16px] text-[#ffb59e]">local_shipping</span>
            <span>Free Carbon-Neutral Shipping on Orders $50+</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-[#121318] border border-[#282a36] mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Dispensers' },
              { id: 'kit', label: 'Circadian Kits' },
              { id: 'day', label: 'AM Day Energy' },
              { id: 'night', label: 'PM Night Reset' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] uppercase tracking-wider font-semibold cursor-pointer transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#ff5a1f] text-[#0e0e10] shadow-sm'
                    : 'bg-[#1c1b1d] text-[#8d90a5] hover:text-[#e5e1e4] hover:bg-[#201f21]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none placeholder:text-[#8d90a5]/50"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#8d90a5] text-[16px]">
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
                  onClick={() => onAddToCart(product, isSub)}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>Add to Cart (${finalPrice.toFixed(2)})</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Subscription Guarantee & Protocol Dispatch Banner */}
        <div className="p-8 rounded-2xl bg-[#121318] border border-[#282a36] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#201f21] flex items-center justify-center text-[#ffb59e] shrink-0">
              <span className="material-symbols-outlined text-[24px]">replay</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">Flexible Schedule</div>
              <div className="font-['Manrope'] text-xs text-[#8d90a5]">Pause, skip, or cancel your refills at any time with one click.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#201f21] flex items-center justify-center text-[#ffb77f] shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">30-Day Guarantee</div>
              <div className="font-['Manrope'] text-xs text-[#8d90a5]">Noticeable cognitive sharpening and deep sleep or 100% refund.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#201f21] flex items-center justify-center text-[#00f0ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">Fresh Nitrogen Seal</div>
              <div className="font-['Manrope'] text-xs text-[#8d90a5]">All canisters bottled in cGMP laboratory and sealed for optimal potency.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
