import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserWishlist, removeFromWishlist } from '../utils/api';
import { getUserId, isLoggedIn } from '../utils/auth';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadWishlist = async () => {
            if (!isLoggedIn()) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const userId = getUserId();
                const data = await fetchUserWishlist(userId);
                setWishlistItems(data);
                setError(null);
            } catch (err) {
                setError('Failed to load wishlist. Please try again later.');
                console.error('Error loading wishlist:', err);
            } finally {
                setLoading(false);
            }
        };

        loadWishlist();
    }, [navigate]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const userId = getUserId();
            await removeFromWishlist(userId, productId);
            setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            alert('Failed to remove product from wishlist');
        }
    };

    const handleAddToCart = (item) => {
        // Get existing cart from localStorage or initialize empty array 
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if product already in cart 
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.product_id);

        if (existingItemIndex >= 0) {
            // Update quantity if product already in cart 
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart 
            cart.push({
                id: item.product_id,
                name: item.name,
                price: item.price,
                image: item.image_url,
                quantity: 1
            });
        }

        // Save updated cart to localStorage 
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show confirmation 
        alert('Product added to cart!');
    };

    if (loading) return <div className="text-center py-10">Loading wishlist...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                            <Link to={`/product/${item.product_id}`}>
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-64 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <Link to={`/product/${item.product_id}`}>
                                    <h2 className="text-xl font-semibold mb-2 hover:text-primary transition">{item.name}</h2>
                                </Link>
                                <p className="text-gray-600 mb-2">{item.category}</p>
                                <p className="text-lg font-bold mb-4">Rs. {item.price.toLocaleString()}</p>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition flex-grow"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item.product_id)}
                                        className="border border-red-500 text-red-500 px-3 py-2 rounded hover:bg-red-50 transition"
                                        title="Remove from wishlist"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-600 mb-6">Your wishlist is empty.</p>
                    <Link
                        to="/products"
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
                    >
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;