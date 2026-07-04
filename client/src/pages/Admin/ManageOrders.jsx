import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await API.put(
        `/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading Orders...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        📦 Manage Orders
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border shadow-lg">

          <thead className="bg-blue-100">

            <tr>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Books</th>
              <th className="border p-3">Shipping</th>
              <th className="border p-3">Payment</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Update</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td className="border p-3">

                  <p className="font-bold">
                    {order.user.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.user.email}
                  </p>

                </td>

                <td className="border p-3">

                  {order.items.map((item) => (

                    <div key={item._id}>

                      {item.book
                        ? `${item.book.title} × ${item.quantity}`
                        : `Book Deleted × ${item.quantity}`}

                    </div>

                  ))}

                </td>

                <td className="border p-3">
                  {order.shippingAddress}
                </td>

                <td className="border p-3">
                  {order.paymentMethod}
                </td>

                <td className="border p-3 font-bold text-green-600">
                  ₹ {order.totalAmount}
                </td>

                <td className="border p-3">

                  <span
                    className={`px-3 py-1 rounded text-white
                    ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-500"
                        : order.orderStatus === "Processing"
                        ? "bg-blue-500"
                        : order.orderStatus === "Shipped"
                        ? "bg-purple-600"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td className="border p-3">

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-3 py-2"
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageOrders;