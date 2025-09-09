import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ProductCard({ item, category, isFavorite, toggleFavorite, handleAddToCart, token }) {
  const navigate = useNavigate();

  return (
    <Link
      key={`${category.id}-${item.id}`}
      to={`${item.id}`}
      className="w-full sm:w-60 bg-white rounded-xl shadow-lg overflow-hidden group relative"
    >
      <div className="flex justify-center mt-6">
        <div className="w-60 h-60 rounded-full bg-gradient-to-br from-red-50 to-red-200 flex items-center justify-center">
          <img
            src={item.image || "/images/placeholder.png"}
            alt={item.name}
            className="w-52 h-52 object-cover rounded-full"
          />
        </div>
      </div>


      <button
        onClick={(e) => {
          e.preventDefault();
          if (!token) {
            navigate("/login");
            return;
          }
          toggleFavorite({ ...item, categoryId: category.id });
        }}
        className="absolute top-2 left-2"
      >
        <Heart
          className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-red-500 hover:text-red-700"}`}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>


      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart(item, category.id);
        }}
        className="absolute top-0 right-2 text-gray-700 p-3 hover:text-black transition"
      >
        <ShoppingCart />
      </button>

      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-amber-900 mb-2">{item.name}</h3>
        <p className="text-orange-700 font-semibold text-lg">{item.price}</p>

        <div className="flex justify-center mb-2">
          {Array.from({ length: 5 }, (_, i) => {
            if (item.rating >= i + 1) {
              return <FaStar key={i} className="text-yellow-400 w-5 h-5" />;
            } else if (item.rating > i && item.rating < i + 1) {
              return <FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />;
            } else {
              return <FaRegStar key={i} className="text-yellow-400 w-5 h-5" />;
            }
          })}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(`/products/${category.id}/${item.id}`);
          }}
          className="mt-4 px-6 py-2 bg-red-950 text-white font-semibold rounded-md hover:bg-white border-2 hover:text-red-950 hover:border-red-950 transition"
        >
          اطلب الآن
        </button>

      </div>
    </Link>
  );
}

export default ProductCard;
