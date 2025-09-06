import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // 👈 أضفنا المكتبة
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Items from "../Data/Items.json";
import { SlidersHorizontal } from "lucide-react";
import NotFound from "../Components/Product/NotFound";
import { useCart } from "../Components/Context/CartContext";
import { useFavorites } from "../Components/Context/FavoritesContext";
import { useUser } from "../Components/Context/UserContext";
import Loading from "../Components/Loading";
import { useLoading } from "../Components/Context/LoadingContext";
import Filters from "../Components/Filters/Filters";
import SidebarFilters from "../Components/Filters/SidebarFilters";
import ProductGrid from "../Components/Product/ProductGrid";

function Product() {
  const { categoryId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";

  const { addToCart } = useCart();
  const { token } = useUser();
  const { favorites, toggleFavorite } = useFavorites();
  const { loading, showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [category, setCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let items = [];

    if (categoryId) {
      const cat = Items.categories.find((c) => String(c.id) === categoryId);
      setCategory(cat || null);
      if (cat) items = cat.items.map((item) => ({ ...item, categoryId: cat.id }));
    } else {
      setCategory({ id: "all", name: "جميع المنتجات" });
      items = Items.categories.flatMap((cat) =>
        cat.items.map((item) => ({ ...item, categoryId: cat.id }))
      );
    }


    if (maxPrice) {
      items = items.filter((item) => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return priceNum <= parseFloat(maxPrice);
      });
    }

    if (minRating > 0) {
      items = items.filter((item) => item.rating >= minRating);
    }

    if (search) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(items);
  }, [categoryId, maxPrice, minRating, search]);

  const handleAddToCart = (item) => {
    if (!token) {
      navigate("/login");
      return;
    }
    addToCart(item);
  };

  if (loading) return <Loading />;
  if (!category) return <NotFound />;

  return (
    <>
      <Navbar />

      <div className="mt-28 px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex backdrop-blur-lg bg-white rounded-2xl p-4 mb-8 items-center justify-between gap-4 shadow-md"
        >
          <div className="flex items-center gap-2 text-red-950 font-bold text-lg">
            <SlidersHorizontal className="w-5 h-5" />
            <span>تصفية المنتجات</span>
          </div>
          <Filters
            categoryId={categoryId}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
          />
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex items-center gap-2 px-4 py-2 mb-6 bg-red-950 text-white rounded-lg shadow-md"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>تصفية</span>
        </motion.button>

        <SidebarFilters
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          categoryId={categoryId}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
        />

        <section>
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold mb-8 text-center text-red-950"
          >
            {category.name}
          </motion.h2>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={categoryId + search + maxPrice + minRating}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductGrid
                filteredItems={filteredItems}
                category={category}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleAddToCart={handleAddToCart}
                token={token}
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Product;
