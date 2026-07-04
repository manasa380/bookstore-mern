import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.get("/orders/my", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setOrders(data.orders);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
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
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-2xl">
          No Orders Found
        </h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold">
              Order ID
            </h2>

            <p className="text-gray-500 break-all mb-3">
              {order._id}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              {order.orderStatus}
            </p>

            <p>
              <strong>Payment :</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Shipping :</strong>{" "}
              {order.shippingAddress}
            </p>

            <p className="mt-3 font-bold text-green-600">
              Total : ₹ {order.totalAmount}
            </p>

            <hr className="my-4" />

            <h3 className="text-xl font-bold mb-3">
              Books
            </h3>

            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b py-2"
              >
                <span>
                 {item.book ? item.book.title : "Book Deleted"}
                </span>

                <span>
                  Qty : {item.quantity}
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;