import User from "../models/User.js"

export const protectRoute = async (req, res, next) => {
    try {
        const { userId } = req.auth();
        console.log('🔍 Clerk userId from req.auth():', userId);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated - no userId from Clerk',
            });
        }

        // Find user by Clerk ID (which is stored as _id in your User model)
        const user = await User.findById(userId);
        console.log('👤 Found user in database:', user ? `Yes (${user._id})` : 'No');

        if (!user) {
            console.log('❌ User not found in database for Clerk ID:', userId);
            return res.status(401).json({
                success: false,
                message: 'User not found in database',
            });
        }

        console.log('✅ User authenticated successfully:', user._id);
        req.user = user;
        next();
    } catch (error) {
        console.error('❌ Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication failed',
        });
    }
};
