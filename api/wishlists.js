import { query } from '../db.js';

// Get wishlist items for a user
export const getWishlistByUserId = async (userId) => {
    try {
        const result = await query(`
      SELECT w.id, w.user_id, w.product_id, w.created_at, 
             p.name, p.description, p.price, p.image_url, p.category
      FROM wishlists w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = $1
      ORDER BY w.created_at DESC
    `, [userId]);

        return result.rows;
    } catch (err) {
        console.error('Error fetching wishlist:', err);
        throw err;
    }
};

// Add an item to wishlist
export const addToWishlist = async (userId, productId) => {
    try {
        // Check if item already exists in wishlist
        const checkResult = await query(
            'SELECT * FROM wishlists WHERE user_id = $1 AND product_id = $2',
            [userId, productId]
        );

        if (checkResult.rows.length > 0) {
            // Item already in wishlist
            return checkResult.rows[0];
        }

        // Add to wishlist
        const result = await query(
            'INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) RETURNING *',
            [userId, productId]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        throw err;
    }
};

// Remove an item from wishlist
export const removeFromWishlist = async (userId, productId) => {
    try {
        const result = await query(
            'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2 RETURNING *',
            [userId, productId]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        throw err;
    }
};