import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useFavorites } from "../Components/Context/FavoritesContext";
import { useCart } from "../Components/Context/CartContext";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <>
      <Navbar />
      <div className="mt-28 px-6 max-w-4xl mx-auto min-h-screen mb-4" dir="rtl">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-950 flex items-center justify-center gap-2">
          المفضلة
          <Heart className="text-10xl text-red-500" />
        </h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-600 font-bold text-2xl border-dashed border-2 border-gray-600 mb-6">
            لا توجد منتجات في المفضلة
          </p>
        ) : (
          <div className="space-y-6">
            {favorites.map((item) => (
              <div
                key={`${item.id}_${item.categoryId}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <Link to={`/products/${item.categoryId}/${item.id}`}>
                      <h3 className="font-semibold hover:text-red-950 hover:underline">
                        {item.name}
                      </h3>
                    </Link>
                    <p>{item.price} EGP</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* زر إضافة للعربة */}
                  <button
                    onClick={() => addToCart(item)}
                    className="text-green-600 hover:text-green-800"
                    title="إضافة إلى العربة"
                  >
                    <ShoppingCart />
                  </button>

                  {/* زر الحذف */}
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="text-red-500 hover:text-red-700"
                    title="إزالة من المفضلة"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearFavorites}
              className="mt-4 px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              مسح الكل
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Favorites;
