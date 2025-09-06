import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function PasswordInput({ name, placeholder, value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <FaLock className="absolute right-3 top-3 text-gray-500" />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2 border rounded-lg bg-transparent"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute left-3 top-3 text-gray-500 hover:text-red-700"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 mt-1 p-2 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
