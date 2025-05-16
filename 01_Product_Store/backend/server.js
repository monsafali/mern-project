import exress from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const app = exress();

app.use(exress.json());
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server start at port 5000");
});
