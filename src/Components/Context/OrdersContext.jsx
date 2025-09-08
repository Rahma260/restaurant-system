import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => ({
          ...order,
          status: getOrderStatus(order),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const saved = localStorage.getItem(`orders_${user.email}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const normalized = Array.isArray(parsed)
          ? parsed.map((o) => ({
            ...o,
            items: Array.isArray(o.items)
              ? o.items
              : o.items && typeof o.items === "object"
                ? Object.values(o.items)
                : [],
          }))
          : [];

        setOrders(normalized);
      } catch {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
    setIsInitialized(true);
  }, [user]);


  useEffect(() => {
    if (isInitialized && user) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
    }
  }, [orders, isInitialized, user]);

  const createOrder = (cartItems, customerInfo, paymentMethod) => {
    if (!user) return null;
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      customer: customerInfo,
      paymentMethod,
      status: "Pending",
      date: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);

    return newOrder;
  };
  function getOrderStatus(order) {
    const now = new Date();
    const created = new Date(order.createdAt);
    const diff = now - created;
    if (order.paymentMethod === "دفع عند الاستلام") {
      if (diff >= 15 * 60 * 1000) return "Delivered";
      if (diff >= 10 * 60 * 1000) return "Shipped";
      if (diff >= 5 * 60 * 1000) return "Confirmed";
      return "Pending";
    }

    if (order.paymentMethod === "الدفع بالبطاقة") {
      if (diff >= 15 * 60 * 1000) return "Delivered";
      if (diff >= 10 * 60 * 1000) return "Shipped";
      if (diff >= 5 * 60 * 1000) return "Paid";
      if (diff >= 10000) return "Processing";
      return "Pending";
    }

    return order.status || "Pending";
  }


  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const updateOrderItems = (orderId, updatedItems) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, items: updatedItems } : o
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{ orders, createOrder, updateOrderStatus, deleteOrder, updateOrderItems, getOrderStatus }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);