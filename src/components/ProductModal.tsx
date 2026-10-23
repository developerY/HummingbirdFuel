import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, isSubscription: boolean, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'protocol'>('overview');

  if (!product) return null;

  const currentPrice = isSubscription ? product.price * 0.85 : product.price;

  const handleAdd = () => {
    onAddToCart(product, isSubscription, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#121318] border border-[#282a36] rounded-2xl shadow-2xl overflow-y-auto z-10 flex flex-col">
        {/* Header Bar */}
        <div className="p-4 md:px-6 border-b border-[#282a36] flex items-center justify-between bg-[#1c1b1d] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-wider font-semibold">
              Batch Telemetry: {product.batchNumber}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8d90a5] hover:text-[#e5e1e4] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Image and Specs */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="w-full aspect-square rounded-xl bg-[#2a2a2c] overflow-hidden border border-[#282a36] relative flex items-center justify-center">
              <img
                src={product.image}
                alt={product.altText}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#0e0e10]/80 backdrop-blur-md text-[#ffb77f] font-['JetBrains_Mono'] text-xs border border-[#282a36]">
                {product.rating} ★
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1c1b1d] border border-[#282a36] text-xs font-['JetBrains_Mono'] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8d90a5]">Sprays:</span>
                <span className="text-[#e5e1e4]">{product.spraysCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a5]">Bio-Uptake:</span>
                <span className="text-[#ffb77f]">&lt;90 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a5]">Flavor Note:</span>
                <span className="text-[#00f0ff]">{product.flavorOrScent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d90a5]">CoA Purity:</span>
                <span className="text-[#e5e1e4]">99.8% Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Tabs & Ordering */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <span className="font-['JetBrains_Mono'] text-xs text-[#ffb77f] uppercase tracking-widest font-semibold block mb-1">
                  {product.category === 'kit' ? 'Circadian Synchronization' : `${product.category.toUpperCase()} Phase Delivery`}
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#e5e1e4]">
                  {product.name}
                </h3>
                <p className="font-['Manrope'] text-xs md:text-sm text-[#e4beb3]/80 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#ff5a1f]">
                  ${currentPrice.toFixed(2)}
                </span>
                {product.originalPrice && !isSubscription && (
                  <span className="text-[#8d90a5] font-['Manrope'] text-sm line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {isSubscription && (
                  <span className="font-['JetBrains_Mono'] text-xs text-[#ffb77f] font-semibold">
                    (15% recurring subscriber discount)
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#282a36] mb-4 gap-4 text-xs font-['JetBrains_Mono']">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 uppercase font-semibold cursor-pointer border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-[#ff5a1f] text-[#ff5a1f]'
                      : 'border-transparent text-[#8d90a5] hover:text-[#e5e1e4]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 uppercase font-semibold cursor-pointer border-b-2 transition-colors ${
                    activeTab === 'ingredients'
                      ? 'border-[#ff5a1f] text-[#ff5a1f]'
                      : 'border-transparent text-[#8d90a5] hover:text-[#e5e1e4]'
                  }`}
                >
                  Key Actives ({product.keyIngredients.length})
                </button>
                <button
                  onClick={() => setActiveTab('protocol')}
                  className={`pb-2 uppercase font-semibold cursor-pointer border-b-2 transition-colors ${
                    activeTab === 'protocol'
                      ? 'border-[#ff5a1f] text-[#ff5a1f]'
                      : 'border-transparent text-[#8d90a5] hover:text-[#e5e1e4]'
                  }`}
                >
                  Protocol
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[140px] mb-6">
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <p className="font-['Manrope'] text-xs md:text-sm text-[#e4beb3]/80 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="space-y-1.5 font-['Manrope'] text-xs text-[#e5e1e4]">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#ffb77f]">check</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2 font-['Manrope'] text-xs">
                    {product.keyIngredients.map((ing, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#1c1b1d] border border-[#282a36]">
                        <div className="flex justify-between font-['Space_Grotesk'] font-bold text-[#e5e1e4]">
                          <span>{ing.name}</span>
                          <span className="font-mono text-[#ffb59e]">{ing.dosage}</span>
                        </div>
                        <div className="text-[#8d90a5] text-[11px] mt-0.5">{ing.benefit}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'protocol' && (
                  <div className="space-y-3 font-['Manrope'] text-xs text-[#e4beb3]/80">
                    <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36]">
                      <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase block mb-1 font-semibold">
                        Suggested Administration
                      </span>
                      <p>{product.usageProtocol}</p>
                    </div>
                    <p className="text-[11px] text-[#8d90a5]">
                      Tip: Keep under tongue for 15-20 seconds before swallowing to allow the oral mucosal capillary network to absorb micro-compounds directly.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Options Pod */}
            <div className="pt-4 border-t border-[#282a36] space-y-3">
              {/* Purchase Mode Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubscription(false)}
                  className={`p-2.5 rounded-lg border text-xs font-['JetBrains_Mono'] text-left cursor-pointer transition-all ${
                    !isSubscription
                      ? 'bg-[#1c1b1d] border-[#ff5a1f] text-[#e5e1e4]'
                      : 'bg-[#121318] border-[#282a36] text-[#8d90a5]'
                  }`}
                >
                  <div className="font-bold">One-Time</div>
                  <div className="text-[10px] text-[#8d90a5]">${product.price.toFixed(2)}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubscription(true)}
                  className={`p-2.5 rounded-lg border text-xs font-['JetBrains_Mono'] text-left cursor-pointer transition-all ${
                    isSubscription
                      ? 'bg-[#1c1b1d] border-[#ff5a1f] text-[#e5e1e4]'
                      : 'bg-[#121318] border-[#282a36] text-[#8d90a5]'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Subscribe &amp; Save</span>
                    <span className="text-[#ff5a1f] text-[10px]">15% OFF</span>
                  </div>
                  <div className="text-[10px] text-[#ffb77f]">${(product.price * 0.85).toFixed(2)} / 45 days</div>
                </button>
              </div>

              {/* Quantity + Add Button */}
              <div className="flex gap-3">
                <div className="flex items-center border border-[#282a36] rounded-lg bg-[#1c1b1d] px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-sm text-[#8d90a5] hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 font-['JetBrains_Mono'] text-xs text-[#e5e1e4] font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-sm text-[#8d90a5] hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>Add to Order — ${(currentPrice * quantity).toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
