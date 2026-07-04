function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-xl">
          No Reviews Yet
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Customer Reviews
      </h2>

      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white shadow rounded-lg p-5 mb-5"
        >
          <h3 className="font-bold">
            {review.user?.name}
          </h3>

          <p className="text-yellow-500">
            {"⭐".repeat(review.rating)}
          </p>

          <p className="mt-2">
            {review.comment}
          </p>

          <p className="text-gray-500 text-sm mt-3">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;