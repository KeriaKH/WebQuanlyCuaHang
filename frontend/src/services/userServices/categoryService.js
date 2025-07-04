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
