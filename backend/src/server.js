import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from "./configs/db.js";
import {clerkWebhooks} from "./controllers/clerkWebhooks.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Enable cross-origin Resource sharing
app.use(cors());


// JSON middleware for other routes
app.use(express.json());
// Clerk Middleware for protected routes (after webhook route)
app.use(clerkMiddleware())
// Webhook route BEFORE express.json() middleware
// This ensures we get the raw body for signature verification
app.post("/api/clerk", clerkWebhooks);

// Basic route
app.get('/', (req, res) => res.send("API is smiling"));

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`)
  }
)
