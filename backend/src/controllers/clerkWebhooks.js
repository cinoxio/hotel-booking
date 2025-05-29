import { Webhook } from 'svix';
import User from '../models/user-model.js';

export const clerkWebhooks = async (req, res) => {
    try {
        const wbHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        // Getting Headers
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        // Verify Headers
        await wbHook.verify(JSON.stringify(req.body), headers);
        // Getting data from request body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email.address,
            username: data.first_name + ' ' + data.last_name,
            image: data.image_url,
        };

        // Switch Cases for different Events

        switch (type) {
            case 'user.created': {
                await User.create(userData);
                break;
            }
            case 'user.updated': {
                await User.findByIdAndUpdate(data.id, userdata);
                break;
            }
            case 'user.deleted':
                {
                    await User.findByIdAndDelete(data.id);
                    break;
                }
             default:break;
                }
                res.json({
                    success: true,
                    message: 'Webhook received and processed successfully.',
             });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
