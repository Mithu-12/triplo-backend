import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const VisaSchema = new Schema({
  country: { type: String, required: true },
  nationality: { type: String, required: true },
  travelers: { type: Number, required: true },
  details: [
    {
      type: { type: String, required: true },
      image: { type: String, required: true },
      jobholders:[ { type: String, required: true }],
      businessman: [ { type: String, required: true }],
      student: [ { type: String, required: true }],
      visaList: [
        {
          type: [{ type: String, required: true }],
          price: [ { type: String, required: true }],
          validity: { type: Number, required: true },
          stayPeriod: { type: Number, required: true },
        },
      ],
    },
  ],
});

export default mongoose.model('Visa', VisaSchema);