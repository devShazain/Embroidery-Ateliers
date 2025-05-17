import React from 'react';
import MainLayout from '../components/MainLayout';

export default function FAQ() {
  const faqs = [
    {
      question: "How long does it take to complete an order?",
      answer: "Order completion time varies depending on the complexity of the design and current order volume. Typically, orders take 2-4 weeks to complete. Our team will provide you with a specific timeline after reviewing your order details."
    },
    {
      question: "How are orders taken?",
      answer: "Orders can be placed directly through our website. Once an order is placed, our design team will reach out to discuss your specific requirements and preferences in detail."
    },
    {
      question: "Since there are no size charts, how do I proceed with my order?",
      answer: "Our team will guide you through the measurement process. We'll provide detailed instructions for taking measurements and our experts are available to assist you via phone or video call if needed."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and cash on delivery for orders within Pakistan."
    },
    {
      question: "Can I customize my design?",
      answer: "Yes! We specialize in customization. You can discuss your design preferences with our team, and we'll work together to create exactly what you envision."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we are focusing on serving our customers in Pakistan. International shipping will be available soon."
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-[#B8860B] text-center mb-8">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-medium text-[#B8860B] mb-3">{faq.question}</h2>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700">
              Still have questions? Contact us at{' '}
              <a href="mailto:EmbroideryAteliers@gmail.com" className="text-[#B8860B] hover:underline">
                EmbroideryAteliers@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}