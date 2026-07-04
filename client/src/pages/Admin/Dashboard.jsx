import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-hot-toast";

function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    try {
      const [booksRes, ordersRes, usersRes] = await Promise.all([
        API.get("/books"),
        API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const revenue = ordersRes.data.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      );

      setStats({
        books: booksRes.data.count,
        orders: ordersRes.data.count,
        users: usersRes.data.count,
        revenue,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl">📚 Books</h2>
          <p className="text-4xl font-bold mt-4">{stats.books}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl">📦 Orders</h2>
          <p className="text-4xl font-bold mt-4">{stats.orders}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl">👥 Users</h2>
          <p className="text-4xl font-bold mt-4">{stats.users}</p>
        </div>

        <div className="bg-orange-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl">💰 Revenue</h2>
          <p className="text-4xl font-bold mt-4">
            ₹{stats.revenue}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <Link
          to="/admin/books"
          className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            📚 Manage Books
          </h2>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            📦 Manage Orders
          </h2>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            👥 Manage Users
          </h2>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;