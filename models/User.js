import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  userName: String,
  email: String,
  phone: String,
  gender: String,
  password: String,
  googleId: String,
  facebookId: String,
  picture: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  travelers: [
    {
      type: String,
      ref: 'Traveler',
    },
  ],
  // travelers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Traveler',
  //   },
  // ],
},
{timestamps: true});

export default mongoose.model('User', userSchema);
