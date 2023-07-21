import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookScheduleSchema = new Schema({
  traveler: [
    {
      title: { type: String, required: true },
      gender: { type: String, required: true },
      name: { type: String, required: true },
      surName: { type: String, required: true },
      dob: {
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
      },
      nationality: { type: String, required: true },
      number: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      document: { type: String, required: true },
    },
  ],
  deliveryMethod: {
    type: String,
    enum: ['dropoff', 'pick-up'],
    required: true,
  },
  address: {
    type: String,
    required: function () {
      return this.deliveryMethod === 'pick-up';
    },
  },
  price: {
    type: Number,
    default: function () {
      return this.deliveryMethod === 'pick-up' ? 10 : 0;
    },
  },
  pickupDate: {
    type: Date,
    required: function () {
      return this.deliveryMethod === 'pick-up';
    },
  },
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'paypal', 'bank-transfer'], // Add the available payment methods here
    required: true,
  },
});

export default mongoose.model('BookSchedule', BookScheduleSchema);
