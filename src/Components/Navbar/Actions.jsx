import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react"; // ✅ استيراد أيقونة المستخدم

function Actions() {
  return (
    <div className="flex items-center gap-3 sm:gap-4 ml-2 sm:ml-4">
      <Link to="/favorite" className="text-gray-700 hover:text-red-950 transition">
        <Heart />
      </Link>

      <Link to="/cart" className="text-gray-700 hover:text-red-950 transition relative">
        <ShoppingCart />
      </Link>

      <Link to="/profile" className="text-gray-700 hover:text-red-950 transition">
        <User />
      </Link>
    </div>
  );
}

export default Actions;
