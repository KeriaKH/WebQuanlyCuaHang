import api from "../api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    if (response.data.token) {
      const userData = {
        id: response.data.User._id,
        token: response.data.token,
        email: email,
        role: response.data.User.role,
        expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000,
      };
      localStorage.setItem(
        import.meta.env.VITE_LOCAL_STORAGE_KEY,
        JSON.stringify(userData)
      );
      return {
        id: response.data.User._id,
        token: response.data.token,
        email: email,
        role: response.data.User.role,
      };
    }

    return {
      message: response.data?.message || "Đăng nhập thất bại",
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.response?.data?.error || "Đã xảy ra lỗi khi đăng nhập",
    };
  }
};

export const signUp = async (data) => {
  try {
    const res = await api.post(`/api/user/signUp`, data);
    if (res.data) return res.data;
    else return {};
  } catch (error) {
    return {message: error.response?.data?.error || "Đã xảy ra lỗi khi đăng ký"};
  }
};

export const logout = () => {
  localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY);
  if (api.defaults && api.defaults.headers.common["Authorization"]) {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const IsLogin = () => {
  try {
    const userData = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)
    );
    if (!userData || !userData.token) return false;

    if (userData.expiresAt && userData.expiresAt < new Date().getTime()) {
      logout();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

export const getUserData = () => {
  try {
    const userData = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)
    );
    if (userData) return userData;
    return {};
  } catch (error) {
    console.log("Error getting user data:", error);
    return {};
  }
};

export const getUserRole = () => {
  try {
    const userData = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)
    );
    if (userData) return userData.role;
    return "";
  } catch (error) {
    console.log("Error getting user data:", error);
    return "";
  }
};
