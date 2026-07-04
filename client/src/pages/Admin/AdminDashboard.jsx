import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    const { data } = await API.get(
      "/admin/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(data);

  };

  if (!stats)
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading...
      </h1>
    );

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-8">

        <div className="bg-blue-600 text-white rounded-lg p-8">

          <h2 className="text-2xl">
            Users
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalUsers}
          </p>

        </div>

        <div className="bg-green-600 text-white rounded-lg p-8">

          <h2 className="text-2xl">
            Books
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalBooks}
          </p>

        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-8">

          <h2 className="text-2xl">
            Orders
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalOrders}
          </p>

        </div>

        <div className="bg-purple-700 text-white rounded-lg p-8">

          <h2 className="text-2xl">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-4">
            ₹ {stats.totalRevenue}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;