import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getUser, storeRecentSearchCities } from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.get('/', protectRoute, getUser);

userRouter.post('/store-recent-search', protectRoute, storeRecentSearchCities);

export default userRouter;
