import React from 'react';
import MainLayout from '../components/MainLayout';

export default function AboutUs() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">About Us</h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Our Story</h2>
              <p className="text-gray-700">
                Embroidery Atelier was founded with a vision to preserve and elevate the traditional art of Pakistani embroidery. Our journey began with a deep appreciation for the intricate craftsmanship that has been passed down through generations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Our Craft</h2>
              <p className="text-gray-700">
                Each piece created at Embroidery Atelier is a testament to the skill and dedication of our master artisans. We combine traditional techniques with contemporary design sensibilities to create pieces that are both timeless and modern.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Our Commitment</h2>
              <p className="text-gray-700">
                We are committed to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>Preserving traditional embroidery techniques</li>
                <li>Supporting local artisans and their communities</li>
                <li>Creating sustainable, high-quality pieces</li>
                <li>Providing exceptional customer service</li>
              </ul>
            </section>

            <div className="mt-8 p-4 bg-[#B8860B]/10 rounded-md">
              <p className="text-[#B8860B] text-center">Experience the art of bespoke embroidery with Embroidery Atelier</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}