import React from 'react';
import MainLayout from '../components/MainLayout';

export default function ShippingInfo() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Shipping Information</h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Shipping Coverage</h2>
              <p className="text-gray-700">We proudly offer shipping services across Pakistan.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Shipping Rate</h2>
              <p className="text-gray-700">A fixed shipping rate of PKR 300 applies to all orders. This will be added to your total order amount at checkout.</p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[#B8860B] mb-4">Estimated Delivery Time</h2>
              <p className="text-gray-700">As each piece is crafted according to your specific design preferences and requirements, delivery times vary based on:</p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>Design complexity</li>
                <li>Customization requirements</li>
                <li>Order size</li>
              </ul>
              <p className="mt-4 text-gray-700">Our team will contact you with a specific estimated delivery time after reviewing your order details.</p>
            </section>

            <div className="mt-8 p-4 bg-[#B8860B]/10 rounded-md">
              <p className="text-[#B8860B] text-center">For specific delivery inquiries, please contact our customer support team.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}