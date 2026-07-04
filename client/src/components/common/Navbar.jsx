import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        <Link to="/books">Books</Link>

        {token && user?.role === "user" && (
          <>
            <Link to="/wishlist">Wishlist</Link>

            <Link to="/cart">Cart</Link>

            <Link to="/orders">Orders</Link>
          </>
        )}

        {token && user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>

            <Link to="/admin/books">Manage Books</Link>

            <Link to="/admin/orders">Manage Orders</Link>

            <Link to="/admin/users">Manage Users</Link>
          </>
        )}

        {token && (
          <Link to="/profile">Profile</Link>
        )}

      </div>

      <div className="flex gap-4 items-center">

        {token ? (
          <>
            <span className="font-semibold">
              {user?.name}
            </span>

            <button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;