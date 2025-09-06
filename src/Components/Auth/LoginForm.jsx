import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useLoading } from "../Context/LoadingContext";
import Loading from "../Loading";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import { FaEnvelope } from "react-icons/fa";

function LoginForm() {
  const { login } = useUser();
  const { loading, showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        showLoading();
        setTimeout(() => {
          hideLoading();
          navigate("/");
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    }
  };

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          icon={FaEnvelope}
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          error={error}
        />
        <PasswordInput
          name="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-red-950 text-white py-2 rounded-lg font-semibold hover:bg-white hover:text-red-950 hover:border-2 hover:border-red-950 transition duration-300"
        >
          تسجيل الدخول
        </button>
        <p className="text-center text-gray-700 mt-4">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-red-950 font-semibold hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </form>
    </>
  );
}

export default LoginForm;
