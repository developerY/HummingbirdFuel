import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Mercer',
    email: 'alex@performance.bio',
    address: '404 Silicon Way, Suite 800',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '891'
  });
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => {
    const itemPrice = item.isSubscription ? item.product.price * 0.85 : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder = 'HF-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep('success');
      onOrderComplete();
    }, 1200);
  };

  const handleFinish = () => {
    onClose();
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div className="relative w-full max-w-xl bg-[#121318] border border-[#282a36] rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#282a36] flex items-center justify-between bg-[#1c1b1d]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse"></span>
            <span className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
              {step === 'details' && 'Precision Dispatch // Delivery Endpoint'}
              {step === 'payment' && 'Encrypted Terminal // Settlement'}
              {step === 'success' && 'Batch Reserved // Telemetry Active'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8d90a5] hover:text-[#e5e1e4] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-4">
              <div className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] uppercase tracking-wider mb-1">
                Recipient &amp; Delivery Coordinate
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Email Endpoint (For Telemetry)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#282a36] flex justify-between items-center">
                <span className="font-['Space_Grotesk'] text-base font-bold text-[#e5e1e4]">
                  Total: <span className="text-[#ff5a1f]">${total.toFixed(2)}</span>
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
              <div className="text-xs font-['JetBrains_Mono'] text-[#ffb59e] uppercase tracking-wider mb-1">
                Encrypted Payment Token
              </div>

              <div className="p-3 rounded-lg bg-[#1c1b1d] border border-[#282a36] flex items-center justify-between">
                <span className="text-xs font-['Manrope'] text-[#e4beb3]/80">Order Total</span>
                <span className="font-['Space_Grotesk'] text-base font-bold text-[#ff5a1f]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div>
                <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none font-mono"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#ffb77f] text-[18px]">
                    credit_card
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={formData.expDate}
                    onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-['JetBrains_Mono'] text-[#8d90a5] block mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="w-full bg-[#1c1b1d] border border-[#282a36] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#ff5a1f] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#201f21] border border-[#282a36] text-[11px] font-['Manrope'] text-[#8d90a5] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#ffb59e]">lock</span>
                <span>All transactions encrypted via 256-bit bank grade tokenization. No card data saved on open servers.</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#282a36] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs font-['JetBrains_Mono'] text-[#8d90a5] hover:text-[#e5e1e4] cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#0e0e10] border-t-transparent rounded-full animate-spin"></span>
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <span>Authorize ${total.toFixed(2)}</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#ff5a1f]/20 border border-[#ff5a1f] flex items-center justify-center text-[#ff5a1f] mb-4">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>

              <span className="font-['JetBrains_Mono'] text-xs text-[#ffb59e] uppercase tracking-widest font-semibold mb-1">
                Batch Allocation Confirmed
              </span>

              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e5e1e4] mb-2">
                Welcome to Neuro-Optimization
              </h3>

              <p className="font-['Manrope'] text-sm text-[#e4beb3]/80 max-w-sm mb-6">
                Your order has been recorded. Dispensers from Batch #HF-2025-04 are being nitrogen-purged and packaged for carbon-neutral priority shipping.
              </p>

              <div className="w-full p-4 rounded-xl bg-[#1c1b1d] border border-[#282a36] text-left text-xs font-['JetBrains_Mono'] space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#8d90a5]">Order Number:</span>
                  <span className="text-[#ffb77f] font-bold">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8d90a5]">Dispatched To:</span>
                  <span className="text-[#e5e1e4]">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8d90a5]">Estimated Arrival:</span>
                  <span className="text-[#00f0ff]">2-3 Business Days</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] text-[#0e0e10] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
