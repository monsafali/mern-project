import express from "express";
import dotenv from "dotenv";
dotenv.config();

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
