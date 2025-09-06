import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.categoryId === product.categoryId
      );

      if (exists) {
        return prev.filter(
          (item) => !(item.id === product.id && item.categoryId === product.categoryId)
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
