import User from '../models/user-model.js';
// Middleware to check if user is authenticated
export const protectRoute = async (req, res, next) => {
    try {
        console.log('🔐 Auth middleware started');
        console.log('🔐 Authorization header:', req.headers.authorization);
        console.log('🔐 req.auth available:', typeof req.auth);
        // Let's see what req.auth() actually returns
        const { userId } = req.auth();
        console.log('🔐 Full auth result:', userId);

        if (!userId) {
            console.log('❌ No userId found in req.auth()');
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access. Please log in.',
            });
        }

        console.log('🔍 Looking for user in database:', userId);
        const user = await User.findById(userId);
        console.log('🔍 User found in DB:', user ? 'Yes' : 'No');

        if (!user) {
            console.log('❌ User not found in database');
            return res.status(401).json({
                success: false,
                message: 'User not found.',
            });
        }

        console.log('✅ User authenticated:', user.username || user.email);
        req.user = user;
        next();
    } catch (error) {
        console.error('❌ Auth middleware error:', error.message);
        console.error('❌ Full error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};


export const protect = async (req, res, next) => {
    try {
        // Check if user is authenticated via Clerk
        if (!req.auth?.userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access. Please log in.',
            });
        }
        // Add userId to request for easy access
        req.userId = req.auth.userId;

        console.log('✅ User authenticated:', req.userId);
        next();
    } catch (error) {
        console.error('❌ Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error',
            error: error.message,
        });
    }
};
