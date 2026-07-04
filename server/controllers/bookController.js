import Book from "../models/Book.js";

// ================= ADD BOOK =================

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      description,
      price,
      stock,
      image,
      rating,
      format,
    } = req.body;

    if (!title || !author || !category || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const book = await Book.create({
      title,
      author,
      category,
      description,
      price,
      stock,
      image,
      rating,
      format,
    });

    res.status(201).json({
      success: true,
      message: "Book Added Successfully",
      book,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET ALL BOOKS =================

export const getBooks = async (req, res) => {
  try {

    const {
      search,
      category,
      author,
      minPrice,
      maxPrice,
      rating,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (author) {
      query.author = {
        $regex: author,
        $options: "i",
      };
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice)
        query.price.$gte = Number(minPrice);

      if (maxPrice)
        query.price.$lte = Number(maxPrice);
    }

    if (rating) {
      query.rating = {
        $gte: Number(rating),
      };
    }

    let books = Book.find(query);

    if (sort === "price") {
      books = books.sort({ price: 1 });
    } else if (sort === "-price") {
      books = books.sort({ price: -1 });
    } else if (sort === "rating") {
      books = books.sort({ rating: -1 });
    } else {
      books = books.sort({ createdAt: -1 });
    }

    const totalBooks = await Book.countDocuments(query);

    const skip = (Number(page) - 1) * Number(limit);

    books = books.skip(skip).limit(Number(limit));

    const result = await books;

    res.status(200).json({
      success: true,
      books: result,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: Number(page),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET SINGLE BOOK =================

export const getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const relatedBooks = await Book.find({
      _id: { $ne: book._id },
      category: book.category,
    }).limit(4);

    res.status(200).json({
      success: true,
      book,
      relatedBooks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= UPDATE BOOK =================

export const updateBook = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Book Updated Successfully",
      book: updatedBook,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= DELETE BOOK =================

export const deleteBook = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Book Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};