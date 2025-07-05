import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAddressData } from "../services/userServices/addressService";
import { AddressSelect } from "./AddressSelect";

export default function AddressPopUp({
  formData,
  setFormData,
  setShowModal,
  handleSave,
}) {
  const [data, setData] = useState({});
  const [province, setProvince] = useState({ Name: formData.province });
  const [district, setDistrict] = useState({ Name: formData.district });
  const [ward, setWard] = useState({ Name: formData.ward });
  useEffect(() => {
    getAddressData().then((res) => {
      setData(res);
    });
  }, []);

  const handleProvinceSelect = (selectedProvince) => {
    setProvince(selectedProvince);
    setDistrict({});
    setWard({});
    setFormData({
      ...formData,
      province: selectedProvince.Name,
      district: "",
      ward: "",
    });
  };

  const handleDistrictSelect = (selectedDistrict) => {
    setDistrict(selectedDistrict);
    setWard({});
    setFormData({
      ...formData,
      district: selectedDistrict.Name,
      ward: "",
    });
  };
  const handleWardSelect = (selectedWard) => {
    setWard(selectedWard);
    setFormData({
      ...formData,
      ward: selectedWard.Name,
    });
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {formData._id ? "Chỉnh Sửa Địa Chỉ" : "Thêm Địa Chỉ Mới"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="VD: Nhà riêng, Văn phòng..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Nhập số điện thoại"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <AddressSelect
              value={province.Name || ""}
              data={data}
              placeholder={"chọn tỉnh/thành phố"}
              onSelect={handleProvinceSelect}
            />
            <AddressSelect
              value={district.Name || ""}
              data={province.Id ? province.Districts : {}}
              placeholder={"Chọn Quận/Huyện"}
              onSelect={handleDistrictSelect}
            />
            <AddressSelect
              value={ward.Name || ""}
              data={district.Id ? district.Wards : {}}
              placeholder={"Chọn Phường/Xã"}
              onSelect={handleWardSelect}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ đầy đủ *
              </label>
              <textarea
                value={formData.detailed_address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, detailed_address: e.target.value })
                }
                placeholder="Nhập địa chỉ đầy đủ..."
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="default"
                checked={formData.default || false}
                onChange={(e) =>
                  setFormData({ ...formData, default: e.target.checked })
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="default" className="ml-2 text-sm text-gray-700">
                Đặt làm địa chỉ mặc định
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {formData._id ? "Cập Nhật" : "Thêm Mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
