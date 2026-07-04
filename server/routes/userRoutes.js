import express from "express";
import { getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Only
router.get("/", protect, admin, getUsers);

export default router;