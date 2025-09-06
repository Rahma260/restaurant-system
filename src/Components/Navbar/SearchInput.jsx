import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchInput() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex-1 flex justify-center mx-2 sm:mx-4">
      <form onSubmit={handleSearch} className="relative w-28 xs:w-36 sm:w-48 md:w-72 lg:w-80 xl:w-96">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث هنا"
          className="w-full px-12 sm:px-3 md:px-8 py-1.5 sm:py-2 pr-3 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        <button
          type="submit"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 text-white border-2 bg-red-950 hover:text-red-950 hover:bg-white p-1.5 sm:p-2 rounded-md hover:border-red-950 transition duration-300"
        >
          <Search />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
