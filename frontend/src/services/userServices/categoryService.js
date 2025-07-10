import api from "../api";

export const getCategories = async () => {
  try {
    const res = await api.get(`/api/category/`);
    if (res.data) return res.data;
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (name) => {
  try {
    const res = await api.post(`/api/category/`,{categoryName:name});
    if (res.data) return res.data;
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/api/category/${id}`);
    if (res.data) return res.data;
    return [];
  } catch (error) {
    console.log(error);
  }
};