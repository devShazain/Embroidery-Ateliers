import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { registerUser, loginUser, getUserProfile, updateUserProfile, changePassword } from './api/auth.js';
import { getAllProducts, getProductById, getProductsByCategory } from './api/products.js';
import { getProductReviews, createProductReview } from './api/reviews.js';
import { getWishlistByUserId, addToWishlist, removeFromWishlist } from './api/wishlists.js';
import { createOrder, getOrderById, getOrdersByUserId } from './api/orders.js';
import { authenticateUser } from './middleware/auth.js';
import {
    isAdmin,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getAllUsers
} from './api/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

app.get('/api/auth/profile', authenticateUser, async (req, res) => {
    try {
        const profile = await getUserProfile(req.userId);
        if (!profile) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/auth/profile', authenticateUser, async (req, res) => {
    try {
        const updatedProfile = await updateUserProfile(req.userId, req.body);
        if (!updatedProfile) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/change-password', authenticateUser, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        await changePassword(req.userId, currentPassword, newPassword);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Product routes
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query;
        const products = category
            ? await getProductsByCategory(category)
            : await getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Review routes
app.get('/api/products/:id/reviews', async (req, res) => {
    try {
        const reviews = await getProductReviews(req.params.id);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products/:id/reviews', authenticateUser, async (req, res) => {
    try {
        const review = await createProductReview(req.params.id, req.userId, req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Wishlist routes
app.get('/api/wishlists/:userId', authenticateUser, async (req, res) => {
    try {
        // Ensure users can only access their own wishlist
        if (req.userId !== parseInt(req.params.userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const wishlist = await getWishlistByUserId(req.params.userId);
        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/wishlists', authenticateUser, async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Ensure users can only modify their own wishlist
        if (req.userId !== parseInt(userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const result = await addToWishlist(userId, productId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/wishlists/:userId/:productId', authenticateUser, async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Ensure users can only modify their own wishlist
        if (req.userId !== parseInt(userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const result = await removeFromWishlist(userId, productId);
        if (!result) {
            return res.status(404).json({ error: 'Wishlist item not found' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Order routes
app.post('/api/orders', authenticateUser, async (req, res) => {
    try {
        const orderData = req.body;

        // Ensure users can only create orders for themselves
        if (req.userId !== parseInt(orderData.user_id)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const order = await createOrder(orderData);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Order routes - specific routes first
app.get('/api/orders/user/:userId', authenticateUser, async (req, res) => {
    try {
        // Ensure users can only access their own orders
        if (req.userId !== parseInt(req.params.userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const orders = await getOrdersByUserId(req.params.userId);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Then general routes
app.get('/api/orders/:id', authenticateUser, async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Ensure users can only access their own orders
        if (req.userId !== order.user_id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin routes
app.post('/api/admin/products', authenticateUser, isAdmin, async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/admin/products/:id', authenticateUser, isAdmin, async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/admin/products/:id', authenticateUser, isAdmin, async (req, res) => {
    try {
        const result = await deleteProduct(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/orders', authenticateUser, isAdmin, async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/orders/:id/status', authenticateUser, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await updateOrderStatus(req.params.id, status);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/admin/users', authenticateUser, isAdmin, async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve React app for any other routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});