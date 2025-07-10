import api from "../api";

export const getUserbyId = async (id) => {
  try {
    const res = await api.get(`/api/user/${id}`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const res = await api.put(`/api/user/update/${id}`, userData);
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getUser = async (page, limit, search, sortBy, sortOrder) => {
  try {
    const res = await api.get(
      sortBy && sortOrder !== 0
        ? `/api/user?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : `/api/user?page=${page}&limit=${limit}&search=${search}`
    );
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};
