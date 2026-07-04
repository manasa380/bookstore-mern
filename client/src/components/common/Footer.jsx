import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>
          <h2 className="text-3xl font-bold mb-4">
            📚 BookStore
          </h2>

          <p className="text-gray-400">
            Your one-stop destination for the best books,
            best authors and amazing reading experience.
          </p>
        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/books">Books</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>

            <li>
              <Link to="/orders">Orders</Link>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p>Email : support@bookstore.com</p>

          <p className="mt-2">
            Phone : +91 9876543210
          </p>

          <p className="mt-2">
            Hyderabad, India
          </p>

        </div>

        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-3xl">

            <span>📘</span>

            <span>📷</span>

            <span>🐦</span>

            <span>💼</span>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-5">

        © 2026 BookStore. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;