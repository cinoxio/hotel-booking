import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
      required: true,
    ref: "User",
  },
//   priceCategory: {
//     type: Number,
//     required: true,
//   },
//   rooms: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Room',
//   },
}, { timestamps: true});


// Only create if it doesn't exist
const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
export default Hotel;
