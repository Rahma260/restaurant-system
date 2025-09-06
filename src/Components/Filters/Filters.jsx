import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Items from "../../Data/Items.json";

function Filters({ categoryId, maxPrice, setMaxPrice, minRating, setMinRating }) {
  return (
    <>
      <div className="flex gap-3 flex-wrap justify-center mb-4 md:mb-0">
        <button
          onClick={() => {
            setMaxPrice("");
            setMinRating(0);
          }}
          className={`px-4 py-2 rounded-full border transition ${!maxPrice && minRating === 0
            ? "bg-red-950 text-white border-red-950"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          الكل
        </button>

        {Items.categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products/${cat.id}`}
            onClick={() => {
              setMaxPrice("");
              setMinRating(0);
            }}
            className={`px-4 py-2 rounded-full border transition ${String(cat.id) === categoryId
              ? "bg-red-950 text-white border-red-950"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <label className="text-gray-700 font-semibold text-sm">أقصى سعر:</label>
        <input
          type="number"
          placeholder="2000"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-24 border rounded-lg px-2 py-1 text-sm"
        />
        <span className="text-sm text-gray-600">EGP</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-semibold text-sm">التقييم:</label>
        <div className="flex gap-1 flex-wrap">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setMinRating(minRating === star ? 0 : star)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm transition ${minRating === star
                ? "bg-yellow-400 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <FaStar className="w-4 h-4" /> {star}+
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filters;
