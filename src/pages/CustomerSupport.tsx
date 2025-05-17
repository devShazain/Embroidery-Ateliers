import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

export default function CustomerSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'order',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    alert('Thank you for your message. We will get back to you soon.');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Customer Support</h1>
        
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#B8860B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-[#B8860B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-[#B8860B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
              >
                <option value="order">Order Related</option>
                <option value="shipping">Shipping</option>
                <option value="returns">Returns</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-[#B8860B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B8860B] h-32"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B8860B] text-white py-3 rounded-md hover:bg-[#B8860B]/90 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}