import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";

import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, []);

  const fetchBook = async () => {
    try {
      const { data } = await API.get(`/books/${id}`);
      setBook(data.book);
    } catch (error) {
      toast.error("Failed to load book.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/${id}`);
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.post(
        "/cart",
        {
          bookId: book._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add cart"
      );
    }
  };

  const addToWishlist = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.post(
        "/wishlist",
        {
          bookId: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add wishlist"
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading...
      </h1>
    );
  }

  if (!book) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Book Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={
            book.image
              ? book.image
              : "https://dummyimage.com/400x500/cccccc/000000&text=Book"
          }
          alt={book.title}
          className="rounded-lg shadow-lg"
        />

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {book.title}
          </h1>

          <p className="text-xl text-gray-600 mb-3">
            {book.author}
          </p>

          <p className="mb-3">
            <strong>Category :</strong> {book.category}
          </p>

          <p className="mb-3">
            <strong>Format :</strong> {book.format}
          </p>

          <p className="mb-3">
            <strong>Price :</strong> ₹{book.price}
          </p>

          <p className="mb-3">
            <strong>Stock :</strong> {book.stock}
          </p>

          <p className="mb-3">
            <strong>Rating :</strong> ⭐ {book.rating}
          </p>

          <p className="mt-5">
            {book.description}
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={addToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded"
            >
              🛒 Add To Cart
            </button>

            <button
              onClick={addToWishlist}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded"
            >
              ❤️ Wishlist
            </button>

          </div>

        </div>

      </div>

      <ReviewForm
        bookId={id}
        refreshReviews={fetchReviews}
      />

      <ReviewList reviews={reviews} />

    </div>
  );
}

export default BookDetails;