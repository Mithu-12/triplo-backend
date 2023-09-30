import mongoose, { Schema } from 'mongoose';

const travelerSchema = new Schema({
  title: String,
  gender: String,
  firstName: String,
  lastName: String,
  birthDay: String,
  birthMonth: String,
  birthYear: String,
  nationality: String,
  passportExDay: String,
  passportExMonth: String,
  passportExYear: String,
  passportNumber: String,
  countryNumberCode: String,
  mobileNumber: Number,
  email: String,
  address: String,
  images: [{ type: String }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  userId: String,
  travelerId: {
    type: String,
    unique: true,
  },
});

export default mongoose.model('Traveler', travelerSchema);
