function Categories() {
  const categories = [
    "Programming",
    "Self Help",
    "Business",
    "Novels",
    "History",
    "Biography",
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-10">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white shadow rounded-lg p-8 text-center text-xl font-semibold hover:bg-blue-600 hover:text-white transition cursor-pointer"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;