import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from "./configs/db.js";
import { clerkWebhooks } from "./controllers/clerkWebhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable cross-origin Resource sharing
app.use(cors());

// Webhook route FIRST (needs raw body for signature verification)
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// JSON middleware for other routes (AFTER webhook route)
app.use(express.json());

// Clerk Middleware for protected routes
app.use(clerkMiddleware());

// Basic route
app.get('/', (req, res) => res.send("API is smiling"));

app.listen(PORT, async () => {
    await connectDB(); // Ensure DB connection before starting
    console.log(`Server running on port ${PORT}`);
});
