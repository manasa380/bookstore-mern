import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data.cart);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter shipping address");
      return;
    }

    try {
      const { data } = await API.post(
        "/orders",
        {
          shippingAddress,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Order Failed");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading Checkout...
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white shadow-lg rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            Shipping Address
          </h2>

          <textarea
            rows="5"
            className="w-full border rounded p-3"
            placeholder="Enter your address"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
          />

          <h2 className="text-2xl font-bold mt-6 mb-4">
            Payment Method
          </h2>

          <select
            className="w-full border rounded p-3"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
          </select>

        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between mb-3"
            >
              <span>
                {item.book.title} × {item.quantity}
              </span>

              <span>
                ₹ {item.book.price * item.quantity}
              </span>
            </div>
          ))}

          <hr className="my-5" />

          <h2 className="text-3xl font-bold">
            Total : ₹ {total}
          </h2>

          <button
            onClick={placeOrder}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;