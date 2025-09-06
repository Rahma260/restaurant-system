import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const uniqueKey = `${product.name}_${product.name}`;
      const existingItem = prevCart.find((item) => item.uniqueKey === uniqueKey);

      if (existingItem) {
        return prevCart.map((item) =>
          item.uniqueKey === uniqueKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, uniqueKey }];
      }
    });

    setMessage(`تمت إضافته للسلة`);
    setTimeout(() => setMessage(""), 3000);
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueKey !== uniqueKey));
    setMessage(`تم حذفه من لسلة`);
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
  };

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

export const useCart = () => useContext(CartContext);
