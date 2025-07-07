import api from "./api";

export const uploadImage = async (selectedFile) => {
  if (!selectedFile) {
    console.log("Vui lòng chọn file");
    return;
  }
  try {
    const formData = new FormData();
    formData.append("image", selectedFile);
    const response = await api.post("/api/cloudinary/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
