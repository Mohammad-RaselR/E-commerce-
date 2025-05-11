import { Product } from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";
// import slugify from "slugify";
export const createProduct = async (req, res, next) => {
  try {
  

    
    
    console.log(req.body)
    
    const newProduct = await Product.create(req.body)
    return res.status(200).json(newProduct)

    res.status(201).json({ message: "Product created", data: newProduct });
  } catch (err) {
    console.log(req.body)
    
      // res.status(500).json({ error: err.message, message: "Product not created" });
      next(err);
    
  }
};
export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.params.id });
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(req.params.id, product.vendorId);
    console.log(req.user.id);
    const updated = await Product.findOneAndUpdate(
      {productId: req.params.productId},
      req.body,
      { new: true }
    );
  
    
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ productId: req.params.productId });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const vendorId = req.params.id;
    console.log(vendorId);

    const product = await Product.find({vendorId});
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  // try {
  //   const products = await Product.findMany();
  //   res.json({ data: products });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
};

// export const getAallProducts = async (req, res) => {  
//   try {
//     const products = await Product.find();
//     res.json({ data: products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
export const getallVendorProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
