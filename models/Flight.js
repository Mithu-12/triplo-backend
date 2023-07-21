import mongoose from 'mongoose';
const { Schema } = mongoose;


const personSchema = new Schema({
  type: { type: String, required: true },
  options: [{ type: String }],
});

const flightSchema = new Schema({
  type: { type: String, required: true }, // e.g., one way, round trip, multi city
  from: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
  },
  to: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
  },
  persons: {
    adults: { type: Number, required: true }, // number of adults
    children: { type: Number, required: true }, // number of children
    infants: { type: Number, required: true }, // number of infants
    cabinClass: { type: String, required: true }, // e.g., Economy, Business,First Class
  },
  date: { type: String, required: true }, // date with day
  returnTrip: {
    selected: { type: Boolean, default: false },
    date: { type: String, default: null },
  },
});



export default mongoose.model('Flight', flightSchema);
