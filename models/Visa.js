import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const VisaSchema = new Schema({
  country: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  jobholders:[ { type: String, required: true }],
  businessman: [ { type: String, required: true }],
  student: [ { type: String, required: true }],
  doctor: [ { type: String, required: true }],
  unemployed: [ { type: String, required: true }],
  nonChild: [ { type: String, required: true }],
  housewife: [ { type: String, required: true }],
  retiredPerson: [ { type: String, required: true }],
  govtJobHolder: [ { type: String, required: true }],
  visaList: [
        {
          name: { type: String, required: true },
          price:  { type: String, required: true },
          validity: { type: Number, required: true },
          stayPeriod: { type: Number, required: true },
        },
      ],
    
  
});

export default mongoose.model('Visa', VisaSchema);