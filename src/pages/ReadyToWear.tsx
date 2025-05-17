import React from 'react';
import MainLayout from '../components/MainLayout';

export default function ReadyToWear() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Ready To Wear Collection</h1>
        
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#B8860B] mb-4">Coming Soon</h2>
            <p className="text-gray-600">Our exclusive ready-to-wear collection will be available shortly.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}