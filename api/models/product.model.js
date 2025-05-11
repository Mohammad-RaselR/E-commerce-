import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // slug: { type: String, unique: true },
<<<<<<< HEAD
  category: {type:String, required: true},
=======
  category: String,
>>>>>>> ef858a76aba191f940ce8c5cc734b2341b060e56
  categoryId: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: String,
  vendorId: {
    type: String,
<<<<<<< HEAD
    required: true,
=======
    requuired: true,
>>>>>>> ef858a76aba191f940ce8c5cc734b2341b060e56
    // ref: "Vendor",
    // required: true
  },
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", productSchema);
