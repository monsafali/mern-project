import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { conntectDb } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  conntectDb();
  console.log("Server is runig on http://localhost:5001/");
});
