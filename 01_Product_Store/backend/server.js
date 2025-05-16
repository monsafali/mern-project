import exress from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
const app = exress();

app.use(exress.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in get products", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all field" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, message: "Data saved successfuly" });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({ success: false, message: "Server error " });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product Not found" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  let { id } = req.params;
  let product = req.body;

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
});

app.listen(5000, () => {
  connectDB();
  console.log("Server start at port 5000");
});
