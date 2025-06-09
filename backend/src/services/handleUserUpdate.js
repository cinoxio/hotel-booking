
export const handleUserUpdated=async(data)=> {
  try {
    const {
      id,
      email_addresses,
      username,
      image_url
    } = data;

    // Get primary email
    const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id);

    const updateData = {
      email: primaryEmail?.email_address || '',
      username: `${first_name || ''} ${last_name || ''}`.trim() || username,
      image: image_url || null,
      updatedAt: new Date()
    };

    const updatedUser = await User.findByIdAndUpdate(
      id, // Direct _id lookup since we use Clerk ID as _id
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.warn(`User not found for update: ${id}`);
      return;
    }

    console.log(`User updated in database: ${updatedUser.email}`);

  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
