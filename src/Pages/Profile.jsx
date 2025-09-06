import { FaUser, FaEnvelope, FaPhone, FaAddressBook } from "react-icons/fa";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useUser } from "../Components/Context/UserContext";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-600 text-lg">لا يوجد بيانات مستخدم</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-28 mb-6 bg-white  h-full shadow-lg rounded-2xl p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-4xl text-red-950">
            <FaUser />
          </div>
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">الملف الشخصي</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-gray-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-gray-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaAddressBook className="text-gray-500" />
            <span>{user.address}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
