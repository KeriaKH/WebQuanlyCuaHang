import api from "../api";

export const getDishs = async (
  page,
  limit,
  search = "",
  category,
  sortBy,
  sortOrder
) => {
  try {
    const res = await api.get(
      sortOrder
        ? `/api/dish?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&category=${category}`
        : `/api/dish?page=${page}&limit=${limit}&search=${search}&category=${category}`
    );
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getDishbyId = async (id) => {
  try {
    const res = await api.get(`/api/dish/${id}`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const addCartItem = async (id, cartItem) => {
  try {
    const res = await api.post("/api/user/cart/add", { id, cartItem });
    if (res.status === 200) {
      return res.data.message;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const getCart = async (id) => {
  try {
    const res = await api.get(`/api/user/cart/${id}`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const updateCartItem = async (id, cartItem) => {
  try {
    const res = await api.put(`/api/user/cart/update`, { cartItem, id });
    if (res.status === 200) {
      return res.data.message;
    }
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const deleteCartItem = async (id, cartItemId) => {
  try {
    const res = await api.delete(
      `/api/user/cart/delete?id=${id}&cartItemId=${cartItemId}`
    );
    if (res.status === 200) {
      return res.data.message;
    }
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
