import jwt from 'jsonwebtoken';

// Secret key for JWT verification (should match the one used for signing)
const JWT_SECRET = 'embroidery_ateliers_jwt_secret';

// Middleware to authenticate requests
export const authenticateUser = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add the user ID to the request object
        req.userId = decoded.id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Middleware to check if user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        // This is a placeholder - you would typically check a role field in your users table
        // For now, we'll consider user with ID 1 as admin
        if (req.userId === 1) {
            next();
        } else {
            res.status(403).json({ error: 'Access denied: Admin privileges required' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};