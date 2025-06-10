import User from '../models/User.js';

export const handleUserCreated = async (data) => {
  try {
    const { id, email_addresses, username, image_url, first_name, last_name } = data;

    // Get primary email
    const primaryEmailObj = email_addresses.find(email =>
      email.id === data.primary_email_address_id
    ) || email_addresses[0];
    const email = primaryEmailObj?.email_address || '';

    const newUser = new User({
      _id: id,
      email,
      username: `${first_name || ''} ${last_name || ''}`.trim() || username || 'User',
      image: image_url || null,
    });

    await newUser.save();
    console.log(`User created: ${newUser.email}`);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
