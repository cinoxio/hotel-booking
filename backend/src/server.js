import express from "express"
import "dotenv/config"
import cors from "cors";
import { connectDB } from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express';
import {clerkWebhooks} from "./controllers/clerkWebhooks.js";

const app = express();
app.use(cors());  //Enable cross-origin Resource sharing

// Clerk Middleware to protected route
app.use(express.json());
app.use(clerkMiddleware())


const PORT = process.env.PORT || 3000;


// API  to listen to clerk WebHooks
app.use("/api/clerk", clerkWebhooks)

lnhokbvcd\][p  ][kp 0]7app.get('/', (req, res) => res.send("API is smiling"));
"?:> "
6

app.listen(PORT, () => {
       connectDB();
    console.log(`Server running on port ${PORT}`)
  }
)


j0
