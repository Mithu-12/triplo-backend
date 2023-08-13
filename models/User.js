import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  picture: String,
  isAdmin: {
    type: Boolean,
    default: false,
  }
},
{timestamps: true});

export default mongoose.model('User', userSchema);
