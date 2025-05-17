import { query } from '../db.js';

// Get all products
export const getAllProducts = async () => {
    try {
        const result = await query(`
            SELECT * FROM products
            ORDER BY created_at DESC
        `);
        return result.rows;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const result = await query(`
            SELECT * FROM products
            WHERE id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error fetching product:', err);
        throw err;
    }
};

// Get products by category
export const getProductsByCategory = async (category) => {
    try {
        const result = await query(`
            SELECT * FROM products
            WHERE category = $1
            ORDER BY created_at DESC
        `, [category]);

        return result.rows;
    } catch (err) {
        console.error('Error fetching products by category:', err);
        throw err;
    }
};

// Create a new product (for admin)
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
        const result = await query(`
            INSERT INTO products (
                name, description, price, image_url, category,
                color, fabric_details, care_instructions, additional_images, in_stock
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `, [
            name, description, price, image_url, category,
            color, fabric_details, care_instructions, additional_images, in_stock
        ]);

        return result.rows[0];
    } catch (err) {
        console.error('Error creating product:', err);
        throw err;
    }
};

// Update a product (for admin)
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
        const result = await query(`
            UPDATE products
            SET name = $1, description = $2, price = $3, image_url = $4, category = $5,
                color = $6, fabric_details = $7, care_instructions = $8, 
                additional_images = $9, in_stock = $10, updated_at = CURRENT_TIMESTAMP
            WHERE id = $11
            RETURNING *
        `, [
            name, description, price, image_url, category,
            color, fabric_details, care_instructions, additional_images, in_stock, id
        ]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error updating product:', err);
        throw err;
    }
};

// Delete a product (for admin)
export const deleteProduct = async (id) => {
    try {
        const result = await query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING id
        `, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error deleting product:', err);
        throw err;
    }
};