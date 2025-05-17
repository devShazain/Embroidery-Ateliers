import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { getUserId } from '../utils/auth';
import { addToWishlist } from '../utils/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleAddToWishlist = async (productId) => {
        try {
            const userId = getUserId();
            if (!userId) {
                // Redirect to login or show login modal
                alert('Please login to add items to your wishlist');
                return;
            }

            await addToWishlist(userId, productId);
            alert('Product added to wishlist!');
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            alert('Failed to add product to wishlist');
        }
    };

    const categories = ['All', ...new Set(products.map(product => product.category))];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    if (loading) return <div className="text-center py-10">Loading products...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Collection</h1>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 m-1 rounded-full ${selectedCategory === category
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product.id}`}>
                                <h2 className="text-xl font-semibold mb-2 hover:text-primary">{product.name}</h2>
                            </Link>
                            <p className="text-gray-600 mb-2">{product.category}</p>
                            <p className="text-lg font-bold mb-4">Rs. {product.price.toLocaleString()}</p>
                            <div className="flex justify-between">
                                <Link
                                    to={`/product/${product.id}`}
                                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleAddToWishlist(product.id)}
                                    className="bg-white text-primary border border-primary px-3 py-2 rounded hover:bg-gray-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No products found in this category.
                </div>
            )}
        </div>
    );
};

export default ProductList;