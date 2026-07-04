import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";


// =====================
// ADD TO WISHLIST
// =====================

export const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Book already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      book: bookId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =====================
// GET MY WISHLIST
// =====================

export const getWishlist = async (req, res) => {

  try {

    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("book");

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// =====================
// REMOVE
// =====================

export const removeWishlist = async (req, res) => {

  try {

    await Wishlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// =====================
// MOVE TO CART
// =====================

export const moveToCart = async (req, res) => {

  try {

    const item = await Wishlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    const already = await Cart.findOne({
      user: req.user._id,
      book: item.book,
    });

    if (already) {

      already.quantity += 1;

      await already.save();

    } else {

      await Cart.create({
        user: req.user._id,
        book: item.book,
        quantity: 1,
      });

    }

    await Wishlist.findByIdAndDelete(item._id);

    res.status(200).json({
      success: true,
      message: "Moved to cart",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};