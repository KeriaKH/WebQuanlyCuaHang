import { createContext, useContext, useEffect, useState } from "react";
import {
  getUserData,
  getUserRole,
  IsLogin,
  login,
  logout,
} from "../../services/authServices/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(IsLogin());
  const [user, setUser] = useState(getUserData());
  const [role, setRole] = useState(getUserRole());
  const [resId, setResId] = useState("");

  const Login = async (email, password) => {
    const res = await login(email, password);
    if (res.token) {
      setIsLogin(true);
      setUser(getUserData());
      setRole(getUserRole());
    }
    return res;
  };

  const Logout = async () => {
    logout();
    setIsLogin(false);
    setUser({});
    setRole(null);
    setResId("");
  };

  useEffect(() => {
    if (IsLogin()) {
      setIsLogin(true);
      const userData = getUserData();
      setUser(userData);
      setRole(getUserRole());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, user, Login, Logout, role, resId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
