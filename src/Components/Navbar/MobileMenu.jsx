import { path } from "framer-motion/client";
import { useUser } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function MobileMenu() {
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
    <>
      <ul className="transition-all duration-500 ease-in-out mb-2 bg-stone-50 flex flex-col gap-5 text-gray-700 font-semibold items-center shadow-md p-6 lg:hidden absolute right-0 left-0 top-full w-screen z-50">
        {menuItems.map((item) => (
          <li key={item.id} className="hover:text-red-950 border-b border-gray-200">
            {item.path ? (
              <Link to={item.path}>{item.name}</Link>
            ) : (
              <a href={`#${item.id}`}>{item.name}</a>
            )}
          </li>
        ))}
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
      </ul>
    </>
  );
}
export default MobileMenu;