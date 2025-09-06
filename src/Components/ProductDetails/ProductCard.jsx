import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ProductCard({ prod, categoryId, isFavorite, handleToggleFavorite, addToCart, token }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex-shrink-0 w-60 group ">
      <Link
        to={`/products/${categoryId}/${prod.id}`}
        className="bg-white rounded-xl shadow-lg overflow-hidden block"
      >
        <div className="flex justify-center mt-6">
          <div className="w-60 h-60 rounded-full bg-gradient-to-br from-red-50 to-red-200 flex items-center justify-center">
            <img
              src={prod.image || "/images/placeholder.png"}
              alt={prod.name}
              className="w-52 h-52 object-cover rounded-full"
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleToggleFavorite(prod, categoryId);
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
            if (!token) {
              navigate("/login");
              return;
            }
            addToCart({ ...prod, quantity: 1 });
          }}
          className="absolute top-0 right-2 text-gray-700 p-3 hover:text-black transition"
        >
          <ShoppingCart />
        </button>

        <div className="p-5 text-center">
          <h3 className="text-xl font-bold text-amber-900 mb-2">{prod.name}</h3>
          <p className="text-orange-700 font-semibold text-lg">{prod.price}</p>

          <div className="flex justify-center mb-2">
            {Array.from({ length: 5 }, (_, i) => {
              if (prod.rating >= i + 1) return <FaStar key={i} className="text-yellow-400 w-5 h-5" />;
              if (prod.rating > i && prod.rating < i + 1) return <FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />;
              return <FaRegStar key={i} className="text-yellow-400 w-5 h-5" />;
            })}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/products/${categoryId}/${prod.id}`);
            }}
            className="mt-4 px-6 py-2 bg-red-950 text-white font-semibold rounded-md hover:bg-white border-2 hover:text-red-950 hover:border-red-950 transition"
          >
            اطلب الآن
          </button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
