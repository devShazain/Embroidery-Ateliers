import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { products } from '../lib/data';

export default function Unstitched() {
  const unstitchedProducts = products.filter(p => p.category === 'Unstitched');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Unstitched Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {unstitchedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="relative overflow-hidden mb-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-[#B8860B] mb-2">{product.name}</h3>
                <p className="text-[#B8860B]/80">PKR {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}