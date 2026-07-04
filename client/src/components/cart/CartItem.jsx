function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition">

      <img
        src={
          item.book?.image
            ? item.book.image
            : "https://dummyimage.com/180x250/cccccc/000000&text=Book"
        }
        alt={item.book?.title || "Book"}
        className="w-40 h-56 object-cover rounded-lg mx-auto md:mx-0"
      />

      <div className="flex-1">

        <h2 className="text-3xl font-bold">
          {item.book?.title || "Book Deleted"}
        </h2>

        <p className="text-gray-600 text-lg mt-1">
          {item.book?.author}
        </p>

        <p className="text-blue-600 mt-2">
          Genre : {item.book?.genre}
        </p>

        <p className="text-yellow-500 mt-2">
          ⭐ {item.book?.rating}
        </p>

        <h3 className="text-2xl font-bold text-green-600 mt-4">
          ₹ {item.book?.price || 0}
        </h3>

        <div className="flex items-center gap-4 mt-6">

          <button
            onClick={() => decreaseQuantity(item)}
            className="w-10 h-10 bg-gray-200 rounded-full text-xl hover:bg-gray-300"
          >
            −
          </button>

          <span className="text-xl font-bold">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item)}
            className="w-10 h-10 bg-blue-600 text-white rounded-full text-xl hover:bg-blue-700"
          >
            +
          </button>

        </div>

        <p className="text-xl font-semibold mt-6">
          Subtotal :
          <span className="text-green-600">
            {" "}₹ {(item.book?.price || 0) * item.quantity}
          </span>
        </p>

      </div>

      <div className="flex md:flex-col justify-end">

        <button
          onClick={() => removeItem(item._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          🗑 Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;