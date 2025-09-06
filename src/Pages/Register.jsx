import RegisterForm from "../Components/Auth/RegisterForm";
import logo from "../../public/images/logo3.png";

function Register() {
  return (
    <div className="h-full py-6 flex items-center justify-center px-6" dir="rtl">
      <div className="w-full max-w-md bg-stone-50 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <img
          src={logo}
          alt="logo"
          className="w-20 h-16 mx-auto mb-4 rounded-md drop-shadow-[0_4px_6px_rgba(127,29,29,0.8)]"
        />
        <h2 className="text-3xl font-bold text-center text-red-950 mb-2">
          انضم إلى عائلتنا
        </h2>
        <p className="text-gray-700 text-center mb-6">
          سجّل الآن واحصل على عروض حصرية، وصفات، وفعاليات مميزة!
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
