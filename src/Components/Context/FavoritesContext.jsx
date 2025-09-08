import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const saved = localStorage.getItem(`favorites_${user.email}`);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }

    setIsInitialized(true);
  }, [user]);

  useEffect(() => {
    if (isInitialized && user) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, isInitialized, user]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (item) =>
          item.id === product.id && item.categoryId === product.categoryId
      );

      if (exists) {
        return prev.filter(
          (item) =>
            !(item.id === product.id && item.categoryId === product.categoryId)
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    if (user) localStorage.removeItem(`favorites_${user.email}`);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
