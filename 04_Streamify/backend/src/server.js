import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routers/auth.route.js";
import userRoutes from "./routers/user.route.js";
import dbconnection from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  dbconnection();
  console.log(`Server is running on port ${PORT}`);
});
