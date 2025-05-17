import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../lib/data';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const productReviews = reviews.filter(review => review.product_id === productId);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Review functionality is currently disabled');
  };

  const averageRating = productReviews.length
    ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-[#B8860B]">{averageRating}</div>
        <div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(parseFloat(averageRating))
                    ? 'text-[#B8860B] fill-[#B8860B]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{productReviews.length} reviews</p>
        </div>
      </div>

      <form onSubmit={handleSubmitReview} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({ ...newReview, rating: star })}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= newReview.rating
                      ? 'text-[#B8860B] fill-[#B8860B]'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]/30"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#B8860B] text-white px-6 py-2 rounded-md hover:bg-[#B8860B]/90 transition-colors"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-6">
        {productReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? 'text-[#B8860B] fill-[#B8860B]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <div className="text-sm text-gray-500">
              <span>{review.user?.email}</span>
              <span className="mx-2">•</span>
              <span>{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}