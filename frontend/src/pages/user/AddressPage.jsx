import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddressItem from "../../components/AddressItem";
import AddressPopUp from "../../components/AddressPopUp";
import { useAuth } from "../../components/common/AuthContext";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../services/userServices/addressService";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getAddress(user.id).then((res) => {
      console.log(res);
      setAddresses(res);
    });
  }, [user]);

  // Mở modal thêm mới
  const handleAdd = () => {
    setFormData({});
    setShowModal(true);
  };

  // Mở modal chỉnh sửa
  const handleEdit = (address) => {
    setFormData(address);
    setShowModal(true);
  };

  // Xóa địa chỉ
  const handleDelete = async (address) => {
    if (address?.default) {
      alert("Không thể xóa địa chỉ mặc định!");
      return;
    }
    await deleteAddress(user.id, address._id);
    setAddresses(addresses.filter((item) => item._id !== address._id));
  };

  // Đặt làm địa chỉ mặc định
  const handleSetDefault = (address) => {
    const tmp = { ...address, default: true };
    updateAddress(user.id, tmp);
    setAddresses(
      addresses.map((addr) =>
        addr._id.toString() === address._id.toString()
          ? { ...addr, default: true }
          : { ...addr, default: false }
      )
    );
  };

  // Lưu địa chỉ (thêm mới hoặc cập nhật)
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.detailed_address.trim()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formData._id) {
      await updateAddress(user.id, formData);
      console.log("sửa địa chỉ thành công");
      setAddresses(
        addresses.map((addr) =>
          addr._id.toString() === formData._id.toString()
            ? { ...addr, ...formData }
            : formData.default
            ? { ...addr, default: false }
            : addr
        )
      );
    } else {
      const tmp=await addAddress(user.id, formData)
      console.log("thêm địa chỉ thành công");
      setAddresses([
        ...addresses.map((addr) =>
          tmp.default ? { ...addr, default: false } : addr
        ),
        tmp,
      ]);
    }

    setShowModal(false);
    setFormData({});
  };

  return (
    <div className="w-[70vw] min-h-[60vh] bg-gray-50 p-6 mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b">
          <h1 className="text-5xl text-gray-800 dancing-script-700">
            Quản Lý Địa Chỉ
          </h1>
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ml-auto mb-4"
        >
          <FontAwesomeIcon icon={faPlus} />
          Thêm Địa Chỉ
        </button>

        {/* Danh sách địa chỉ */}
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-gray-300 mx-auto mb-4"
              />
              {/* <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" /> */}
              <p className="text-gray-500 text-lg">Chưa có địa chỉ nào</p>
              <button
                onClick={handleAdd}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Thêm địa chỉ đầu tiên
              </button>
            </div>
          ) : (
            addresses?.map((address, index) => (
              <AddressItem
                address={address}
                handleEdit={handleEdit}
                key={index}
                handleDelete={handleDelete}
                handleSetDefault={handleSetDefault}
              />
            ))
          )}
        </div>

        {/* Modal thêm/sửa địa chỉ */}
        {showModal && (
          <AddressPopUp
            formData={formData}
            setFormData={setFormData}
            setShowModal={setShowModal}
            handleSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}
