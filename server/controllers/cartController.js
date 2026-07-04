import Cart from "../models/Cart.js";
import Book from "../models/Book.js";

// ================= ADD TO CART =================

export const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if book already exists in user's cart
    const existingItem = await Cart.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingItem,
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      user: req.user._id,
      book: bookId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Book added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= GET USER CART =================

export const getCart = async (req, res) => {
  try {
   let cart = await Cart.find({
  user: req.user._id,
}).populate("book");

// Remove deleted books from cart
const invalidItems = cart.filter(item => item.book === null);

for (const item of invalidItems) {
  await item.deleteOne();
}

cart = cart.filter(item => item.book);

res.status(200).json({
  success: true,
  count: cart.length,
  cart,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= UPDATE CART QUANTITY =================

export const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cart.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= REMOVE FROM CART =================

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await cart.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};