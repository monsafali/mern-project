import express from "express";

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const app = express();
const port = process.env.PORT || 5000;

// const _dirname = path.resolve();

// import { fileURLToPath } from "url";
// const _filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`server is started successfuly at port ${port}`);
});
