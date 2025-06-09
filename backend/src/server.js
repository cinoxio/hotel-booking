import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import { clerkWebhooks } from './controllers/clerkWebhook.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import { clerkMiddleware } from '@clerk/express';


const app = express();
const PORT = process.env.PORT || 5000;

connectCloudinary()
connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔧 IMPORTANT: Raw body for webhooks BEFORE general JSON middleware

app.use('/api/clerk', express.json(), clerkWebhooks);
// JSON middleware for other routes
app.use(express.json());

// 🔧 Webhook route MUST be BEFORE Clerk middleware
//  app.post('/api/clerk', clerkWebhooks);

// Clerk Middleware AFTER webhook routes
app.use(clerkMiddleware());

// Basic route
app.get('/', (req, res) => res.send('API is smiling'));


// Other routes
app.use('/api/user', userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter)

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log('🔧 Webhook endpoint available at: /api/clerk');
});
