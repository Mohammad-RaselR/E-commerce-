import mongoose from "mongoose";

const storeTimeSchema = new mongoose.Schema({
  from: String,
  to: String,
  off: { type: Boolean, default: false },
});

const storeDetailsSchema = new mongoose.Schema({
  vendorId: {
    type: String,
    required: true,
  },
  fullName: String,
  email: String,
  location: String,
  phone: String,
  vendorImage: String,
  bannerImage: String,
  storeTime: {
    Monday: storeTimeSchema,
    Tuesday: storeTimeSchema,
    Wednesday: storeTimeSchema,
    Thursday: storeTimeSchema,
    Friday: storeTimeSchema,
    Saturday: storeTimeSchema,
    Sunday: storeTimeSchema,
  },
}, {
  timestamps: true,
});

export const StoreDetails = mongoose.model("StoreDetails", storeDetailsSchema);
