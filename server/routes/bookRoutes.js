import express from "express";
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Admin Routes
router.post("/", protect, admin, addBook);
router.put("/:id", protect, admin, updateBook);
router.delete("/:id", protect, admin, deleteBook);

export default router;