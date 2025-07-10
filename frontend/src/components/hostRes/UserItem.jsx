import React from "react";
import { formatDateVN, formatDateVN1, formatDateVN2 } from "../../utils/Format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function UserItem({item}) {

  // Calculate age from DOB
  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header with avatar and name */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
              item.role
            )}`}
          >
            <FontAwesomeIcon icon={faUsers} className="w-3 h-3 mr-1" />
            {item.role}
          </span>
        </div>
      </div>

      {/* User details */}
      <div className="space-y-3">
        {/* Date of Birth */}
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-sm font-medium text-gray-700">
              Ngày sinh:
            </span>
            <span className="text-sm text-gray-600 ml-2">
              {formatDateVN1(item.dob)} ({calculateAge(item.dob)} tuổi)
            </span>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 flex items-center justify-center">
            <div
              className={`w-3 h-3 rounded-full ${
                item.gender.toLowerCase() === "nam" ? "bg-blue-400" : "bg-pink-400"
              }`}
            ></div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">
              Giới tính:
            </span>
            <span className="text-sm text-gray-600 ml-2">{item.gender}</span>
          </div>
        </div>

        {/* Created Date */}
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-sm font-medium text-gray-700">Ngày tạo:</span>
            <span className="text-sm text-gray-600 ml-2">
              {formatDateVN(item.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
