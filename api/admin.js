import { query } from '../db.js';

// Check if user is admin
export const isAdmin = async (userId) => {
    try {
        const result = await query(
            'SELECT is_admin FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return false;
        }

        return result.rows[0].is_admin === true;
    } catch (err) {
        console.error('Error checking admin status:', err);
        return false;
    }
};

// Create a new product
export const createProduct = async (productData) => {
    const {
        name,
        description,
        price,
        image_url,
        category,
        color,
        fabric_details,
        care_instructions,
        additional_images,
        in_stock
    } = productData;

    try {
        const result = await query(
            `INSERT INTO products (
                name, description, price, image_url, category, 
                color, fabric_details, care_instructions, additional_images, in_stock
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`,
            [
                name, description, price, image_url, category,
                color, fabric_details, care_instructions, additional_images, in_stock
            ]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Error creating product:', err);
        throw err;
    }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
    const {
        name,
        description,
        price,
        image_url,
        category,
        color,
        fabric_details,
        care_instructions,
        additional_images,
        in_stock
    } = productData;

    try {
        const result = await query(
            `UPDATE products SET 
                name = $1, 
                description = $2, 
                price = $3, 
                image_url = $4, 
                category = $5, 
                color = $6, 
                fabric_details = $7, 
                care_instructions = $8, 
                additional_images = $9, 
                in_stock = $10,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $11 
            RETURNING *`,
            [
                name, description, price, image_url, category,
                color, fabric_details, care_instructions, additional_images, in_stock,
                id
            ]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error updating product:', err);
        throw err;
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const result = await query(
            'DELETE FROM products WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return { id: result.rows[0].id };
    } catch (err) {
        console.error('Error deleting product:', err);
        throw err;
    }
};

// Get all orders (for admin)
export const getAllOrders = async () => {
    try {
        const result = await query(`
            SELECT o.*, u.email, u.full_name as user_full_name
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        `);

        return result.rows;
    } catch (err) {
        console.error('Error fetching all orders:', err);
        throw err;
    }
};

// Update order status
export const updateOrderStatus = async (id, status) => {
    try {
        const result = await query(
            'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error updating order status:', err);
        throw err;
    }
};

// Get all users (for admin)
export const getAllUsers = async () => {
    try {
        const result = await query(`
            SELECT id, email, full_name, phone, city, is_admin, created_at
            FROM users
            ORDER BY created_at DESC
        `);

        return result.rows;
    } catch (err) {
        console.error('Error fetching all users:', err);
        throw err;
    }
};