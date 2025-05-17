import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchProductReviews, createReview, addToWishlist } from '../utils/api';
import { getUserId, isLoggedIn } from '../utils/auth';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        const loadProductAndReviews = async () => {
            try {
                setLoading(true);
                const productData = await fetchProductById(id);
                setProduct(productData);

                const reviewsData = await fetchProductReviews(id);
                setReviews(reviewsData);

                setError(null);
            } catch (err) {
                setError('Failed to load product details. Please try again later.');
                console.error('Error loading product details:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProductAndReviews();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        // Get existing cart from localStorage or initialize empty array
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if product already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            // Update quantity if product already in cart
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                quantity: quantity
            });
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show confirmation and navigate to cart
        alert('Product added to cart!');
        navigate('/cart');
    };

    const handleAddToWishlist = async () => {
        try {
            if (!isLoggedIn()) {
                alert('Please login to add items to your wishlist');
                navigate('/login');
                return;
            }

            const userId = getUserId();
            await addToWishlist(userId, product.id);
            alert('Product added to wishlist!');
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            alert('Failed to add product to wishlist');
        }
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewForm(prev => ({ ...prev, [name]: value }));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!isLoggedIn()) {
                alert('Please login to submit a review');
                navigate('/login');
                return;
            }

            const userId = getUserId();
            const reviewData = {
                user_id: userId,
                product_id: product.id,
                rating: parseInt(reviewForm.rating),
                comment: reviewForm.comment
            };

            const newReview = await createReview(product.id, reviewData);
            setReviews(prev => [newReview, ...prev]);
            setReviewForm({ rating: 5, comment: '' });
            alert('Review submitted successfully!');
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review');
        }
    };

    if (loading) return <div className="text-center py-10">Loading product details...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-10">Product not found</div>;

    // Combine main image and additional images for gallery
    const allImages = [product.image_url, ...(product.additional_images || [])];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                    <div className="mb-4">
                        <img
                            src={allImages[activeImage]}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {allImages.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`border rounded ${activeImage === index ? 'border-primary' : 'border-gray-300'}`}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    className="w-full h-20 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.category}</p>
                    <p className="text-2xl font-bold mb-4">Rs. {product.price.toLocaleString()}</p>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    {product.color && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Color</h2>
                            <p className="text-gray-700">{product.color}</p>
                        </div>
                    )}

                    {product.fabric_details && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Fabric Details</h2>
                            <p className="text-gray-700">{product.fabric_details}</p>
                        </div>
                    )}

                    {product.care_instructions && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Care Instructions</h2>
                            <p className="text-gray-700">{product.care_instructions}</p>
                        </div>
                    )}

                    <div className="flex items-center mb-6">
                        <label htmlFor="quantity" className="mr-4 font-medium">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border rounded px-3 py-2 w-20 text-center"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex-grow"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="border border-primary text-primary px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

                {/* Review Form */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                            <label htmlFor="rating" className="block mb-2 font-medium">Rating</label>
                            <select
                                id="rating"
                                name="rating"
                                value={reviewForm.rating}
                                onChange={handleReviewChange}
                                className="border rounded px-3 py-2 w-full"
                            >
                                <option value="5">5 Stars - Excellent</option>
                                <option value="4">4 Stars - Very Good</option>
                                <option value="3">3 Stars - Good</option>
                                <option value="2">2 Stars - Fair</option>
                                <option value="1">1 Star - Poor</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="comment" className="block mb-2 font-medium">Your Review</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={reviewForm.comment}
                                onChange={handleReviewChange}
                                rows="4"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Share your thoughts about this product..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map(review => (
                            <div key={review.id} className="border-b pb-6">
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill={i < review.rating ? "currentColor" : "none"}
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-600">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;