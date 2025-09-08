import { useOrders } from "../Components/Context/OrdersContext";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const { orders, deleteOrder, updateOrderItems, getOrderStatus } = useOrders();

  const handleRemoveItem = (orderId, itemIndex) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const updatedItems = order.items.filter((_, idx) => idx !== itemIndex);
    updateOrderItems(orderId, updatedItems);
  };

  const handleChangeQty = (orderId, itemIndex, delta) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const updatedItems = order.items.map((item, idx) => {
      if (idx === itemIndex) {
        const newQty = Math.max(1, (Number(item.quantity) || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    updateOrderItems(orderId, updatedItems);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 mt-20 min-h-screen bg-gray-50" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-red-950">طلباتي</h2>

        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">لا توجد طلبات بعد</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => {
              const items = Array.isArray(order.items)
                ? order.items
                : order.items && typeof order.items === "object"
                  ? Object.values(order.items)
                  : [];

              const total = items
                .reduce((sum, item) => {
                  const price = item?.price
                    ? parseFloat(String(item.price).replace(/[^0-9.]/g, ""))
                    : 0;
                  const qty = Number(item?.quantity) || 1;
                  return sum + price * qty;
                }, 0)
                .toFixed(2);

              const status = getOrderStatus(order);
              const isEditable =
                status === "Pending" || status === "Confirmed";

              return (
                <li
                  key={order.id}
                  className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition relative"
                >
                  {isEditable && (
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="absolute top-4 left-4 text-red-500 hover:text-red-700"
                      title="حذف الطلب"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}

                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                    <h3 className="font-semibold text-lg text-gray-800">
                      رقم الطلب: <span className="text-red-950">{order.id}</span>
                    </h3>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : status === "Confirmed" || status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : status === "Shipped"
                              ? "bg-purple-100 text-purple-700"
                              : status === "Delivered"
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">وسيلة الدفع: </span>
                      {order.paymentMethod ||
                        (order.payment && order.payment.method) ||
                        "غير محدد"}
                    </p>
                    <p>
                      <span className="font-semibold">التاريخ: </span>
                      {order.date}
                    </p>
                    <p>
                      <span className="font-semibold">عدد المنتجات: </span>
                      {items.length}
                    </p>
                    <p>
                      <span className="font-semibold">الإجمالي: </span>
                      {total} EGP
                    </p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">تفاصيل المنتجات:</h4>
                    <ul className="space-y-2">
                      {items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <Link to={`/products/${item.categoryId}/${item.id}`}>
                              <img
                                src={item?.image || "/images/placeholder.png"}
                                alt={item?.name || "product"}
                                className="w-12 h-12 object-cover rounded-lg hover:scale-105 transition"
                              />
                            </Link>

                            <div className="leading-tight">
                              <Link
                                to={`/products/${item.categoryId}/${item.id}`}
                                className="font-medium hover:text-red-950 hover:underline"
                              >
                                {item?.name || "منتج"}
                              </Link>
                              <div className="text-xs text-gray-500">
                                {item?.category || ""}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-gray-600">
                              {Number(item?.quantity || 1)} ×{" "}
                              {item?.price || "0 EGP"}
                            </span>

                            {isEditable && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleChangeQty(order.id, idx, -1)
                                  }
                                  className="text-gray-600 hover:text-red-600"
                                >
                                  <Minus size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleChangeQty(order.id, idx, 1)
                                  }
                                  className="text-gray-600 hover:text-green-600"
                                >
                                  <Plus size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleRemoveItem(order.id, idx)
                                  }
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}
