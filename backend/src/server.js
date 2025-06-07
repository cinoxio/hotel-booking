import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './configs/db.js';
import { clerkWebhooks } from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();
await connectCloudinary()


// ✅ FIXED: Proper CORS configuration
app.use(cors({
    origin: [
        'http://localhost:5173',  // Vite default port
        'http://localhost:5174',  // Alternative Vite port
        'http://127.0.0.1:5173',  // Alternative localhost format
    ],
    credentials: true,  // Important for Clerk authentication
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-clerk-auth-token'],
}));

// Webhook route FIRST (needs raw body for signature verification)
app.post(
    '/api/clerk',
    express.raw({ type: 'application/json' }),
    clerkWebhooks
);

// JSON middleware for other routes (AFTER webhook route)
app.use(express.json());

// ✅ ADDED: Better logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        headers: req.headers.authorization ? 'Auth present' : 'No auth',
        body: req.method !== 'GET' ? req.body : 'N/A'
    });
    next();
});

// Clerk Middleware for protected routes
app.use(clerkMiddleware());

// Basic route
app.get('/', (req, res) => res.send('API is smiling'));
app.use('/api/user', userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter)


app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
