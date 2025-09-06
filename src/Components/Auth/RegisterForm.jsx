import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import PasswordRules from "./PasswordRules";
import { FaUser, FaEnvelope, FaPhone, FaAddressBook } from "react-icons/fa";

function RegisterForm() {
  const { register } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const passwordRules = [
    { regex: /.{8,}/, label: "٨ أحرف على الأقل" },
    { regex: /[a-z]/, label: "حرف صغير واحد على الأقل" },
    { regex: /[A-Z]/, label: "حرف كبير واحد على الأقل" },
    { regex: /\d/, label: "رقم واحد على الأقل" },
    { regex: /[@$!%*?&_]/, label: "رمز خاص واحد على الأقل (@$!%*?&_)" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = " الاسم يجب أن يحتوي على 3 أحرف على الأقل";
    }
    if (!formData.email) {
      newErrors.email = " البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = " البريد الإلكتروني غير صالح";
    }
    if (!formData.password) {
      newErrors.password = " كلمة المرور مطلوبة";
    } else if (!passwordRules.every((rule) => rule.regex.test(formData.password))) {
      newErrors.password = " كلمة المرور لا تحقق جميع الشروط";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = " تأكيد كلمة المرور غير مطابق";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = register(formData);
    if (result.success) {
      navigate("/");
    } else {
      setErrors({ email: result.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        icon={FaUser}
        type="text"
        name="name"
        placeholder="الاسم الكامل"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <InputField
        icon={FaEnvelope}
        type="email"
        name="email"
        placeholder="البريد الإلكتروني"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <InputField
        icon={FaPhone}
        type="phone"
        name="phone"
        placeholder="رقم التليفون"
        value={formData.phone}
        onChange={handleChange}
      />
      <InputField
        icon={FaAddressBook}
        type="address"
        name="address"
        placeholder="العنوان"
        value={formData.address}
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        placeholder="كلمة المرور"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <PasswordInput
        name="confirmPassword"
        placeholder="تأكيد كلمة المرور"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <PasswordRules password={formData.password} rules={passwordRules} />
      <button
        type="submit"
        className="w-full bg-red-950 text-white py-2 rounded-lg font-semibold hover:bg-white hover:text-red-950 hover:border-2 hover:border-red-950 transition duration-300"
      >
        تسجيل حساب
      </button>
      <p className="text-center text-gray-700 mt-4">
        لديك حساب بالفعل؟{" "}
        <Link to="/login" className="text-red-950 font-semibold hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
