import api from "../api";

export const getReviews = async (id, page, limit, star) => {
  try {
    const res = await api.get(
      `/api/review/${id}?page=${page}&limit=${limit}&star=${star}`
    );
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const addReview = async (reviewData) => {
  try {
    const res = await api.post(`/api/review/add`,reviewData);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};
