import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/Context/CartContext";
import { useUser } from "../Components/Context/UserContext";
import { useOrders } from "../Components/Context/OrdersContext";
import InputField from "../Components/Auth/InputField";
import { FaUser, FaEnvelope, FaPhone, FaAddressBook, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

function CheckoutForm() {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    paymentMethod: "cash",
  });

  const [errors, setErrors] = useState({});

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "بريد إلكتروني غير صالح";
    if (!formData.phone.trim()) newErrors.phone = "رقم التليفون مطلوب";
    if (!formData.address.trim()) newErrors.address = "العنوان مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (total === 0) {
      alert("السلة فارغة! أضف منتجات قبل إتمام الطلب.");
      return;
    }
    if (!validate()) return;
    if (formData.paymentMethod === "cash") {
      createOrder(cartItems, formData, "دفع عند الاستلام");
      clearCart();
      navigate("/orders");
    } else if (formData.paymentMethod === "card") {
      navigate("/payment", { state: { formData, cartItems, total } });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-white flex items-center justify-center py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-pink-50 rounded-2xl shadow-lg p-8 space-y-6"
          dir="rtl"
        >
          <h2 className="text-3xl font-bold text-center text-red-950 mb-6">
            إتمام الشراء
          </h2>
          {total === 0 && (
            <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg text-center font-medium">
              السلة فارغة! أضف منتجات قبل إتمام الطلب.
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">بيانات العميل</h3>
            <InputField
              icon={FaUser}
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              icon={FaEnvelope}
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              icon={FaPhone}
              type="text"
              name="phone"
              placeholder="رقم التليفون"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <InputField
              icon={FaAddressBook}
              type="text"
              name="address"
              placeholder="العنوان"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">طريقة الدفع</h3>
            <div className="flex gap-4">
              <label
                className={`flex-1 flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.paymentMethod === "cash"
                  ? "border-red-950 bg-red-50"
                  : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleChange}
                  className="hidden"
                />
                <FaMoneyBillWave className="text-green-600" />
                <span className="font-medium">الدفع عند الاستلام</span>
              </label>

              <label
                className={`flex-1 flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.paymentMethod === "card"
                  ? "border-red-950 bg-red-50"
                  : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="hidden"
                />
                <FaCreditCard className="text-blue-600" />
                <span className="font-medium">الدفع بالبطاقة</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
            <span>الإجمالي:</span>
            <span className="text-red-950">{total.toFixed(2)} EGP</span>
          </div>

          <button
            type="submit"
            className="w-full bg-red-950 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-white hover:text-red-950 hover:border-2 hover:border-red-950 transition duration-300"
          >
            متابعة
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutForm;
