import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import Shop from './pages/Shop';
import CustomerSupport from './pages/CustomerSupport';
import ShippingInfo from './pages/ShippingInfo';
import ExchangePolicy from './pages/ExchangePolicy';
import TermsConditions from './pages/TermsConditions';
import ReadyToWear from './pages/ReadyToWear';
import Unstitched from './pages/Unstitched';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ArtisanalAccessories from './pages/ArtisanalAccessories';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Wishlist from './pages/Wishlist';

function LandingPage({ onShopNow }: { onShopNow: () => void }) {
  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex flex-col items-center justify-center mb-6">
          <Scissors className="w-12 h-12 text-[#B8860B] transform -rotate-45 animate-spin-slow mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif text-[#B8860B] tracking-wider mb-2 animate-slide-up">
            EMBROIDERY ATELIER
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-[#B8860B]/80 animate-slide-up-delay">
            Bespoke Embroidered Elegance
          </p>
        </div>
      </div>

      <div className="w-full max-w-md bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#B8860B]/10 animate-fade-in-delay">
        <div className="text-center mb-8">
          <h2 className="text-xl text-[#B8860B] font-medium mb-6">
            Welcome to Embroidery Atelier
          </h2>
          
          <button
            onClick={onShopNow}
            className="w-full bg-[#B8860B] text-white py-3 px-6 rounded-md hover:bg-[#B8860B]/90 transition-all duration-300 uppercase tracking-wider font-medium transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>

        <div className="text-center text-sm text-[#B8860B]/60">
          <p>Experience the finest in bespoke embroidered suits</p>
        </div>
      </div>

      <div 
        className="fixed inset-0 -z-10 opacity-20 animate-ken-burns"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleShopNow = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onShopNow={handleShopNow} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/shipping-information" element={<ShippingInfo />} />
        <Route path="/exchange-policy" element={<ExchangePolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/ready-to-wear" element={<ReadyToWear />} />
        <Route path="/unstitched" element={<Unstitched />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/artisanal-accessories" element={<ArtisanalAccessories />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;