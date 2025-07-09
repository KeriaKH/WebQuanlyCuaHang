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

export const getAllVoucher = async () => {
  try {
    const res = await api.get(`/api/voucher`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const addVoucher = async (voucherData) => {
  try {
    const res = await api.post(`/api/voucher/`,voucherData);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const updateVoucher = async (id,voucherData) => {
  try {
    const res = await api.put(`/api/voucher/${id}`,voucherData);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const deleteVoucher = async (id) => {
  try {
    const res = await api.delete(`/api/voucher/${id}`);
    if (res.data) return res.data;
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
