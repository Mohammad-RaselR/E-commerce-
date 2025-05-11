import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // slug: { type: String, unique: true },
  category: {type:String, required: true},
  categoryId: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: String,
  vendorId: {
    type: String,
    required: true,
    // ref: "Vendor",
    // required: true
  },
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", productSchema);
