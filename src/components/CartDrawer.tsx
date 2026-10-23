import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.isSubscription ? item.product.price * 0.85 : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = rawSubtotal * promoDiscount;
  const subtotal = rawSubtotal - discountAmount;
  const freeShippingThreshold = 50;
  const freeShipping = subtotal >= freeShippingThreshold || cartItems.length === 0;
  const shippingCost = freeShipping ? 0 : 5.95;
  const total = subtotal + shippingCost;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'BIOHACK10') {
      setPromoDiscount(0.1);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'FOUNDER20') {
      setPromoDiscount(0.2);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid code. Try "BIOHACK10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121318] border-l border-[#282a36] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#282a36] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff5a1f] text-[24px]">shopping_bag</span>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#e5e1e4]">
                Bio-Dispenser Cart ({cartItems.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#201f21] text-[#8d90a5] hover:text-[#e5e1e4] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#1c1b1d] border-b border-[#282a36]">
            <div className="flex justify-between items-center text-xs font-['JetBrains_Mono'] mb-1.5">
              <span className="text-[#e4beb3]/80">
                {freeShipping
                  ? '✓ Unlocked Carbon-Neutral Free Shipping'
                  : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} for Free Shipping`}
              </span>
              <span className="text-[#ffb77f] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#201f21] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#201f21] flex items-center justify-center text-[#8d90a5] mb-4">
                  <span className="material-symbols-outlined text-[32px]">remove_shopping_cart</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e5e1e4] mb-1">
                  Your dispenser queue is empty
                </h3>
                <p className="font-['Manrope'] text-xs text-[#8d90a5] max-w-xs mb-6">
                  Select your targeted circadian mist or complete starter kit to initiate sublingual bio-uptake.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#ff5a1f] text-[#0e0e10] font-['Space_Grotesk'] text-xs uppercase font-bold tracking-wider hover:bg-[#ff8a00] cursor-pointer"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-[#1c1b1d] border border-[#282a36] flex gap-3.5 items-center relative"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-[#2a2a2c] overflow-hidden shrink-0 border border-[#282a36]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#e5e1e4] truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#8d90a5] hover:text-[#ff5a1f] p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-['JetBrains_Mono'] text-[#ffb77f] mb-1">
                      {item.isSubscription ? 'Autoship (-15% Refill)' : 'Single Order'}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#282a36] rounded-md bg-[#121318]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#8d90a5] hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-['JetBrains_Mono'] text-[#e5e1e4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#8d90a5] hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-['Space_Grotesk'] text-sm font-bold text-[#e5e1e4]">
                        ${((item.isSubscription ? item.product.price * 0.85 : item.product.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#282a36] bg-[#121318] flex flex-col gap-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (Try BIOHACK10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-1.5 text-xs font-['JetBrains_Mono'] text-[#e5e1e4] focus:outline-none focus:border-[#ff5a1f] uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#2a2a2c] text-xs font-['JetBrains_Mono'] text-[#e5e1e4] hover:bg-[#353437] cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoApplied && (
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#ffb59e]">
                  ✓ Promo applied: {promoDiscount * 100}% discount!
                </span>
              )}
              {promoError && (
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#ffb4ab]">
                  {promoError}
                </span>
              )}

              {/* Price Breakdown */}
              <div className="flex flex-col gap-1.5 text-xs font-['Manrope']">
                <div className="flex justify-between text-[#8d90a5]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#e5e1e4]">${rawSubtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#ffb77f]">
                    <span>Discount</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8d90a5]">
                  <span>Carbon-Neutral Shipping</span>
                  <span className="font-mono text-[#e5e1e4]">
                    {freeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4] pt-2 border-t border-[#282a36]">
                  <span>Total</span>
                  <span className="text-[#ff5a1f]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Proceed to Precision Checkout</span>
              </button>

              <div className="text-center font-['JetBrains_Mono'] text-[10px] text-[#8d90a5]">
                🔒 256-bit Encrypted SSL • 30-Day Money-Back Guarantee
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
