import type { Product, Review } from '../types/database';

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Embroidered Silk',
    description: 'Luxurious unstitched silk fabric with intricate gold thread embroidery and pearl embellishments.',
    price: 45000,
    image_url: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619626364173-d2c086d89086?auto=format&fit=crop&q=80'
    ],
    category: 'Unstitched',
    collection: 'Winter Collection 2024',
    color: 'Royal Blue',
    fabric_details: 'Premium silk with gold threadwork',
    care_instructions: 'Dry clean only',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Celestial Garden Suite',
    description: 'Premium unstitched fabric featuring hand-embroidered botanical motifs and crystal work.',
    price: 38500,
    image_url: 'https://images.unsplash.com/photo-1619626364173-d2c086d89086?auto=format&fit=crop&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?auto=format&fit=crop&q=80'
    ],
    category: 'Unstitched',
    collection: 'Winter Collection 2024',
    color: 'Emerald Green',
    fabric_details: 'Premium lawn with crystal work',
    care_instructions: 'Dry clean recommended',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Pearl Dynasty Collection',
    description: 'Elegant unstitched ensemble with delicate pearl embroidery on pure organza.',
    price: 42000,
    image_url: 'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?auto=format&fit=crop&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619626364173-d2c086d89086?auto=format&fit=crop&q=80'
    ],
    category: 'Unstitched',
    collection: 'Winter Collection 2024',
    color: 'Pearl White',
    fabric_details: 'Pure organza with pearl embellishments',
    care_instructions: 'Dry clean only. Handle with care.',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Emerald Enchantment',
    description: 'Stunning unstitched piece with emerald thread work and antique gold embellishments.',
    price: 55000,
    image_url: 'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?auto=format&fit=crop&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619626364173-d2c086d89086?auto=format&fit=crop&q=80'
    ],
    category: 'Unstitched',
    collection: 'Winter Collection 2024',
    color: 'Emerald Green',
    fabric_details: 'Premium silk with antique gold work',
    care_instructions: 'Dry clean only. Iron on low heat.',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Regal Nights',
    description: 'Majestic unstitched outfit with midnight blue base and silver thread embroidery.',
    price: 48000,
    image_url: 'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?auto=format&fit=crop&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619626364173-d2c086d89086?auto=format&fit=crop&q=80'
    ],
    category: 'Unstitched',
    collection: 'Winter Collection 2024',
    color: 'Midnight Blue',
    fabric_details: 'Premium velvet with silver threadwork',
    care_instructions: 'Dry clean only. Do not iron directly on embellishments.',
    created_at: new Date().toISOString()
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    product_id: '1',
    user_id: '1',
    rating: 5,
    comment: 'Beautiful embroidery and excellent quality fabric!',
    created_at: new Date().toISOString(),
    user: {
      email: 'sarah@example.com'
    }
  },
  {
    id: '2',
    product_id: '1',
    user_id: '2',
    rating: 4,
    comment: 'Gorgeous design, but slightly expensive.',
    created_at: new Date().toISOString(),
    user: {
      email: 'maria@example.com'
    }
  },
  {
    id: '3',
    product_id: '2',
    user_id: '3',
    rating: 5,
    comment: 'The crystal work is absolutely stunning!',
    created_at: new Date().toISOString(),
    user: {
      email: 'aisha@example.com'
    }
  }
];

export const recentlyViewed: string[] = [];

export function addToRecentlyViewed(productId: string) {
  const index = recentlyViewed.indexOf(productId);
  if (index > -1) {
    recentlyViewed.splice(index, 1);
  }
  recentlyViewed.unshift(productId);
  if (recentlyViewed.length > 4) {
    recentlyViewed.pop();
  }
}

export function getRecentlyViewedProducts(): Product[] {
  return recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

export function getSimilarProducts(category: string, currentId: string): Product[] {
  return products
    .filter(p => p.category === category && p.id !== currentId)
    .slice(0, 4);
}