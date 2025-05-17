import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentlyViewedProducts } from '../lib/data';
import type { Product } from '../types/database';

interface RecentlyViewedProps {
  currentProductId: string;
}

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const navigate = useNavigate();
  const products = getRecentlyViewedProducts().filter(p => p.id !== currentProductId);

  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif text-[#B8860B] mb-8">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden mb-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
            <h3 className="text-lg font-medium text-[#B8860B] mb-1">{product.name}</h3>
            <p className="text-[#B8860B]/80">PKR {product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}