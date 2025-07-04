import {
  faLocationDot,
  faPenToSquare,
  faPhone,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { formatAddress } from "../utils/Format";

export default function AddressItem({
  address,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
        address.default ? "border-l-green-500" : "border-l-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 ">
            <h3 className="text-xl font-semibold text-gray-800">
              {address.title}
            </h3>
            {address.default && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faStar} className="fill-current" />
                Mặc định
              </span>
            )}
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
            <span>{address.phone}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-gray-400" />
            <span>{formatAddress(address)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {!address.default && (
            <button
              onClick={() => handleSetDefault(address)}
              className="text-gray-500 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-colors"
              title="Đặt làm mặc định"
            >
              <FontAwesomeIcon icon={faStar} />
            </button>
          )}
          <button
            onClick={() => handleEdit(address)}
            className="text-gray-500 hover:text-green-500 p-2 rounded-lg hover:bg-green-50 transition-colors"
            title="Chỉnh sửa"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            onClick={() => handleDelete(address)}
            className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="Xóa"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
