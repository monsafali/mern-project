import { Router } from "express";
import { ProtectRoute, requiredAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", ProtectRoute, requiredAdmin, createSong);
export default router;
