import express from "express";
import { login, Logout, signup } from "../controllers/auth.controller.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", Logout);

export default AuthRouter;
