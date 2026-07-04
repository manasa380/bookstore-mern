import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";
import CartItem from "../../components/cart/CartItem";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!token) {
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

  const updateQuantity = async (id, quantity) => {
    try {
      await API.put(
        `/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const increaseQuantity = (item) => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1);
    }
  };

  const removeItem = async (id) => {
    try {
      const { data } = await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
      fetchCart();
    } catch {
      toast.error("Delete Failed");
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + (item.book?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-4xl font-bold">
            Your Cart is Empty
          </h2>

          <button
            onClick={() => navigate("/books")}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg"
          >
            Browse Books
          </button>

        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem}
              />
            ))}

          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 h-fit sticky top-10">

            <h2 className="text-3xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4 text-lg">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4 text-lg">
              <span>Delivery</span>
              <span className="text-green-600">
                FREE
              </span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-xl"
            >
              Proceed To Checkout
            </button>

            <button
              onClick={() => navigate("/books")}
              className="w-full mt-4 border border-blue-600 text-blue-600 py-4 rounded-lg"
            >
              Continue Shopping
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;