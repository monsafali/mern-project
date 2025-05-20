import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in get products", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all field" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Data saved successfuly",
        data: newProduct,
      });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({ success: false, message: "Server error " });
  }
};

export const updateProduct = async (req, res) => {
  let { id } = req.params;
  let product = req.body;

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Product update successfuly",
      data: updateProduct,
    }); // <-- Add data
  } catch (error) {
    res.status(404).json({ success: false, message: "Server error" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Product update successfuly" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
