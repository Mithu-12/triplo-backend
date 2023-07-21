import mongoose from "mongoose";
import { Schema } from "mongoose";

const PackageModel  = new Schema({
    package:{type: String},
    image: [{
        img1: { type: String },
        img2: { type: String }
      }],
    name:{type: String, require: true},
    description: {type: String, require: true},
    price: { type: Number },
    rating: {type: Number, require: true},
    duration: {type: String, require: true},
    packageIncludes: [{
        include1: { type: String },
        include2: { type: String }
      }],
    itinerary: [{
        day1: { type: String },
        day2: { type: String },
        day3: { type: String },
        day4: { type: String }
      }],
    PicUpNote: {type: String, require: true},
    highlight: [{
        day1: { type: String },
        day2: { type: String },
        day3: { type: String },
        day4: { type: String }
      }],
      cancelationPolicy: [{
        policy1: { type: String },
        policy2: { type: String },
        policy3: { type: String },
        policy4: { type: String },
        policy5: { type: String }
      }],
    tax: {type: String, require: true},
    generalCondition: {type: String, require: true},
    deluxe: [{
        validFrom: {type: Date, require: true},
        validTo: {type: Date, require: true},
        departs: {type: String, require: true },
    }],
    hotels: {type: String, require: true}
})

export default mongoose.model("Package", PackageModel)