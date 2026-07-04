import { useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function ReviewForm({ bookId, refreshReviews }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const { data } = await API.post(
        `/reviews/${bookId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      setRating(5);
      setComment("");

      refreshReviews();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Review failed"
      );
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white shadow-lg rounded-lg p-6 mt-10"
    >
      <h2 className="text-2xl font-bold mb-5">
        Write a Review
      </h2>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-3 rounded w-full mb-4"
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <textarea
        rows="4"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-3 rounded w-full mb-4"
        required
      />

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;