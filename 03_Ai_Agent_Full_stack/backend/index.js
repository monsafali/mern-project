import express from "express";

import cors from "cors";
import dbConnect from "./config/database.js";
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

dbConnect().then(() => {
  app.listen(port, () => {
    console.log("Server start succesfuly at port", port);
  });
});
