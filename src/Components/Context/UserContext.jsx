import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const register = (formData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.some((u) => u.email === formData.email);
    if (exists) return { success: false, message: "البريد الإلكتروني مسجل مسبقًا" };

    const newUser = { ...formData };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const fakeToken = btoa(formData.email + ":" + formData.password);
    setUser(newUser);
    setToken(fakeToken);

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", fakeToken);

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) return { success: false, message: " البريد الإلكتروني أو كلمة المرور خاطئة" };

    const fakeToken = btoa(email + ":" + password);
    setUser(user);
    setToken(fakeToken);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", fakeToken);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
