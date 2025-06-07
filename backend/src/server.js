import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import { clerkWebhooks } from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import { clerkMiddleware } from '@clerk/express';

connectDB()
connectCloudinary()

const app = express();
const PORT = process.env.PORT || 3000;
// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
// JSON middleware
app.use(express.json());
// Webhook route FIRST
app.post('/api/clerk', clerkWebhooks);

// ✅ Clerk Middleware with error handling
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
