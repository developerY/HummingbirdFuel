import { useState } from 'react';
import { ActiveScreen, CartItem, Product } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MicrodoseCalculator } from './components/MicrodoseCalculator';
import { CircadianProtocol } from './components/CircadianProtocol';
import { DeliveryPhysics } from './components/DeliveryPhysics';
import { StoreSection } from './components/StoreSection';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { FinalBanner } from './components/FinalBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { SprayDemoModal } from './components/SprayDemoModal';
import { ScienceScreen } from './components/ScienceScreen';
import { StoreScreen } from './components/StoreScreen';
import { ContactScreen } from './components/ContactScreen';
import { ProfileDrawer } from './components/ProfileDrawer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Circadian Starter Kit initially in cart matching reference badge 2
      quantity: 1,
      isSubscription: false,
    },
    {
      product: PRODUCTS[1], // AM Day Fuel
      quantity: 1,
      isSubscription: true,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSprayDemoOpen, setIsSprayDemoOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const handleAddToCart = (product: Product, isSubscription: boolean = false, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.isSubscription === isSubscription
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, isSubscription }];
    });

    showToast(`Added ${product.name} to cart`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-['Manrope'] selection:bg-[#ff5a1f] selection:text-[#541400]">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={(screen) => setActiveScreen(screen)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {activeScreen === 'home' && (
          <>
            <Hero
              onOrderClick={() => {
                const el = document.getElementById('store');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveScreen('store');
              }}
              onExploreScienceClick={() => {
                const el = document.getElementById('fuel-protocol');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveScreen('fuel');
              }}
              onSimulateSpray={() => setIsSprayDemoOpen(true)}
            />

            <MicrodoseCalculator onSimulateSpray={() => setIsSprayDemoOpen(true)} />

            <CircadianProtocol onLearnMore={() => setActiveScreen('fuel')} />

            <DeliveryPhysics />

            <StoreSection
              products={PRODUCTS}
              onAddToCart={(p) => handleAddToCart(p, false, 1)}
              onViewProduct={(p) => setSelectedProduct(p)}
              onNavigateToFullStore={() => {
                setActiveScreen('store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <Testimonials />

            <ContactSection />

            <FinalBanner
              onGetStarted={() => {
                const el = document.getElementById('store');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveScreen('store');
              }}
              onTalkToBiohacker={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveScreen('contact');
              }}
            />
          </>
        )}

        {activeScreen === 'fuel' && (
          <>
            <ScienceScreen
              onOrderClick={() => {
                setActiveScreen('store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSimulateSpray={() => setIsSprayDemoOpen(true)}
            />
            <MicrodoseCalculator onSimulateSpray={() => setIsSprayDemoOpen(true)} />
            <CircadianProtocol onLearnMore={() => {}} />
            <DeliveryPhysics />
            <FinalBanner
              onGetStarted={() => setActiveScreen('store')}
              onTalkToBiohacker={() => setActiveScreen('contact')}
            />
          </>
        )}

        {activeScreen === 'store' && (
          <>
            <StoreScreen
              products={PRODUCTS}
              onAddToCart={(p, isSub) => handleAddToCart(p, isSub, 1)}
              onViewProduct={(p) => setSelectedProduct(p)}
            />
            <Testimonials />
            <FinalBanner
              onGetStarted={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onTalkToBiohacker={() => setActiveScreen('contact')}
            />
          </>
        )}

        {activeScreen === 'contact' && (
          <>
            <ContactScreen />
            <FinalBanner
              onGetStarted={() => setActiveScreen('store')}
              onTalkToBiohacker={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivacy={() => showToast('Privacy Policy: All biological telemetry stored in strict zero-retention AES-256.')}
        onOpenTerms={() => showToast('Terms: Backed by 30-Day Full Efficacy Bio-Guarantee.')}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Precision Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      {/* Product Detail & CoA Inspection Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Aerosol Simulation Modal */}
      <SprayDemoModal
        isOpen={isSprayDemoOpen}
        onClose={() => setIsSprayDemoOpen(false)}
      />

      {/* Biohacker Telemetry Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigateToStore={() => {
          setActiveScreen('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Active Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#1c1b1d] border border-[#ff5a1f]/60 shadow-[0_0_20px_rgba(255,90,31,0.25)] flex items-center gap-2.5 animate-fadeIn">
          <span className="material-symbols-outlined text-[#ff5a1f] text-[20px]">check_circle</span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#e5e1e4] font-medium">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
