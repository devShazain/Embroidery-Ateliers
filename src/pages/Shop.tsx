import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';
import { products } from '../lib/data';
import type { Product } from '../types/database';

export default function Shop() {
  const [trendingDesigns, setTrendingDesigns] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoShuffle, setIsAutoShuffle] = useState(false);

  const heroImages = [
    "https://images.unsplash.com/photo-1528818955841-a7f1425131b5?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?auto=format&fit=crop&q=80"
  ];

  // Get unstitched products for trending designs
  useEffect(() => {
    const unstitchedProducts = products.filter(p => p.category === 'Unstitched');
    shuffleTrendingDesigns(unstitchedProducts);
  }, []);

  // Auto shuffle effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoShuffle) {
      interval = setInterval(() => {
        const unstitchedProducts = products.filter(p => p.category === 'Unstitched');
        shuffleTrendingDesigns(unstitchedProducts);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoShuffle]);

  // Hero image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const shuffleTrendingDesigns = (productList: Product[]) => {
    // Shuffle the array and take first 3 items
    const shuffled = [...productList].sort(() => 0.5 - Math.random());
    setTrendingDesigns(shuffled.slice(0, 3));
  };

  const handleShuffleClick = () => {
    const unstitchedProducts = products.filter(p => p.category === 'Unstitched');
    shuffleTrendingDesigns(unstitchedProducts);
  };

  const toggleAutoShuffle = () => {
    setIsAutoShuffle(!isAutoShuffle);
  };

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Featured Collection ${index + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1.05 : 1
            }}
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 8 }
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h2
              className="text-5xl font-serif mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Winter Collection 2024
            </motion.h2>
            <motion.p
              className="text-lg tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Timeless Elegance
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Trending Designs Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-[#B8860B] inline-block relative">
            Trending Designs
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[#B8860B]/30"></span>
          </h2>
        </div>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={handleShuffleClick}
            className="px-4 py-2 bg-[#B8860B] text-white rounded-md hover:bg-[#B8860B]/90 transition-colors duration-300 flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Shuffle Designs
          </button>
          <button
            onClick={toggleAutoShuffle}
            className={`px-4 py-2 border rounded-md transition-colors duration-300 flex items-center gap-2 ${isAutoShuffle
                ? 'bg-[#B8860B] text-white border-[#B8860B]'
                : 'bg-white text-[#B8860B] border-[#B8860B]'
              }`}
          >
            {isAutoShuffle ? 'Stop Auto Shuffle' : 'Auto Shuffle'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingDesigns.map((design) => (
            <motion.div
              key={design.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/product/${design.id}`}>
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={design.image_url}
                    alt={design.name}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#B8860B]/60 mb-1">{design.id.slice(0, 6).toUpperCase()}</p>
                  <h3 className="text-lg font-medium text-[#B8860B] mb-2">{design.name}</h3>
                  <p className="text-[#B8860B]/80">{formatPrice(design.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-[#B8860B]/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                SIGN UP FOR NEWSLETTER
              </h3>
            </div>
            <div className="flex-1 max-w-xl w-full">
              <form className="flex gap-4" onSubmit={(e) => {
                e.preventDefault();
                alert('Newsletter subscription is currently disabled');
              }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-[#B8860B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B8860B]/30 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#B8860B] text-white rounded-md hover:bg-[#B8860B]/90 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}