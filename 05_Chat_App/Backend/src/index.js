import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { conntectDb } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  conntectDb();
  console.log("Server is runig on http://localhost:5001/");
});
