import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function Books() {

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    fetchBooks();

  }, [search, category, page]);

  const fetchBooks = async () => {

    try {

      setLoading(true);

      const { data } = await API.get(

        `/books?search=${search}&category=${category}&page=${page}`

      );

      setBooks(data.books);

      setTotalPages(data.totalPages);

    } catch (error) {

      toast.error("Failed to load books");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <h1 className="text-center text-3xl mt-10">

        Loading Books...

      </h1>

    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Books Store

      </h1>

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Books..."
          value={search}
          onChange={(e)=>{

            setSearch(e.target.value);

            setPage(1);

          }}
          className="border p-3 rounded w-full"
        />

        <select
          value={category}
          onChange={(e)=>{

            setCategory(e.target.value);

            setPage(1);

          }}
          className="border p-3 rounded"
        >

          <option value="">All Categories</option>

          <option value="Programming">Programming</option>

          <option value="Business">Business</option>

          <option value="Self Help">Self Help</option>

          <option value="Fiction">Fiction</option>

          <option value="Biography">Biography</option>

          <option value="Science">Science</option>

          <option value="History">History</option>

        </select>

      </div>

      {

        books.length===0 ?

        <h2>No Books Found</h2>

        :

        <>

        <div className="grid md:grid-cols-4 gap-8">

          {

            books.map((book)=>(

              <div
              key={book._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              >

                <img
                src={
                  book.image ||

                  "https://dummyimage.com/250x350/cccccc/000000&text=Book"
                }

                alt={book.title}

                className="w-full h-72 object-cover"
                />

                <div className="p-4">

                  <h2 className="font-bold text-xl">

                    {book.title}

                  </h2>

                  <p>{book.author}</p>

                  <p className="text-blue-600">

                    {book.category}

                  </p>

                  <p className="font-bold text-green-600 mt-2">

                    ₹{book.price}

                  </p>

                  <p>

                    ⭐ {book.rating}

                  </p>

                  <Link

                  to={`/books/${book._id}`}

                  className="block mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"

                  >

                    View Details

                  </Link>

                </div>

              </div>

            ))

          }

        </div>

        <div className="flex justify-center gap-3 mt-12">

          <button

          disabled={page===1}

          onClick={()=>setPage(page-1)}

          className="bg-gray-300 px-5 py-2 rounded disabled:opacity-40"

          >

            Previous

          </button>

          <span className="text-xl font-bold">

            {page} / {totalPages}

          </span>

          <button

          disabled={page===totalPages}

          onClick={()=>setPage(page+1)}

          className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-40"

          >

            Next

          </button>

        </div>

        </>

      }

    </div>

  );

}

export default Books;