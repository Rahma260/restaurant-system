import { useRef } from "react";
import ProductCard from "./ProductCard";

function SimilarProducts({ similarProducts, favorites, handleToggleFavorite, addToCart, token, categoryId }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });

  if (!similarProducts.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-0 mt-16 relative">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">منتجات مشابهة</h2>
      <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-red-950 text-white rounded-full">&#8592;</button>
      <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-red-950 text-white rounded-full">&#8594;</button>

      <div ref={sliderRef} className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
        {similarProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            prod={prod}
            categoryId={categoryId}
            isFavorite={favorites.some(fav => fav.id === prod.id)}
            handleToggleFavorite={handleToggleFavorite}
            addToCart={addToCart}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;
