import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  product: Object,
  paymentStatus: {type:  Boolean, default: false},
  tranId: String
  
})

export default mongoose.model('Payment', paymentSchema);
