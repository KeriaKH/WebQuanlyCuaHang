import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN } from "../utils/Format";
import ProductPopUp from "./ProductPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ShopCard({ dishDetail }) {
  const [showProductPopUp, setShowProductPopUp] = useState(false);
  const navigate = useNavigate();

  function handleMove() {
    navigate(`shop/${dishDetail._id}`);
  }

  function handleShowPopUp(){
    if(!dishDetail.available)
    {
      toast.warning("Món ăn hiện tại không khả dụng")
      return
    }
    setShowProductPopUp(true)
  }

  return (
    <>
      <div
        className={`flex flex-col rounded-2xl shadow-xl bg-white transition-all duration-300 ${
          !dishDetail.available
            ? "opacity-60"
            : "hover:shadow-2xl hover:-translate-y-1"
        }`}
      >
        <img
          src={dishDetail.image}
          alt={dishDetail.name}
          className="rounded-t-2xl w-full h-60 object-cover"
        />
        <div className="p-2 space-y-1 flex flex-col justify-between">
          <div className="flex justify-between">
            <h3
              className="font-bold text-xl py-2 truncate cursor-pointer"
              onClick={handleMove}
            >
              {dishDetail.name}
            </h3>
          </div>
          <p className="text-gray-500 text-sm">{dishDetail.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {dishDetail.star}
              </span>
              <span className="ml-1 text-sm text-gray-500">({dishDetail.reviewCount} đánh giá)</span>
            </div>
            <p className="text-xl py-2 font-bold text-end">
              {formatCurrencyVN(dishDetail.price)}
            </p>
          </div>
          <button
            className="bg-[rgba(60,152,80,1)] hover:bg-green-800 transition border text-white p-2 text-lg font-semibold rounded-2xl w-full"
            onClick={handleShowPopUp}
          >
            Đặt món
          </button>
        </div>
      </div>
      {showProductPopUp && (
        <ProductPopUp handleClose={setShowProductPopUp} cartItem={dishDetail} />
      )}
    </>
  );
}
