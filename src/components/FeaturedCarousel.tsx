import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types/database';

export default function FeaturedCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 4;
      },
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 4000);

    return () => {
      clearInterval(autoplay);
    };
  }, [instanceRef]);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();

        if (data) {
          // Get the most recent 8 products
          setProducts(data.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        // Fallback to local data if API fails
        const localProducts = require('../lib/data').products.slice(0, 8);
        setProducts(localProducts);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="relative">
      <div className="keen-slider" ref={sliderRef}>
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="keen-slider__slide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="text-sm">PKR {product.price.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          <div className="flex justify-center mt-4 gap-2">
            {[...Array(instanceRef.current.track.details.slides.length)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-[#B8860B] w-4' : 'bg-[#B8860B]/30'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}