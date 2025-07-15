import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import AuthRouter from "./Routes/Auth.route.js";
import dbConnection from "./db/DbConnection.js";
import MessageRouter from "./Routes/message.routes.js";
import UserRouter from "./Routes/User.Router.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);
app.use("/api/users", UserRouter);

app.listen(PORT, () => {
  dbConnection();
  console.log("Server is start succesfuly", PORT);
});
