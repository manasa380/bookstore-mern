import Review from "../models/Review.js";
import Book from "../models/Book.js";

// ================= ADD REVIEW =================

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const bookId = req.params.bookId;

    const existing = await Review.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this book",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      book: bookId,
      rating,
      comment,
    });

    const reviews = await Review.find({
      book: bookId,
    });

    const average =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    await Book.findByIdAndUpdate(bookId, {
      rating: average.toFixed(1),
    });

    res.status(201).json({
      success: true,
      message: "Review Added",
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET REVIEWS =================

export const getReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      book: req.params.bookId,
    }).populate("user", "name");

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};