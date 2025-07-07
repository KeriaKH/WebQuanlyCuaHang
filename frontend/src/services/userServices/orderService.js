import api from "../api";

export const checkout = async (orderData) => {
  try {
    const res = await api.post("/api/order", { orderData });
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const getOrderByUserId = async (id, page, limit) => {
  try {
    const res = await api.get(
      `/api/order/user/${id}?page=${page}&limit=${limit}`
    );
    if (res.data) return res.data;
    return [];
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const getOrderById = async (id) => {
  try {
    const res = await api.get(`/api/order/${id}`);
    if (res.data) return res.data;
    return [];
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const getDashboarData = async () => {
  try {
    const res = await api.get(`/api/order/dashboard`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
