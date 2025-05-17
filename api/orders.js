import { query } from '../db.js';

// Get all orders
export const getAllOrders = async () => {
    try {
        const result = await query('SELECT * FROM orders ORDER BY created_at DESC', []);
        return result.rows;
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw err;
    }
};

// Get orders for a specific user
export const getUserOrders = async (userId) => {
    try {
        const result = await query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return result.rows;
    } catch (err) {
        console.error('Error fetching user orders:', err);
        throw err;
    }
};

// Get a single order by ID with its items
export const getOrderByIdWithItems = async (id) => {
    try {
        // Get the order
        const orderResult = await query('SELECT * FROM orders WHERE id = $1', [id]);

        if (orderResult.rows.length === 0) {
            return null;
        }

        const order = orderResult.rows[0];

        // Get the order items
        const itemsResult = await query(`
      SELECT oi.*, p.name, p.image_url 
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [id]);

        order.items = itemsResult.rows;

        return order;
    } catch (err) {
        console.error('Error fetching order:', err);
        throw err;
    }
};

// Create a new order with items
export const createOrder = async (orderData) => {
    const {
        user_id,
        total_amount,
        full_name,
        email,
        phone,
        address,
        city,
        postal_code,
        notes,
        items
    } = orderData;

    try {
        // Start a transaction
        await query('BEGIN');

        // Create the order
        const orderResult = await query(
            `INSERT INTO orders (
                user_id, total_amount, full_name, email, phone, 
                address, city, postal_code, notes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`,
            [
                user_id, total_amount, full_name, email, phone,
                address, city, postal_code, notes
            ]
        );

        const order = orderResult.rows[0];

        // Create order items
        for (const item of items) {
            await query(
                `INSERT INTO order_items (
                    order_id, product_id, quantity, price
                ) VALUES ($1, $2, $3, $4)`,
                [order.id, item.id, item.quantity, item.price]
            );
        }

        // Commit the transaction
        await query('COMMIT');

        return order;
    } catch (err) {
        // Rollback in case of error
        await query('ROLLBACK');
        console.error('Error creating order:', err);
        throw err;
    }
};

// Get order by ID with items
export const getOrderById = async (orderId) => {
    try {
        // Get order details
        const orderResult = await query(
            `SELECT * FROM orders WHERE id = $1`,
            [orderId]
        );

        if (orderResult.rows.length === 0) {
            return null;
        }

        const order = orderResult.rows[0];

        // Get order items
        const itemsResult = await query(
            `SELECT oi.*, p.name, p.image_url
             FROM order_items oi
             JOIN products p ON oi.product_id = p.id
             WHERE oi.order_id = $1`,
            [orderId]
        );

        order.items = itemsResult.rows;

        return order;
    } catch (err) {
        console.error('Error fetching order:', err);
        throw err;
    }
};

// Get orders by user ID
export const getOrdersByUserId = async (userId) => {
    try {
        const result = await query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        );

        return result.rows;
    } catch (err) {
        console.error('Error fetching user orders:', err);
        throw err;
    }
};

// Update an order's status
export const updateOrderStatus = async (id, status) => {
    try {
        const result = await query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
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