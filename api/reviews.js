import { query } from '../db.js';

// Get reviews for a product
export const getProductReviews = async (productId) => {
    try {
        const result = await query(`
            SELECT r.id, r.product_id, r.user_id, r.rating, r.comment, r.created_at,
                   u.full_name as user_name
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.product_id = $1
            ORDER BY r.created_at DESC
        `, [productId]);

        return result.rows;
    } catch (err) {
        console.error('Error fetching product reviews:', err);
        throw err;
    }
};

// Create a new review
export const createProductReview = async (productId, userId, reviewData) => {
    const { rating, comment } = reviewData;

    try {
        // Check if user already reviewed this product
        const existingReview = await query(
            'SELECT * FROM reviews WHERE product_id = $1 AND user_id = $2',
            [productId, userId]
        );

        if (existingReview.rows.length > 0) {
            // Update existing review
            const result = await query(
                `UPDATE reviews 
                 SET rating = $1, comment = $2, created_at = CURRENT_TIMESTAMP
                 WHERE product_id = $3 AND user_id = $4
                 RETURNING *`,
                [rating, comment, productId, userId]
            );
            return result.rows[0];
        } else {
            // Create new review
            const result = await query(
                `INSERT INTO reviews (product_id, user_id, rating, comment)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [productId, userId, rating, comment]
            );
            return result.rows[0];
        }
    } catch (err) {
        console.error('Error creating/updating review:', err);
        throw err;
    }
};