import express from "express";
import { GetMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/ProtectRoute.js";

const MessageRouter = express.Router();

MessageRouter.post("/send/:id", protectRoute, sendMessage);
MessageRouter.get("/:id", protectRoute, GetMessage);

export default MessageRouter;
