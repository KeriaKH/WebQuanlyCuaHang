import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faPenToSquare,
  faPlus,
  faSpinner,
  faTrash,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../../services/cloudinary";
import { getCategories } from "../../services/userServices/categoryService";
import {
  deleteDish,
  getDishbyId,
  updateDish,
} from "../../services/userServices/dishService";
import { formatCurrencyVN } from "../../utils/Format";

export default function ProductDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [isSale, setIsSale] = useState(true);
  const [dish, setDish] = useState({});
  const [fileSelected, setFileSelected] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setcategories] = useState([]);
  const { id } = useParams();

  const handleAddOption = () => {
    setDish({
      ...dish,
      option: [...dish.option, { optionName: "", choices: [] }],
    });
  };

  const handleAddChoice = (index) => {
    setDish({
      ...dish,
      option: dish.option.map((item, i) =>
        i === index
          ? {
              ...item,
              choices: [...item.choices, { name: "", price: 0 }],
            }
          : item
      ),
    });
  };

  const handleUpdateOptionName = (index, newName) => {
    setDish({
      ...dish,
      option: dish.option.map((item, i) =>
        i === index ? { ...item, name: newName } : item
      ),
    });
  };

  const handleUpdateChoiceName = (optIndex, choiceIndex, newName) => {
    setDish({
      ...dish,
      option: dish.option.map((item, i) =>
        i === optIndex
          ? {
              ...item,
              choices: item.choices.map((item1, i1) =>
                i1 === choiceIndex ? { ...item1, name: newName } : item1
              ),
            }
          : item
      ),
    });
  };

  const handleUpdateChoicePrice = (optIndex, choiceIndex, newPrice) => {
    setDish({
      ...dish,
      option: dish.option.map((item, i) =>
        i === optIndex
          ? {
              ...item,
              choices: item.choices.map((item1, i1) =>
                i1 === choiceIndex ? { ...item1, price: newPrice } : item1
              ),
            }
          : item
      ),
    });
  };

  const handleDeleteOption = (optIndex) => {
    setDish({
      ...dish,
      option: dish.option.filter((_, i) => i !== optIndex),
    });
  };

  const handleDeleteChoice = (optIndex, choiceIndex) => {
    setDish({
      ...dish,
      option: dish.option.map((item, i) =>
        i === optIndex
          ? {
              ...item,
              choices: item.choices.filter((_, i1) => i1 !== choiceIndex),
            }
          : item
      ),
    });
  };

  const handleUpdateActive = async () => {
    const { _id, ...rest } = dish;
    const tmp={...rest,available:!isSale}
    await updateDish(_id, tmp);
    setIsSale(!isSale);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)");
        return;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
        return;
      }
      setFileSelected(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const { _id, ...rest } = dish;
    let dishWiwhoutId = rest;
    setIsUpLoading(true);
    if (fileSelected) {
      const image = await uploadImage(fileSelected);
      dishWiwhoutId = { ...dishWiwhoutId, image:image.imageUrl };
    }
    await updateDish(_id, dishWiwhoutId);
    setIsUpLoading(false);
    setFileSelected(null);
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    await deleteDish(dish._id);
    nav("/Product");
  };

  useEffect(() => {
    getDishbyId(id).then((res) => {
      console.log(res.dish);
      setDish(res.dish);
      setIsSale(res.dish.available);
    });
    getCategories().then((res) => {
      console.log(res);
      setcategories(res.categories);
    });
  }, [id]);
  const nav = useNavigate();
  return (
    <div className="w-[80%] mx-auto">
      <div className="bg-white rounded-xl shadow p-4 flex justify-between">
        <div className="flex items-center gap-4 ">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => nav("/Product")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Chi tiết món ăn
            </h1>
            <p className="text-gray-600">{dish._id}</p>
          </div>
        </div>
        <div className="p-2 space-x-3 flex">
          <div className="py-2 transition">
            <button
              className={`${
                isSale ? "bg-green-500" : "bg-red-500"
              } text-white p-2 rounded-xl`}
              onClick={handleUpdateActive}
            >
              {isSale ? (
                <>
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  Đang bán
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                  Dừng bán
                </>
              )}
            </button>
          </div>
          {isEditing ? (
            <div className="p-2 space-x-3">
              <button
                className={`${
                  isUpLoading ? "bg-gray-500" : "bg-green-600"
                } p-2 text-white rounded-xl`}
                onClick={handleUpdate}
              >
                {isUpLoading ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin mr-2"
                    />
                    Đang Lưu...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                    Lưu
                  </>
                )}
              </button>
              <button
                className="bg-gray-600 p-2 text-white rounded-xl"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FontAwesomeIcon icon={faXmark} className="mr-2" />
                Hủy
              </button>
            </div>
          ) : (
            <div className="p-2 space-x-3">
              <button
                className="bg-blue-600 p-2 text-white rounded-xl"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                Chỉnh sửa
              </button>
              <button
                className="bg-red-600 p-2 text-white rounded-xl"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-5 w-full bg-gray-100 p-5 mt-5 rounded-2xl">
        <div className="w-[40%] h-90 flex flex-col items-center caret-transparent ">
          <img
            src={previewImage || dish.image}
            alt=""
            className="w-full h-90 object-cover shadow"
          />
          {isEditing ? (
            <label className="bg-blue-500 text-white px-4 py-2 mt-5 rounded cursor-pointer text-sm hover:bg-blue-600 transition">
              Thay hình ảnh
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 w-full min-h-90">
          <div className="space-y-4 ">
            <div className="flex items-center">
              <label className="font-medium text-gray-700 w-34">
                Tên món ăn :
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={dish.name}
                  onChange={(e) => setDish({ ...dish, name: e.target.value })}
                  className="w-[80%] p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              ) : (
                <p className=" font-semibold text-gray-800 text-2xl">
                  {dish.name}
                </p>
              )}
            </div>
            <div className="flex items-center ">
              <label className="font-medium text-gray-700 w-34">Giá :</label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="number"
                    value={dish.price}
                    onChange={(e) =>
                      setDish({ ...dish, price: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  />
                </div>
              ) : (
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrencyVN(dish.price)}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <label className=" font-medium text-gray-700 w-34">
                phân loại :
              </label>
              {isEditing ? (
                <select
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  value={dish.categoryId}
                  onChange={(e) =>
                    setDish({ ...dish, categoryId: e.target.value })
                  }
                >
                  {categories.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {categories?.find((item) => item._id === dish.categoryId)?.categoryName}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <label className=" font-medium text-gray-700 w-34">Mô tả :</label>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={dish.description}
                  onChange={(e) =>
                      setDish({ ...dish, description: e.target.value })
                    }
                  className="w-[80%] p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {dish.description}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label className=" font-medium text-gray-700 w-30">
                Các lựa chọn:
              </label>
              {isEditing ? (
                <div className="space-y-5">
                  <div className="space-y-3">
                    {dish.option?.map((option, optionIndex) => (
                      <div
                        className="bg-gray-100 p-4 rounded-2xl border border-gray-300 space-y-4"
                        key={optionIndex}
                      >
                        <div className="space-x-2 flex items-center">
                          <input
                            type="text"
                            value={option.optionName}
                            placeholder="tên lựa chọn"
                            onChange={(e) =>
                              handleUpdateOptionName(
                                optionIndex,
                                e.target.value
                              )
                            }
                            className="border-gray-400 border p-2 rounded-xl bg-white focus:outline-none"
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDeleteOption(optionIndex)}
                            className="text-red-500 hover:bg-red-100 p-2 transition rounded"
                          />
                        </div>
                        <p className="text-gray-500">Các lựa chọn</p>
                        <div className="space-y-2">
                          {option.choices.map((choice, choiceIndex) => (
                            <div
                              className="space-x-2 flex items-center"
                              key={choiceIndex}
                            >
                              <input
                                type="text"
                                placeholder="lựa chọn"
                                value={choice.name}
                                onChange={(e) =>
                                  handleUpdateChoiceName(
                                    optionIndex,
                                    choiceIndex,
                                    e.target.value
                                  )
                                }
                                className="border-gray-400 border p-2 rounded-xl bg-white focus:outline-none"
                              />
                              <input
                                type="number"
                                placeholder="giá tiền"
                                value={choice.price}
                                min={0}
                                onChange={(e) =>
                                  handleUpdateChoicePrice(
                                    optionIndex,
                                    choiceIndex,
                                    e.target.value
                                  )
                                }
                                className="border-gray-400 border p-2 rounded-xl bg-white focus:outline-none"
                              />
                              <FontAwesomeIcon
                                icon={faX}
                                onClick={() =>
                                  handleDeleteChoice(optionIndex, choiceIndex)
                                }
                                className="text-red-500 hover:bg-red-100 p-2 transition rounded"
                              />
                            </div>
                          ))}
                        </div>
                        <button
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleAddChoice(optionIndex)}
                        >
                          <FontAwesomeIcon icon={faPlus} /> Thêm Lựa chọn
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-green-500 p-2 text-white rounded-lg"
                    onClick={handleAddOption}
                  >
                    Thêm lựa chọn
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {dish.option?.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      Chưa có lựa chọn nào. Bấm "Chỉnh sửa" để thêm.
                    </div>
                  ) : (
                    dish.option?.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-gray-800 mb-2">
                          {option.optionName || "Chưa đặt tên"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {option.choices.length === 0 ? (
                            <span className="text-gray-400 text-sm">
                              Chưa có lựa chọn
                            </span>
                          ) : (
                            option.choices.map((choice, choiceIndex) => (
                              <span
                                key={choiceIndex}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                              >
                                {choice.name +
                                  ": +" +
                                  formatCurrencyVN(choice.price) || "Trống"}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
