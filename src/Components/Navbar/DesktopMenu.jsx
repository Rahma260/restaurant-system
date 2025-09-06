import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { path } from "framer-motion/client";

function DesktopMenu() {
  const { user, token, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const menuItems = [
    { name: "الرئيسية", id: "home", path: "/" },
    { name: "تواصل معنا", path: "/contact" },
    { name: "الفئات", id: "categories", path: "/products/1" },
    { name: "من نحن", path: "/about" },
  ];
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center gap-4 xl:gap-8">
      <ul className="flex gap-4 xl:gap-8 text-gray-700 font-bold">
        {menuItems.map((item) => (
          <li key={item.id} className="relative group">
            {item.path ? (
              <Link to={item.path}>{item.name}</Link>
            ) : (
              <a href={`#${item.id}`}>{item.name}</a>
            )}
            <span className="absolute right-0 -bottom-1 w-0 h-[2px] bg-red-950 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {token ? (
        <button
          onClick={handleLogout}
          className="text-white ml-2 py-2 px-4 xl:px-5 bg-red-950 rounded-md border-2 drop-shadow-[0_4px_6px_rgba(127,29,29,0.8)] border-red-950 
          hover:bg-white hover:text-red-950 hover:border-red-950 transition duration-300 text-sm lg:text-base"
        >
          تسجيل الخروج
        </button>
      ) : (
        <button className="text-white ml-2 py-2 px-4 xl:px-5 bg-red-950 rounded-md border-2 drop-shadow-[0_4px_6px_rgba(127,29,29,0.8)] border-red-950 
                       hover:bg-white hover:text-red-950 hover:border-red-950 transition duration-300 text-sm lg:text-base">
          <Link to="/register">التسجيل</Link>
        </button>
      )}
    </div>
  );
}

export default DesktopMenu;
