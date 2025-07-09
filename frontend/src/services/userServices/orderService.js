import api from "../api";

export const checkout = async (orderData) => {
  try {
    const res = await api.post("/api/order/checkout", { orderData });
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const getOrderByUserId = async (id, page, limit,delivered) => {
  try {
    const res = await api.get(
      `/api/order/user/${id}?page=${page}&limit=${limit}&delivered=${delivered}`
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

export const getOrder = async (
  page,
  limit,
  search,
  status,
  sortBy,
  sortOrder
) => {
  try {
    const res = await api.get(
      sortBy && sortOrder !== 0
        ? `api/order?page=${page}&limit=${limit}&search=${search}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : `api/order?page=${page}&limit=${limit}&search=${search}&status=${status}`
    );
    if (res.data) return res.data;
    return {};
  } catch (error) {
    return error.response.data.message;
  }
};

export const confirmOrder = async (id) => {
  try {
    const res = await api.put(`/api/order/confirm/${id}`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
