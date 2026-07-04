import express from "express";

import {
  addReview,
  getReviews,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:bookId", getReviews);

router.post("/:bookId", protect, addReview);

export default router;