import { Router } from "express";
import { ProtectRoute, requiredAdmin } from "../middleware/auth.middleware";
import { createSong, deleteSong } from "../controller/admin.controller.js";

const router = Router();

router.post("/songs", ProtectRoute, requiredAdmin, createSong);
router.delete("/songs/:id", ProtectRoute, requiredAdmin, deleteSong);
export default router;
