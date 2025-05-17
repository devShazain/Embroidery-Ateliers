import jwt from 'jsonwebtoken';

// Secret key for JWT signing (in production, use environment variables)
const JWT_SECRET = 'embroidery_ateliers_jwt_secret';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

// Generate a JWT token for a user
export const generateToken = (user) => {
    // Create payload with user ID and email (avoid including sensitive data)
    const payload = {
        id: user.id,
        email: user.email
    };

    // Sign the token
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify a JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Return null if token is invalid or expired
    }
};