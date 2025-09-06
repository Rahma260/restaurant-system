function InputField({ icon: Icon, type, name, placeholder, value, onChange, error }) {
  return (
    <div className="relative" dir="rtl">
      {Icon && <Icon className="absolute right-3 top-3 text-gray-500" />}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-8 py-2 border rounded-lg bg-transparent"
      />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 mt-1 p-2 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

export default InputField;
