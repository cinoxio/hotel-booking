import User from '../models/user-model.js';

// // Middleware to check if user is authenticated
// export const protectedRoute = async (req, res, next) => {
//     try {
//         const { userId } = req.auth();

//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized access. Please log in.',
//             });
//         }

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'User not found.',
//             });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// };



// Middleware to check if user is authenticated
export const protectedRoute = async (req, res, next) => {
    try {
        console.log('🔐 Auth middleware started');
        console.log('🔐 req.auth available:', typeof req.auth);

        const { userId } = req.auth();
        console.log('🔐 UserId extracted:', userId);

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
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
