import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { formatCurrencyVN } from "../utils/Format";
import ProductPopUp from "./ProductPopUp";

export default function CartItem({
  cartItem,
  token,
  reloadCart,
  handleDelete,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const deleteOne = async () => {
    await handleDelete(cartItem._id);
    reloadCart();
  };
  return (
    <div className="flex w-full shadow caret-transparent bg-white p-3">
      <button
        className="mr-3 text-xs text-red-500 bg-red-100 my-auto p-1 rounded"
        onClick={deleteOne}
      >
        <FontAwesomeIcon icon={faX} />
      </button>
      <img
        src={cartItem.dishId.image}
        alt={cartItem.dishId.name}
        className="w-24 h-24 object-cover shadow"
      />
      <div className="flex justify-between w-full ml-5 py-2">
        <div className="flex-col flex justify-between">
          <p className="font-bold">{cartItem.dishId.name}</p>
          <p className="italic text-sm text-gray-400">
            {cartItem.selectedOptions?.map(
              (item) => item.optionName + ": " + item.choiceName + ", "
            )}
          </p>
          <p className="font-medium">
            Ghi chú: <span className="font-normal">{cartItem.note}</span>
          </p>
        </div>
        <p className="font-semibold">Số lượng: {cartItem.quantity}</p>
        <div className="flex-col justify-between flex">
          <p className="font-semibold">
            {formatCurrencyVN(
              (cartItem.dishId.price +
                cartItem.selectedOptions?.reduce(
                  (sum, option) => sum + option.price,
                  0
                )) *
                  cartItem.quantity
            )}
          </p>
          <div className="text-red-700 ">
            <button onClick={() => setShowPopup(true)}>Chỉnh sửa</button>
          </div>
        </div>
      </div>
      {showPopup && (
        <ProductPopUp
          handleClose={setShowPopup}
          cartItem={cartItem.dishId}
          token={token}
          isEdit={true}
          reloadCart={reloadCart}
          Quantity={cartItem.quantity}
          Note={cartItem.note}
          CartItemId={cartItem._id}
          options={cartItem.selectedOptions}
        />
      )}
    </div>
  );
}
