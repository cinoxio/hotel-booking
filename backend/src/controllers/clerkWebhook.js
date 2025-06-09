import { Webhook } from 'svix'
import User from '../models/User.js';
import {handleUserCreated} from "../services/handleUserCreate.js"
import {handleUserDeleted} from "../services/handleUserDelete.js"
import {handleUserUpdated} from "../services/handleUserUpdate.js"
// Middleware to verify Clerk webhook signature
export const clerkWebhooks = async(req, res) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
    }

    // Get the headers
    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: 'Error occurred -- no svix headers' });
    }

    // Get the body
    const body = JSON.stringify(req.body);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

     const headers = {
         'svix-id': svix_id,
         'svix-timestamp': svix_timestamp,
         'svix-signature': svix_signature,
     }

    const evt = wh.verify(body, headers);

    const { data, type } = evt;

    console.log(`Webhook received: ${type}`);

    switch (type) {
      case 'user.created':
        await handleUserCreate(data);
        break;

      case 'user.updated':
        await handleUserUpdated(data);
        break;

      case 'user.deleted':
        await handleUserDeleted(data);
        break;

      default:
        console.log(`⚠️ Unhandled webhook type: ${type}`);
        break;
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Error processing webhook' });
  }
}

