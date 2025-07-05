import React, { useState, useRef, useEffect } from "react";

export const AddressSelect = ({ value, data, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  // Filter data based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item.Name);
    setIsOpen(false);
    setSearchTerm("");
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Chọn tỉnh/thành phố *
      </label>

      {/* Select Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className={selected ? "text-gray-900" : "text-gray-500"}>
          {selected || placeholder}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <button
                  key={item.Id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                    selected === item.Name
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700"
                  } ${
                    index !== filteredData.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {item.Name}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                Không tìm thấy kết quả
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
