import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductInfo({
  item,
  quantity,
  handleIncrease,
  handleDecrease,
  handleAddToCart,
  categoryId
}) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-6">
      <h1 className="text-4xl font-extrabold text-amber-900">{item.name}</h1>
      <p className="text-3xl font-semibold text-orange-700">{item.price}</p>
      <p className="text-gray-600 text-lg">{item.description}</p>

      <div className="flex items-center gap-4 mt-4">
        <button onClick={handleDecrease} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">-</button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button onClick={handleIncrease} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">+</button>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 px-8 py-3 bg-red-900 text-white font-semibold rounded-full hover:bg-white hover:text-red-950 border-2 border-red-950 transition flex items-center gap-2 w-fit"
      >
        <ShoppingCart className="w-5 h-5" />
        أضف إلى السلة
      </button>
      <button
        className="mt-4 px-14 py-3 bg-red-900 text-white font-semibold rounded-full hover:bg-white hover:text-red-950 border-2 border-red-950 transition flex items-center gap-2 w-fit">
        <Link to="/checkout">
          اتمام الطلب
        </Link>
      </button>

      <Link to={`/products/${categoryId}`} className="mt-4 text-gray-700 hover:text-red-950 underline">
        العودة إلى المنتجات
      </Link>
    </div>
  );
}

export default ProductInfo;
