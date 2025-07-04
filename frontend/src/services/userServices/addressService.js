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
