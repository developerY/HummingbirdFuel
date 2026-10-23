import React from 'react';
import { Product } from '../types';

interface StoreSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onNavigateToFullStore: () => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  onAddToCart,
  onViewProduct,
  onNavigateToFullStore
}) => {
  // Show the top 3 flagship items on home screen
  const displayProducts = products.slice(0, 3);

  return (
    <section className="w-full bg-[#0e0e10] py-16 md:py-24" id="store">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold block mb-2">
              Direct-To-Consumer Inventory
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#e5e1e4] tracking-tight">
              Precision Biohacking Dispenser Formats
            </h2>
          </div>

          <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            <span>BATCH #HF-2025-04 LIVE IN STOCK</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => {
            const isKit = product.id === 'circadian-starter-kit';

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#121318] border border-[#282a36] p-6 flex flex-col justify-between shadow-xl relative group hover:border-[#ff5a1f]/30 transition-all"
              >
                {/* Floating Top Badge if Kit */}
                {product.badge && (
                  <div className="absolute -top-3 left-6 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-widest shadow-md">
                    {product.badge}
                  </div>
                )}

                <div>
                  {/* Product Image Frame */}
                  <div className="w-full h-64 rounded-xl overflow-hidden bg-[#2a2a2c] mb-5 relative flex items-center justify-center border border-[#282a36]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none cursor-pointer"
                      alt={product.altText}
                      src={product.image}
                      onClick={() => onViewProduct(product)}
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0e0e10]/85 backdrop-blur-md text-[#e5e1e4] font-['JetBrains_Mono'] text-xs border border-[#282a36]">
                      {product.rating} ★ ({product.reviewCount} Reviews)
                    </span>

                    {/* Quick view overlay icon */}
                    <button
                      onClick={() => onViewProduct(product)}
                      title="Inspect Biohacking Formula"
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#121318]/90 hover:bg-[#201f21] text-xs font-['JetBrains_Mono'] text-[#e5e1e4] border border-[#282a36] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Formula Specs</span>
                    </button>
                  </div>

                  {/* Title & Price */}
                  <div className="flex justify-between items-baseline mb-2">
                    <h3
                      onClick={() => onViewProduct(product)}
                      className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4] hover:text-[#ff5a1f] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="text-right shrink-0 ml-2">
                      <span className={`font-['Space_Grotesk'] text-xl font-bold ${isKit ? 'text-[#ff5a1f]' : 'text-[#e5e1e4]'}`}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[#8d90a5] font-['Manrope'] text-sm line-through ml-1.5">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['Manrope'] text-xs sm:text-sm text-[#e4beb3]/80 mb-4 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    <span className="px-2.5 py-1 rounded bg-[#201f21] border border-[#282a36] font-['JetBrains_Mono'] text-xs text-[#8d90a5]">
                      {product.spraysCount}
                    </span>
                    <span className={`px-2.5 py-1 rounded bg-[#201f21] border border-[#282a36] font-['JetBrains_Mono'] text-xs ${
                      product.category === 'day' ? 'text-[#ffb59e]' : product.category === 'night' ? 'text-[#00f0ff]' : 'text-[#ffb77f]'
                    }`}>
                      {product.flavorOrScent}
                    </span>
                    {product.originalPrice && (
                      <span className="px-2.5 py-1 rounded bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 font-['JetBrains_Mono'] text-xs text-[#ffb77f] font-semibold">
                        Save 20%
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-3.5 rounded-lg font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isKit
                      ? 'bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] hover:brightness-110 shadow-[0_0_20px_rgba(255,90,31,0.3)]'
                      : 'bg-[#201f21] border border-[#282a36] text-[#e5e1e4] hover:bg-[#2a2a2c] hover:border-[#ff5a1f]/40 hover:text-white'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>{isKit ? 'Add Kit to Cart' : `Add ${product.category === 'day' ? 'AM' : 'PM'} Spray ($${product.price})`}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* View All In Full Store Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToFullStore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1c1b1d] hover:bg-[#201f21] border border-[#282a36] text-[#ffb59e] font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold hover:border-[#ff5a1f]/50 transition-all cursor-pointer"
          >
            <span>Explore All Bundles &amp; Eco-Refill Cartridges</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
