import { Category } from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find();
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
