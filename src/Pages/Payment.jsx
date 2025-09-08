import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Components/Context/CartContext";
import { useOrders } from "../Components/Context/OrdersContext";
import InputField from "../Components/Auth/InputField";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { createOrder } = useOrders();

  const { formData, cartItems, total } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!paymentData.cardNumber.trim() || paymentData.cardNumber.length < 12)
      newErrors.cardNumber = "رقم البطاقة غير صالح";
    if (!paymentData.expiry.trim()) newErrors.expiry = "تاريخ الانتهاء مطلوب";
    if (!paymentData.cvv.trim() || paymentData.cvv.length < 3)
      newErrors.cvv = "CVV غير صالح";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    createOrder(cartItems, formData, "الدفع بالبطاقة");
    clearCart();
    navigate("/orders");
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-28 mb-6 space-y-6 p-8 bg-pink-50 rounded-2xl shadow-2xl border border-gray-200"
        dir="rtl"
      >
        <h2 className="text-3xl font-extrabold text-center text-red-950 mb-8">
          الدفع بالبطاقة
        </h2>

        <InputField
          icon={FaCreditCard}
          type="text"
          name="cardNumber"
          placeholder="رقم البطاقة"
          value={paymentData.cardNumber}
          onChange={handleChange}
          error={errors.cardNumber}
          className="rounded-lg shadow-sm border border-gray-300"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={FaCalendarAlt}
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={paymentData.expiry}
            onChange={handleChange}
            error={errors.expiry}
            className="rounded-lg shadow-sm border border-gray-300"
          />
          <InputField
            icon={FaLock}
            type="password"
            name="cvv"
            placeholder="CVV"
            value={paymentData.cvv}
            onChange={handleChange}
            error={errors.cvv}
            className="rounded-lg shadow-sm border border-gray-300"
          />
        </div>

        <div className="flex justify-between items-center text-lg font-semibold bg-gray-50 px-4 py-3 rounded-lg border">
          <span>الإجمالي:</span>
          <span className="text-red-950">{total?.toFixed(2)} EGP</span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-800 to-red-950 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:opacity-90 transition duration-300 transform hover:-translate-y-0.5"
        >
          تأكيد الدفع
        </button>
      </form>
      <Footer />
    </>
  );
}

export default PaymentPage;
