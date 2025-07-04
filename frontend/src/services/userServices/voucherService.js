import api from "../api";

export const getVoucher = async (id) => {
  try {
    const res = await api.get(`/api/voucher/${id}`);
    if (res.data) return res.data.voucher;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
