import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center bg-white text-center py-6 px-4 mb-6">
      <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-gray-600 bg-white shadow-lg">
        <AlertTriangle className="w-14 h-14 text-gray-600" />
      </div>

      <h1 className="text-6xl font-extrabold text-black mb-4">404</h1>

      <p className="text-2xl text-gray-700">
        الصفحة التي تبحث عنها غير موجودة
      </p>
      <Link
        to="/"
        className="px-8 text-black font-bold text-lg hover:text-red-900 transition mt-2 border-2 border-black hover:border-red-900 rounded-md"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}

export default NotFound;
