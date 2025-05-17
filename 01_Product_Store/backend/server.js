import exress from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const app = exress();
const port = process.env.PORT || 5000;

app.use(exress.json());
app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`server is started successfuly at port ${port}`);
});
