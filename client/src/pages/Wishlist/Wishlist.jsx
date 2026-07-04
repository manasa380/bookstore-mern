import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(data.wishlist);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      const { data } = await API.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
      fetchWishlist();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const moveToCart = async (id) => {
    try {
      const { data } = await API.post(
        `/wishlist/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchWishlist();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading Wishlist...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2 className="text-2xl">
          Wishlist is Empty
        </h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {wishlist.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={
                  item.book?.image
                    ? item.book.image
                    : "https://dummyimage.com/300x400/cccccc/000000&text=Book"
                }
                alt={item.book?.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {item.book?.title || "Book Deleted"}
                </h2>

                <p className="text-gray-600">
                  {item.book?.author}
                </p>

                <p className="text-green-600 text-xl font-bold mt-3">
                  ₹ {item.book?.price || 0}
                </p>

                <button
                  onClick={() => moveToCart(item._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-5"
                >
                  🛒 Move To Cart
                </button>

                <button
                  onClick={() => removeItem(item._id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-3"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;