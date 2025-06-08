import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getUser, storeRecentSearchCities } from '../controllers/userController.js';

const userRouter = express.Router();

// Add logging to see if routes are being registered
console.log('📋 Registering user routes...');

userRouter.get('/', protectRoute, getUser);

userRouter.post('/store-recent-search', protectRoute, storeRecentSearchCities);

console.log('✅ User routes registered');

export default userRouter;
