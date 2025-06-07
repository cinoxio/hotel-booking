// import express from 'express';
// import { getUser, storeRecentSearchCities } from '../controllers/userController.js';
// import { protectedRoute } from '../middlewares/authMiddleware.js';

// const userRouter = express.Router();

// userRouter.get('/', protectedRoute, getUser);
// userRouter.post('/recent-cities', protectedRoute, storeRecentSearchCities);

// export default userRouter;

import express from 'express';
import { protectedRoute } from '../middlewares/authMiddleware.js';
import { getUser, storeRecentSearchCities } from '../controllers/userController.js';

const router = express.Router();

// Add logging to see if routes are being registered
console.log('📋 Registering user routes...');

router.get('/', (req, res, next) => {
    console.log('🛣️ GET /api/user route hit');
    next();
}, protectedRoute, getUser);

router.post('/recent-cities', protectedRoute, storeRecentSearchCities);

console.log('✅ User routes registered');

export default router;
