import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, RefreshCw } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import WishlistButton from '../components/WishlistButton';
import ProductReviews from '../components/ProductReviews';
import ShareButtons from '../components/ShareButtons';
import RecentlyViewed from '../components/RecentlyViewed';
import { products, getSimilarProducts, addToRecentlyViewed } from '../lib/data';
import type { Product } from '../types/database';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image_url);
        setSimilarProducts(getSimilarProducts(foundProduct.category, id));
        addToRecentlyViewed(id);
      } else {
        setError('Product not found');
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.product.id === product.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        product,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    const cartItem = {
      product,
      quantity: 1
    };
    
    localStorage.setItem('cart', JSON.stringify([cartItem]));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-[#B8860B]">Loading product details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-red-500">{error || 'Product not found'}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <img
                src={product.image_url}
                alt={product.name}
                onClick={() => setSelectedImage(product.image_url)}
                className={`aspect-square rounded-lg cursor-pointer object-cover ${
                  selectedImage === product.image_url ? 'ring-2 ring-[#B8860B]' : ''
                }`}
              />
              {product.additional_images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 2}`}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-lg cursor-pointer object-cover ${
                    selectedImage === img ? 'ring-2 ring-[#B8860B]' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-serif text-[#B8860B]">{product.name}</h1>
              <WishlistButton product={product} />
            </div>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-medium text-[#B8860B]">
              PKR {product.price.toLocaleString()}
            </p>
            
            {product.color && (
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Color:</span> {product.color}
                </p>
              </div>
            )}

            <ShareButtons
              url={window.location.href}
              title={`Check out ${product.name} at Embroidery Atelier`}
            />

            <div className="space-y-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-white border-2 border-[#B8860B] text-[#B8860B] py-3 px-6 rounded-md hover:bg-[#B8860B] hover:text-white transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#B8860B] text-white py-3 px-6 rounded-md hover:bg-[#B8860B]/90 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Additional Details */}
            <div className="space-y-6 pt-8 border-t border-gray-200">
              {product.fabric_details && (
                <div>
                  <h3 className="text-lg font-medium text-[#B8860B] mb-2">Fabric Details</h3>
                  <p className="text-gray-600">{product.fabric_details}</p>
                </div>
              )}

              {product.care_instructions && (
                <div>
                  <h3 className="text-lg font-medium text-[#B8860B] mb-2">Care Instructions</h3>
                  <p className="text-gray-600">{product.care_instructions}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-[#B8860B] mb-2">Shipping Information</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Package size={20} />
                  <span>Fixed shipping rate of PKR 300 across Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw size={20} />
                  <span>7-day return policy for unworn items</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-[#B8860B] mb-4">Customer Reviews</h3>
              <ProductReviews productId={product.id} />
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif text-[#B8860B] mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full aspect-square object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-lg font-medium text-[#B8860B] mb-1">{item.name}</h3>
                  <p className="text-[#B8860B]/80">PKR {item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Section */}
        <RecentlyViewed currentProductId={product.id} />
      </div>
    </MainLayout>
  );
}