import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useCart } from "../Components/Context/CartContext";
import { Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="mt-28 px-6 max-w-4xl mx-auto min-h-screen mb-4" dir="rtl">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-950 flex items-center justify-center gap-2">
          سلة المشتريات
          <ShoppingCart className="text-10xl text-red-500" />
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 font-bold text-2xl border-dashed border-2 border-gray-600 mb-6">
            السلة فارغة
          </p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.uniqueKey}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <Link to={`/products/${item.categoryId}/${item.id}`}>
                      <h3 className="font-semibold text-lg hover:text-red-950 hover:underline ">{item.name}</h3>
                    </Link>
                    <p className="text-gray-600">
                      {parseFloat(item.price.replace(/[^0-9.]/g, "")).toFixed(2)}{" "}
                      EGP
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.uniqueKey, parseInt(e.target.value))
                    }
                    className="w-16 border rounded px-2 text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.uniqueKey)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center font-bold text-lg">
              <span>الإجمالي:</span>
              <span>{total.toFixed(2)} EGP</span>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={clearCart}
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                مسح السلة
              </button>
              <button className="px-6 py-2 bg-red-950 text-white rounded hover:bg-red-900">
                إتمام الشراء
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
