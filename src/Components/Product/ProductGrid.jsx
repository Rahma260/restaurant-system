import ProductCard from "./ProductCard";
import NotFound from "./NotFound";

function ProductGrid({ filteredItems, category, favorites, toggleFavorite, handleAddToCart, token }) {
  if (!filteredItems || filteredItems.length === 0) return <NotFound />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
      {filteredItems
        .filter((item) => item && item.id)
        .map((item) => {
          const isFavorite = favorites?.some(
            (fav) => fav && fav.id === item.id && fav.categoryId === category?.id
          );

          return (
            <ProductCard
              key={`${item.categoryId}-${item.id}`}
              item={item}
              category={category}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              handleAddToCart={handleAddToCart}
              token={token}
            />
          );
        })}
    </div>
  );
}

export default ProductGrid;
