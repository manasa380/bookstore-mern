import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row items-center">

        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight">
            Find Your Next
            <br />
            Favorite Book
          </h1>

          <p className="mt-6 text-lg">
            Explore thousands of books from bestselling authors.
            Read anywhere, anytime.
          </p>

          <Link
            to="/books"
            className="inline-block mt-8 bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Browse Books
          </Link>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700"
            alt="Books"
            className="rounded-xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;