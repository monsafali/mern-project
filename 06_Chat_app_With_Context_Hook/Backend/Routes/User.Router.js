import express from "express";
import { getUserForSidebar } from "../controllers/User.controller.js";
import protectRoute from "../middleware/ProtectRoute.js";

const UserRouter = express.Router();

UserRouter.get("/", protectRoute, getUserForSidebar);

export default UserRouter;
