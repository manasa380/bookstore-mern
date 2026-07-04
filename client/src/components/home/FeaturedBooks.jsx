import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const { data } = await API.get(
        "/books?featured=true&limit=4"
      );

      setBooks(data.books);
    } catch (error) {
      toast.error("Failed to load featured books");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <h2 className="text-center text-3xl font-bold">
          Loading Featured Books...
        </h2>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-20 px-8">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          ⭐ Featured Books
        </h2>

        <p className="text-gray-600 mt-2">
          Hand-picked books recommended by our bookstore.
        </p>

      </div>

      {books.length === 0 ? (

        <h2 className="text-center text-2xl text-gray-500">
          No Featured Books Available
        </h2>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {books.map((book) => (

            <div
              key={book._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
            >

              <img
                src={
                  book.image && book.image.trim() !== ""
                    ? book.image
                    : "https://dummyimage.com/250x350/cccccc/000000&text=Book"
                }
                alt={book.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {book.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {book.author}
                </p>

                <p className="text-sm text-blue-600 mt-2">
                  📚 {book.category}
                </p>

                <p className="mt-2">
                  ⭐ {book.rating || 0}/5
                </p>

                <p className="mt-2 text-2xl font-bold text-green-600">
                  ₹{book.price}
                </p>

                <Link
                  to={`/books/${book._id}`}
                  className="block mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default FeaturedBooks;