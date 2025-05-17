import { getAuthHeader } from './auth';

const API_URL = 'http://localhost:5000/api';

// Generic fetch function with error handling
const fetchAPI = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

// Authentication API calls
export const registerUser = async (userData) => {
    return fetchAPI('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
};

export const loginUser = async (email, password) => {
    return fetchAPI('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
};

export const getUserProfile = async () => {
    return fetchAPI('/auth/profile', {
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        }
    });
};

export const updateUserProfile = async (userData) => {
    return fetchAPI('/auth/profile', {
        method: 'PUT',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};

export const changePassword = async (currentPassword, newPassword) => {
    return fetchAPI('/auth/change-password', {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })
    });
};

// Product API calls
export const fetchProducts = async (category = null) => {
    const endpoint = category ? `/products?category=${category}` : '/products';
    return fetchAPI(endpoint);
};

export const fetchProductById = async (id) => {
    return fetchAPI(`/products/${id}`);
};

export const fetchProductReviews = async (productId) => {
    return fetchAPI(`/products/${productId}/reviews`);
};

export const createReview = async (productId, reviewData) => {
    return fetchAPI(`/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });
};

// Wishlist API calls
export const fetchUserWishlist = async (userId) => {
    return fetchAPI(`/wishlists/${userId}`, {
        headers: getAuthHeader()
    });
};

export const addToWishlist = async (userId, productId) => {
    return fetchAPI('/wishlists', {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId })
    });
};

export const removeFromWishlist = async (userId, productId) => {
    return fetchAPI(`/wishlists/${userId}/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeader()
    });
};

// Order API calls
export const createOrder = async (orderData) => {
    return fetchAPI('/orders', {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
};

export const fetchUserOrders = async (userId) => {
    return fetchAPI(`/orders/user/${userId}`, {
        headers: getAuthHeader()
    });
};

export const fetchOrderById = async (orderId) => {
    return fetchAPI(`/orders/${orderId}`, {
        headers: getAuthHeader()
    });
};

// Product management API calls
export const createProduct = async (productData) => {
    return fetchAPI('/admin/products', {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
};

export const updateProduct = async (id, productData) => {
    return fetchAPI(`/admin/products/${id}`, {
        method: 'PUT',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
};

export const deleteProduct = async (id) => {
    return fetchAPI(`/admin/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
    });
};

// Admin API calls
export const fetchAllOrders = async () => {
    return fetchAPI('/admin/orders', {
        headers: getAuthHeader()
    });
};

export const updateOrderStatus = async (orderId, status) => {
    return fetchAPI(`/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });
};

export const fetchAllUsers = async () => {
    return fetchAPI('/admin/users', {
        headers: getAuthHeader()
    });
};