import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  parentCategoryId: { type: String, default: null },
});

export const Category = mongoose.model("Category", categorySchema);
