import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/ProtectRoute.js";

const MessageRouter = express.Router();

MessageRouter.post("/send/:id", protectRoute, sendMessage);

export default MessageRouter;
