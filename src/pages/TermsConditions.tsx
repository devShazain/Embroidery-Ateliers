import React from 'react';
import MainLayout from '../components/MainLayout';

export default function TermsConditions() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Terms and Conditions</h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and placing an order with Embroidery Atelier, you confirm that you are in agreement with and bound by the terms and conditions contained herein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">2. Custom Orders</h2>
              <p className="text-gray-700">
                All our pieces are custom-made according to your specifications. By placing an order, you acknowledge that:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>Each piece is uniquely crafted</li>
                <li>Production times vary based on design complexity</li>
                <li>Slight variations may occur due to the handcrafted nature of our products</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">3. Payment Terms</h2>
              <p className="text-gray-700">
                We accept payments through EasyPaisa, SadaPay, and HBL bank transfer. Payment terms are:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>30% advance payment required at the time of order placement</li>
                <li>Remaining 70% payment due before delivery</li>
                <li>Order processing begins after receiving the advance payment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">4. Shipping</h2>
              <p className="text-gray-700">
                Shipping costs are calculated based on our fixed rate policy. Delivery times are estimates and may vary based on your location and order specifications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">5. Privacy Policy</h2>
              <p className="text-gray-700">
                We respect your privacy and are committed to protecting your personal information. Your data will only be used to process your order and enhance your shopping experience.
              </p>
            </section>

            <div className="mt-8 p-4 bg-[#B8860B]/10 rounded-md">
              <p className="text-[#B8860B] text-center">These terms and conditions are subject to change without notice.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}