import express from 'express';
import { getUser, storeRecentSearchCities } from '../controllers/userController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', protectedRoute, getUser);
userRouter.post('/recent-cities', protectedRoute, storeRecentSearchCities);

export default userRouter;
