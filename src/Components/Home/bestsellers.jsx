import { useState, useRef } from "react";
import Items from "../../Data/Items.json";
import { FaArrowLeft, FaArrowRight, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../Context/CartContext";
import { useFavorites } from "../Context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

function BestSellers() {
  const allProducts = Items.categories.flatMap(cat =>
    cat.items.map(item => ({ ...item, categoryId: cat.id }))
  );

  const top10Products = allProducts.slice(0, 10);

  const [scrollX, setScrollX] = useState(0);
  const sliderRef = useRef(null);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const { token } = useUser();
  const navigate = useNavigate();

  const handleScrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleAddToCart = (item, categoryId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    addToCart({ ...item, categoryId });
  };

  const handleToggleFavorite = (item, categoryId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    toggleFavorite({ ...item, categoryId });
  };

  return (
    <section className="py-12 px-6 w-full bg-red-50 relative overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center text-orange-900 mb-12">الأكثر مبيعًا</h2>

      <button
        onClick={handleScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-950 text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition"
      >
        <FaArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-950 text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition"
      >
        <FaArrowRight className="w-5 h-5" />
      </button>

      <div ref={sliderRef} className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
        {top10Products.map((item) => {
          const isFavorite = favorites.some(
            fav => fav.id === item.id && fav.categoryId === item.categoryId
          );

          return (
            <div key={`${item.categoryId}-${item.id}`} className="relative flex-shrink-0 w-60 group h-[28rem]">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full relative">
                <button
                  onClick={(e) => { handleToggleFavorite(item, item.categoryId); }}
                  className="absolute top-2 left-2 z-10 text-red-500 hover:text-red-700"
                >
                  <Heart fill={isFavorite ? "currentColor" : "none"} className="w-6 h-6" />
                </button>

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
                  onClick={(e) => { e.preventDefault(); handleAddToCart(item, item.categoryId); }}
                  className="absolute top-0 right-2 text-gray-700 p-3 hover:text-black transition"
                >
                  <ShoppingCart />
                </button>

                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{item.name}</h3>
                  <p className="text-orange-700 font-semibold text-lg">{item.price}</p>

                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => {
                      if (item.rating >= i + 1) return <FaStar key={i} className="text-yellow-400 w-5 h-5" />;
                      else if (item.rating > i && item.rating < i + 1) return <FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />;
                      else return <FaRegStar key={i} className="text-yellow-400 w-5 h-5" />;
                    })}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/products/${item.categoryId}/${item.id}`);
                    }}
                    className="mt-4 px-6 py-2 bg-red-950 text-white font-semibold rounded-md hover:bg-white border-2 hover:text-red-950 hover:border-red-950 transition"
                  >
                    اطلب الآن
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BestSellers;
