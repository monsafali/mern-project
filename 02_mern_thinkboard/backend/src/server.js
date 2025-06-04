import express from "express";
import dotenv from "dotenv";
dotenv.config();

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // this middleware will parse JSON bodies: req.body
// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`REq path is ${req.path}, and req methoed is ${req.method}`);
//   console.log("men pherser render hogya hon");
//   next();
// });

app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
