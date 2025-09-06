import { X } from "lucide-react";
import Filters from "./Filters";

function SidebarFilters({ sidebarOpen, setSidebarOpen, ...filterProps }) {
  if (!sidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end"
      onClick={() => setSidebarOpen(false)}
    >
      <div
        className="w-72 bg-white h-full p-6 shadow-lg relative z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 left-4 text-gray-700 hover:text-red-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-red-950 mb-6">تصفية المنتجات</h3>
        <Filters {...filterProps} />
      </div>
    </div>
  );
}

export default SidebarFilters;
