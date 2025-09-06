import LoginForm from "../Components/Auth/LoginForm";
import logo from "../../public/images/logo3.png";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md bg-stone-50 backdrop-blur-md rounded-2xl shadow-lg p-8 relative">
        <img
          src={logo}
          alt="logo"
          className="w-20 h-16 mx-auto mb-4 rounded-md drop-shadow-[0_4px_6px_rgba(127,29,29,0.8)]"
        />
        <h2 className="text-3xl font-bold text-center text-red-950 mb-2">
          مرحباً بعودتك
        </h2>
        <p className="text-gray-700 text-center mb-6">
          سجّل الدخول للوصول إلى العروض الحصرية، الوصفات والفعاليات!
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
