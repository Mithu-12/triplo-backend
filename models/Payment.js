import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  productData: Object,
  travelersData: Object,
  paymentType: String,
  travelers: Number,
  serviceType: String,
  price: Number,
  userId: String,
  paymentStatus: {type:  String, default: 'failed'},
  tranId: String

})

export default mongoose.model('Payment', paymentSchema);
