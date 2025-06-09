import { clerkClient } from '@clerk/express'
import User from '../models/User.js'

const protectRoute = async (req, res, next) => {
  try {

    const {userId} = req.auth()

      console.log('🔍 Clerk userId from req.auth():', userId);

    if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated - no userId from Clerk',
            });
     }


    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify token with Clerk
    const sessionToken = await clerkClient.verifyToken(token);

    if (!sessionToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user from database using Clerk user ID
    const user = await User.findOne({ userId: sessionToken.sub });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    // Attach user to request object
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
