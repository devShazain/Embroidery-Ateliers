import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Scissors, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from '../types/database';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    setIsSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 flex justify-center">
              <Link to="/" className="inline-block group">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Scissors className="w-8 h-8 text-primary transform -rotate-45" />
                </motion.div>
                <motion.h1
                  className="text-2xl font-display text-primary tracking-wider"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  EMBROIDERY ATELIER
                </motion.h1>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              <Link
                to="/wishlist"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Heart size={20} />
              </Link>
              <button
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="w-6 h-6 text-primary" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search designs..."
                  className="w-full px-4 py-2 rounded-md border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </motion.form>
            )}
          </AnimatePresence>

          <nav className="hidden lg:block mt-6">
            <ul className="flex justify-center space-x-8">
              {['Volume I', 'Ready To Wear', 'Unstitched'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Volume I' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`nav-link ${location.pathname === (item === 'Volume I' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`)
                      ? 'text-primary/80'
                      : ''
                      }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-primary/10"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="space-y-4">
                  {['Volume I', 'Ready To Wear', 'Unstitched'].map((item) => (
                    <li key={item}>
                      <Link
                        to={item === 'Volume I' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-primary hover:text-primary/80 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="min-h-[calc(100vh-64px)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-white border-t border-primary/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-display font-bold text-gray-900 mb-4">CONTACT US</h4>
              <ul className="space-y-2">
                <li className="text-gray-600">
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:EmbroideryAteliers@gmail.com" className="hover:text-primary transition-colors">
                    EmbroideryAteliers@gmail.com
                  </a>
                </li>
                <li className="text-gray-600">
                  <span className="font-medium">Phone:</span>{' '}
                  <a href="tel:0300-1112223" className="hover:text-primary transition-colors">
                    0300-1112223
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold text-gray-900 mb-4">CUSTOMER SUPPORT</h4>
              <ul className="space-y-2">
                {[
                  ['Customer Support', '/customer-support'],
                  ['Shipping Information', '/shipping-information'],
                  ['Exchange Policy', '/exchange-policy'],
                  ['Terms and Conditions', '/terms-conditions']
                ].map(([text, path]) => (
                  <li key={path}>
                    <Link to={path} className="text-gray-600 hover:text-primary transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold text-gray-900 mb-4">SHOP</h4>
              <ul className="space-y-2">
                {[
                  ['Ready To Wear', '/ready-to-wear'],
                  ['Unstitched', '/unstitched'],
                  ['Artisanal Accessories', '/artisanal-accessories']
                ].map(([text, path]) => (
                  <li key={path}>
                    <Link to={path} className="text-gray-600 hover:text-primary transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold text-gray-900 mb-4">ABOUT</h4>
              <ul className="space-y-2">
                {[
                  ['About Us', '/about-us'],
                  ['FAQs', '/faq']
                ].map(([text, path]) => (
                  <li key={path}>
                    <Link to={path} className="text-gray-600 hover:text-primary transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
