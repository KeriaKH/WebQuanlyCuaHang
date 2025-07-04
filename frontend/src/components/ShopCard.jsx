import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN } from "../utils/Format";
import ProductPopUp from "./ProductPopUp";

export default function ShopCard({ dishDetail}) {
  const [showProductPopUp, setShowProductPopUp] = useState(false);
  const navigate = useNavigate();

  function handleMove() {
    navigate(`shop/${dishDetail._id}`);
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
        <div className="p-2 space-y-1 flex flex-col justify-center">
          <div className="flex justify-between">
            <h3
              className="font-bold text-xl py-2 truncate cursor-pointer"
              onClick={handleMove}
            >
              {dishDetail.name}
            </h3>
            <div className="flex space-x-2 text-yellow-500">
              <p>{dishDetail.review}</p>
              <p> {dishDetail.star} ★ </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{dishDetail.description}</p>
          <p className="text-xl py-2 font-bold text-end">
            {formatCurrencyVN(dishDetail.price)}
          </p>
          <button className="bg-[rgba(60,152,80,1)] hover:bg-green-800 transition border text-white p-2 text-lg font-semibold rounded-2xl w-full" onClick={()=>setShowProductPopUp(true)}>
            Đặt món
          </button>
        </div>
      </div>
      {showProductPopUp && <ProductPopUp handleClose={setShowProductPopUp} cartItem={dishDetail} />}
    </>
  );
}
