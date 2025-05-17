import bcrypt from 'bcrypt';
import { query } from '../db.js';
import jwt from 'jsonwebtoken';

// Secret key for JWT signing (in production, use environment variables)
const JWT_SECRET = 'embroidery_ateliers_jwt_secret';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

// Generate a JWT token for a user
const generateToken = (user) => {
    // Create payload with user ID and email (avoid including sensitive data)
    const payload = {
        id: user.id,
        email: user.email
    };

    // Sign the token
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Number of salt rounds for bcrypt
const SALT_ROUNDS = 10;

// Register a new user
export const registerUser = async (userData) => {
    const { email, password, full_name, phone, address, city, postal_code } = userData;

    try {
        // Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new Error('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Insert the new user
        const result = await query(
            `INSERT INTO users (email, password, full_name, phone, address, city, postal_code) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, email, full_name, created_at`,
            [email, hashedPassword, full_name, phone, address, city, postal_code]
        );

        const newUser = result.rows[0];

        // Generate JWT token
        const token = generateToken(newUser);

        return {
            user: newUser,
            token
        };
    } catch (err) {
        console.error('Error registering user:', err);
        throw err;
    }
};

// Login a user
export const loginUser = async (email, password) => {
    try {
        // Find user by email
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            throw new Error('Invalid email or password');
        }

        const user = result.rows[0];

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }

        // Create a user object without the password
        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            created_at: user.created_at
        };

        // Generate JWT token
        const token = generateToken(userWithoutPassword);

        return {
            user: userWithoutPassword,
            token
        };
    } catch (err) {
        console.error('Error logging in:', err);
        throw err;
    }
};

// Get user profile
export const getUserProfile = async (userId) => {
    try {
        const result = await query(
            'SELECT id, email, full_name, phone, address, city, postal_code, created_at FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error fetching user profile:', err);
        throw err;
    }
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
    const { full_name, phone, address, city, postal_code } = userData;

    try {
        const result = await query(
            `UPDATE users 
       SET full_name = $1, phone = $2, address = $3, city = $4, postal_code = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, email, full_name, phone, address, city, postal_code, created_at`,
            [full_name, phone, address, city, postal_code, userId]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error updating user profile:', err);
        throw err;
    }
};

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        // Get current user with password
        const userResult = await query('SELECT * FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            throw new Error('User not found');
        }

        const user = userResult.rows[0];

        // Verify current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            throw new Error('Current password is incorrect');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        // Update the password
        await query(
            'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [hashedPassword, userId]
        );

        return true;
    } catch (err) {
        console.error('Error changing password:', err);
        throw err;
    }
};