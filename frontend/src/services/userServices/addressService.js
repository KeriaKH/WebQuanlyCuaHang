import api from "../api";

export const getAddressData = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    const data = await res.json();
    return data || {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getAddress = async (id) => {
  try {
    const res = await api.get(`/api/user/${id}/address`);
    if (res.status === 200) {
      return res.data.address;
    }
    return [];
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const addAddress = async (id, address) => {
  try {
    const res = await api.post(`/api/user/${id}/address/add`, { address });
    if (res.status === 200) {
      return res.data;
    }
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const deleteAddress = async (id, addressId) => {
  try {
    const res = await api.delete(`/api/user/${id}/address/delete/${addressId}`);
    if (res.status === 200) {
      return res.data.message;
    }
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const updateAddress = async (id, address) => {
  try {
    const res = await api.put(`/api/user/${id}/address/update`, { address });
    if (res.status === 200) {
      return res.data.address;
    }
    return {};
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
