import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import Loading from "../Loading";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, loading } = useUser();
  const storageKey = user ? `cart_${user.email}` : "cart_guest";

  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loading) return;
    const savedCart = localStorage.getItem(storageKey);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [storageKey, loading]);

  useEffect(() => {
    if (loading) return;
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey, loading]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const uniqueKey = `${product.id}_${product.name}`;
      const existingItem = prevCart.find((item) => item.uniqueKey === uniqueKey);

      if (existingItem) {
        return prevCart.map((item) =>
          item.uniqueKey === uniqueKey
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1, uniqueKey }];
      }
    });

    setMessage(`تمت إضافة المنتج للسلة`);
    setTimeout(() => setMessage(""), 3000);
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueKey !== uniqueKey));
    setMessage(`تم حذف المنتج من السلة`);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateQuantity = (uniqueKey, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uniqueKey === uniqueKey ? { ...item, quantity } : item
      )
    );
    setMessage(`تم تعديل الكمية`);
    setTimeout(() => setMessage(""), 3000);
  };

  const clearCart = () => {
    setCartItems([]);
    setMessage(`تم مسح السلة بالكامل`);
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <Loading />;
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        message,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
