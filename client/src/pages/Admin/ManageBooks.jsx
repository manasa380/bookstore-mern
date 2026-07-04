import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
 const [formData,setFormData]=useState({
title:"",
author:"",
category:"",
description:"",
price:"",
stock:"",
image:"",
rating:"",
featured:false,
format:"Physical",
});

  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const { data } = await API.get("/books");
      setBooks(data.books);
    } catch (error) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    let data;

    if (editingId) {
      const res = await API.put(`/books/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data = res.data;
    } else {
      const res = await API.post("/books", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data = res.data;
    }

    toast.success(data.message);

    setShowForm(false);
    setEditingId(null);

   setFormData({
  title: "",
  author: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  rating: "",
  featured: false,
  format:"Physical",
});

    fetchBooks();
  } catch (error) {
    toast.error(error.response?.data?.message || "Error");
  }
};
  
const editBook = (book) => {
  setEditingId(book._id);
  setShowForm(true);

  setFormData({
  title: book.title,
  author: book.author,
  category: book.category,
  description: book.description,
  price: book.price,
  stock: book.stock,
  image: book.image,
  rating: book.rating,
  featured: book.featured,
  format:book.format,
});
};
const deleteBook = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await API.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(data.message);

    fetchBooks();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete book");
  }
};
if (loading) {
    return <h1 className="text-center text-3xl mt-10">Loading...</h1>;
  }
  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">Manage Books</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {showForm ? "Close" : "+ Add Book"}
        </button>

      </div>

      {showForm && (

        <form
          onSubmit={submitHandler}
          className="bg-white shadow-lg rounded-lg p-6 mb-10 grid md:grid-cols-2 gap-4"
        >

          <input
            name="title"
            placeholder="Title"
            className="border p-3 rounded"
            value={formData.title}
            onChange={changeHandler}
          />

          <input
            name="author"
            placeholder="Author"
            className="border p-3 rounded"
            value={formData.author}
            onChange={changeHandler}
          />

      <select
  name="category"
  value={formData.category}
  onChange={changeHandler}
  className="border p-3 rounded"
>
  <option value="">Select Category</option>
  <option value="Programming">Programming</option>
  <option value="Business">Business</option>
  <option value="Self Help">Self Help</option>
  <option value="Fiction">Fiction</option>
  <option value="Biography">Biography</option>
  <option value="Science">Science</option>
  <option value="History">History</option>
</select>

<select
  name="format"
  value={formData.format}
  onChange={changeHandler}
  className="border p-3 rounded"
>
  <option value="Physical">Physical Book</option>
  <option value="E-Book">E-Book</option>
</select>

<input
  name="price"
  type="number"
  placeholder="Price"
  className="border p-3 rounded"
  value={formData.price}
  onChange={changeHandler}
/>

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            className="border p-3 rounded"
            value={formData.stock}
            onChange={changeHandler}
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            className="border p-3 rounded"
            value={formData.rating}
            onChange={changeHandler}
          />
          <div className="flex items-center gap-2">

  <input
    type="checkbox"
    name="featured"
    checked={formData.featured}
    onChange={(e) =>
      setFormData({
        ...formData,
        featured: e.target.checked,
      })
    }
  />

  <label>Featured Book</label>

</div>

          <input
            name="image"
            placeholder="Image URL"
            className="border p-3 rounded md:col-span-2"
            value={formData.image}
            onChange={changeHandler}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded md:col-span-2"
            rows="4"
            value={formData.description}
            onChange={changeHandler}
          />

          <button
            className="bg-green-600 text-white py-3 rounded md:col-span-2"
          >
           {editingId ? "Update Book" : "Save Book"}
          </button>

        </form>

      )}

      <div className="overflow-x-auto">

        <table className="w-full border shadow-lg">

          <thead className="bg-gray-100">

            <th className="border p-3">Image</th>
<th className="border p-3">Title</th>
<th className="border p-3">Author</th>
<th className="border p-3">Category</th>
<th className="border p-3">Price</th>
<th className="border p-3">Stock</th>
<th className="border p-3">Actions</th>

          </thead>

          <tbody>

            {books.map((book) => (

              <tr key={book._id}>

                <td className="border p-3">
                  <img
                    src={
                      book.image
                        ? book.image
                        : "https://dummyimage.com/60x80/cccccc/000000&text=Book"
                    }
                    alt={book.title}
                    className="w-16 h-20 object-cover"
                  />
                </td>

                <td className="border p-3">{book.title}</td>

                <td className="border p-3">{book.author}</td>

                <td className="border p-3">
  {book.category}
</td>



<td className="border p-3">₹{book.price}</td>

                <td className="border p-3">{book.stock}</td>

                <td className="border p-3">
                  <button
  onClick={() => editBook(book)}
  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>

                  <button
  onClick={() => deleteBook(book._id)}
  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
>
  Delete
</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageBooks;