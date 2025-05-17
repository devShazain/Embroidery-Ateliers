import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

export default function Wishlist() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] mb-8">My Wishlist</h1>

        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Wishlist functionality is currently disabled</p>
          <button
            onClick={() => navigate('/unstitched')}
            className="bg-[#B8860B] text-white px-6 py-2 rounded-md hover:bg-[#B8860B]/90 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    </MainLayout>
  );
}