import express from "express"
import "dotenv/config"
import cors from "cors";
import { connectDB } from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express';
import {clerkWebhooks} from "./controllers/clerkWebhooks.js";

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send("API is smiling"));

app.use(express.json());
// Clerk Middleware to protected route

app.use(clerkMiddleware())

// API  to listen to clerk WebHooks
app.use("api/clerk", clerkWebhooks)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
       connectDB();
    console.log(`Server running on port ${PORT}`)
  }
)



