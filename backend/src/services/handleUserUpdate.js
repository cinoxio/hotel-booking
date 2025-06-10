import User from '../models/User.js';

export const handleUserUpdated = async (data) => {
    try {
        const {
            id,
            email_addresses,
            username,
            image_url,
            first_name,
            last_name,
        } = data;

        const primaryEmailObj =
            email_addresses.find(
                (email) => email.id === data.primary_email_address_id
            ) || email_addresses[0];
        const email = primaryEmailObj?.email_address || '';

        const updateData = {
            email,
            username:
                `${first_name || ''} ${last_name || ''}`.trim() || username,
            image: image_url || null,
            updatedAt: new Date(),
        };

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            console.warn(`User not found: ${id}`);
            return;
        }

        console.log(`User updated: ${updatedUser.email}`);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
