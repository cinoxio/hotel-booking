import { Webhook } from 'svix';
import User from '../models/user-model.js';
export const clerkWebhooks = async (req, res) => {
    try {
        // Create svix instance with clerk webhook secret
        const wbHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        // Verify webhook and get verified event data
        const evt = wbHook.verify(req.body, headers);
        const { data, type } = evt;

        // Prepare user data with safe access to nested properties
        const userData = {
            _id: data.id,
            email:
                data.email_addresses?.[0]?.email_address ||
                data.primary_email_address?.email_address ||
                '',
            username:
                `${data.first_name || ''} ${data.last_name || ''}`.trim() ||
                data.username ||
                'User',
            image: data.image_url || null,
        };

        // Switch Cases for different Events
        switch (type) {
            case 'user.created': {
                await User.create(userData);
                break;
            }
            case 'user.updated': {
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                console.log(`Unhandled webhook type: ${type}`);
                break;
        }

        res.status(200).json({
            success: true,
            message: 'Webhook received and processed successfully.',
        });
    } catch (error) {
        console.error('Webhook error:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

