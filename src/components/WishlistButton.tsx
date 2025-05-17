import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types/database';

interface WishlistButtonProps {
  product: Product;
  size?: number;
}

export default function WishlistButton({ product, size = 24 }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    alert('Wishlist functionality is currently disabled');
  };

  return (
    <button
      onClick={toggleWishlist}
      className="relative group"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isInWishlist ? 'filled' : 'outline'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isInWishlist ? (
            <Heart size={size} className="fill-red-500 text-red-500" />
          ) : (
            <Heart size={size} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}