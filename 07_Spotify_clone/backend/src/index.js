import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { fileupload } from "express-fileupload";
import path from "path";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.json(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 100 * 1024 * 1024, //10 mb max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port" + PORT);
});
