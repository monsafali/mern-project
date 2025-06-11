import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routers/auth.route.js";
import dbconnection from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  dbconnection();
  console.log(`Server is running on port ${PORT}`);
});
