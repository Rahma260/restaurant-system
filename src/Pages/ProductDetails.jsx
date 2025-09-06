import { useParams, useNavigate } from "react-router-dom";
import Items from "../Data/Items.json";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useCart } from "../Components/Context/CartContext";
import { useState, useEffect } from "react";
import { useFavorites } from "../Components/Context/FavoritesContext";
import { useUser } from "../Components/Context/UserContext";

import ProductImage from "../Components/ProductDetails/ProductImage";
import ProductInfo from "../Components/ProductDetails/ProductInfo";
import SimilarProducts from "../Components/ProductDetails/SimilarProducts";

function ProductDetails() {
  const { categoryId, itemId } = useParams();
  const navigate = useNavigate();
  const { token } = useUser();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart, message } = useCart();

  const [item, setItem] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundCategory = Items.categories.find(cat => String(cat.id) === categoryId);
    setCategory(foundCategory);
    const foundItem = foundCategory?.items.find(i => String(i.id) === itemId);
    setItem(foundItem);
    setQuantity(1);
  }, [categoryId, itemId]);

  if (!item) return <p className="text-center mt-20 text-red-600 text-xl">المنتج غير موجود</p>;

  const similarProducts = category?.items.filter(i => i.id !== item.id) || [];
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    addToCart({ ...item, quantity });
    setQuantity(1);
  };

  return (
    <>
      <Navbar />
      {message}
      <div className="max-w-6xl mx-auto mt-28 px-6 lg:px-0 flex flex-col lg:flex-row gap-12 min-h-screen">
        <ProductImage image={item.image} name={item.name} />
        <ProductInfo
          item={item}
          quantity={quantity}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleAddToCart={handleAddToCart}
          categoryId={categoryId}
        />
      </div>
      <SimilarProducts
        similarProducts={similarProducts}
        favorites={favorites}
        handleToggleFavorite={toggleFavorite}
        addToCart={addToCart}
        token={token}
        categoryId={categoryId}
      />
      <Footer />
    </>
  );
}

export default ProductDetails;
