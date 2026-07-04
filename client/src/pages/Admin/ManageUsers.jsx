import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data.users);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading Users...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        👥 Manage Users
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border shadow-lg">

          <thead className="bg-gray-100">

            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Joined</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td className="border p-3">
                  {user.name}
                </td>

                <td className="border p-3">
                  {user.email}
                </td>

                <td className="border p-3">
                  {user.phone}
                </td>

                <td className="border p-3">

                  <span
                    className={`px-3 py-1 rounded text-white ${
                      user.role === "admin"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="border p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageUsers;