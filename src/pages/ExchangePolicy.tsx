import React from 'react';
import MainLayout from '../components/MainLayout';

export default function ExchangePolicy() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Exchange Policy</h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Return Period</h2>
              <p className="text-gray-700">
                As our pieces are crafted according to your specific design preferences, we offer:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>Full cash back if returned within the first week of delivery</li>
                <li>No returns accepted after the first week</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Return Process</h2>
              <p className="text-gray-700">To initiate a return, please:</p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>Email us at EmbroideryAteliers@gmail.com</li>
                <li>Contact us via WhatsApp at our provided number</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Conditions</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Items must be in their original, undamaged condition</li>
                <li>No cash back will be provided for damaged items</li>
                <li>Original packaging should be intact</li>
              </ul>
            </section>

            <div className="mt-8 p-4 bg-[#B8860B]/10 rounded-md">
              <p className="text-[#B8860B] text-center">For any questions about our exchange policy, please contact our customer support team.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}