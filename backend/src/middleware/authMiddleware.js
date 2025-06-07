import User from '../models/user-model.js';

// Middleware to check if user is authenticated
export const protectedRoute = async (req, res, next) => {
    try {
        // ✅ FIXED: Remove parentheses - req.auth is an object, not a function
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access. Please log in.',
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

