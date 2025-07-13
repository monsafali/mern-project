import dotenv from "dotenv";
dotenv.config();

import express from "express";
import AuthRouter from "./Routes/Auth.route.js";
import dbConnection from "./db/DbConnection.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
  dbConnection();
  console.log("Server is start succesfuly", PORT);
});
