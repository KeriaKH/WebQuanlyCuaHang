import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { addCartItem, updateCartItem } from "../services/userServices/dishService";
import { formatCurrencyVN } from "../utils/Format";
import { useAuth } from "./common/AuthContext";

export default function ProductPopUp({
  cartItem,
  handleClose,
  isEdit=false,
  reloadCart,
  Quantity,
  Note,
  options,
  CartItemId
}) {
  const productRef = useRef(null);
  const { user } = useAuth();
  const [showError, setShowError] = useState(false);
  const [quantity, setQuantity] = useState(Quantity || 1);
  const [note, setnote] = useState(Note || "");
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (options && options.length > 0) {
      return options;
    }
    return [];
  });
  const [data, setData] = useState({
    dishId: cartItem?._id,
    quantity: quantity,
    selectedOptions: selectedOptions,
    note: note,
  });

  const isChoiceSelected = (optionIndex, choiceName) => {
    return selectedOptions.some(
      (option, index) =>
        index === optionIndex && option.choiceName === choiceName
    );
  };

  const hanndleOptionsChange = (optIndex, choiceName, optionName,price) => {
    setSelectedOptions((prev) => {
      const newOptions = [...prev];
      const existingOptionIndex = newOptions.findIndex(
        (_, index) => index === optIndex
      );
      console.log(existingOptionIndex);
      if (existingOptionIndex !== -1) {
        newOptions[existingOptionIndex] = {
          optionName,
          choiceName,
          price
        };
      } else {
        newOptions.push({
          optionName,
          choiceName,
          price
        });
      }
      setData({ ...data, selectedOptions: newOptions });
      return newOptions;
    });
  };

  const handleSave = async () => {
    if(isEdit)
    {
      await updateCartItem(user.id, {...data, _id: CartItemId});
      reloadCart();
      handleClose(false)
      return;
    }
    await addCartItem(user.id, data);
    handleClose(false)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productRef.current && !productRef.current.contains(event.target)) {
        handleClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
      <div className="bg-white shadow-lg w-100 rounded-4xl" ref={productRef}>
        <img
          src={cartItem?.image}
          alt={cartItem?.name}
          className="rounded-t-4xl shadow h-90 w-full object-cover"
        />
        <div className="p-6">
          <div className="pb-3 mb-2 space-y-2">
            <div className="font-semibold flex justify-between">
              <p>{cartItem?.name}</p>
              <p>{formatCurrencyVN(cartItem?.price)}</p>
            </div>
            <p className="text-gray-400 text-sm">{cartItem.description}</p>
          </div>
          {showError && (
            <div className="text-red-500 bg-red-100 p-2 font-semibold text-center">
              Lựa chọn đủ các option
            </div>
          )}
          <div className="mb-4 ">
            {cartItem?.option?.map((item, index) => (
              <div key={index}>
                <p className="font-semibold mb-2">{item.optionName}</p>
                {item.choices?.map((item1, index1) => (
                  <div className="flex justify-between space-y-2" key={index1}>
                    <div className="flex space-x-2">
                      <input
                        type="radio"
                        value={item1.name}
                        checked={isChoiceSelected(index, item1.name)}
                        onChange={() =>
                          hanndleOptionsChange(index, item1.name, item.optionName,item1.price)
                        }
                      />
                      <p>{item1.name}</p>
                    </div>
                    <p>+{formatCurrencyVN(item1.price)}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="font-semibold">Ghi chú</p>
          <input
            type="text"
            defaultValue={note}
            className="w-full p-2 border rounded-xl my-4 focus:outline-none caret-black"
            onChange={(e) => {
              setnote(e.target.value);
              setData({ ...data, note: e.target.value });
            }}
          />
          <div className="flex justify-between items-center bg-gray-100 p-2 rounded-xl">
            <div className="flex font-bold text-lg justify-between w-[40%] items-center">
              <button
                className="border-2 px-1.5 hover:bg-black/20 transition"
                onClick={() => {
                  setQuantity(quantity + 1);
                  setData({ ...data, quantity: quantity + 1 });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <p>{quantity}</p>
              <button
                className="border-2 px-1.5 hover:bg-black/20 transition"
                onClick={() => {
                  setQuantity((prev) => {
                    const newQuantity = prev > 1 ? prev - 1 : 1;
                    setData((data) => ({ ...data, quantity: newQuantity }));
                    return newQuantity;
                  });
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
            <button
              onClick={() => {
                handleSave();
              }}
              className="bg-[rgba(227,70,63,1)] hover:bg-red-700 transition text-white px-4 py-2 rounded"
            >
              {!isEdit ? "Thêm món" : "Thay đổi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
