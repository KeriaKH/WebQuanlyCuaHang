import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCartItem, getDishbyId } from "../services/userServices/dishService";
import { formatCurrencyVN } from "../utils/Format";
import ReviewBox from "../components/ReviewBox";
import ReviewPopUp from "../components/ReviewPopUp";
import { getReviews } from "../services/userServices/reviewService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../components/common/AuthContext";
import { toast } from "react-toastify";

export default function ShopPage() {
  const { id } = useParams();
  const limit = 5;
  const [dish, setdish] = useState({});
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [showError, setShowError] = useState(false);
  const [selectedStar, setSelectedStar] = useState("tất cả");
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState({
    dishId: "",
    quantity: 1,
    selectedOptions: [],
    note: "",
  });

  useEffect(() => {
    getDishbyId(id).then((res) => {
      setdish(res.dish);
      setData({ ...data, dishId: res.dish._id });
    });
    getReviews(id, page, limit, selectedStar).then((res) => {
      setCount(res.count);
      setReviews(res);
    });
  }, [id, page, selectedStar]);

  const isChoiceSelected = (optionIndex, choiceName) => {
    return data.selectedOptions.some(
      (option, index) =>
        index === optionIndex && option.choiceName === choiceName
    );
  };

  const reloadReview=()=>{
    getReviews(id, page, limit, selectedStar).then((res) => {
      setCount(res.count);
      setReviews(res);
    });
  }

  const hanndleOptionsChange = (optIndex, choiceName, optionName, price) => {
    setData((prev) => {
      const newOptions = [...prev.selectedOptions];
      const existingOptionIndex = newOptions.findIndex(
        (_, index) => index === optIndex
      );
      if (existingOptionIndex !== -1) {
        newOptions[existingOptionIndex] = {
          optionName,
          choiceName,
          price,
        };
      } else {
        newOptions.push({
          optionName,
          choiceName,
          price,
        });
      }
      return { ...prev, selectedOptions: newOptions };
    });
  };

  const handleAddCart = async () => {
    if(!dish.available)
    {
      toast.warning("Món ăn hiện tại không khả dụng")
      return 
    }
    if (dish.option.length !== data.selectedOptions.length) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    await addCartItem(user.id, data);
    toast.success("Thêm món thành công")
  };

  return (
    <div className="w-[70vw] bg-white rounded-2xl p-10 mx-auto">
      <div className="flex flex-col mb-10 space-x-8 md:flex-row">
        <div className="w-full rounded-2xl overflow-hidden md:w-1/2">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full object-cover h-100 rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="h-fit space-y-5 rounded-2xl pb-5">
          <h2 className="text-5xl font-bold">{dish.name}</h2>
          <p className="italic text-lg text-gray-500">{dish.description}</p>
          <p className="text-4xl font-black text-red-600">
            {formatCurrencyVN(dish.price)}
          </p>
          <div className="flex items-center space-x-3 text-lg">
            <div className="space-x-1 ">
              {Array.from({ length: 5 }).map((_, index) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={index}
                  className={
                    reviews.star > index + 1
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }
                />
              ))}
            </div>
            <p>
              {reviews.star} ({reviews.count} Đánh giá)
            </p>
          </div>
          <div className="mb-4">
            {dish.option?.map((item, index) => (
              <div key={index} className="flex space-x-3">
                <p className="font-semibold text-xl">{item.optionName} :</p>
                <div className="w-[70%]">
                  {item.choices?.map((item1, index1) => (
                    <div
                      className="flex justify-between space-y-2"
                      key={index1}
                    >
                      <div className="flex space-x-2">
                        <input
                          type="radio"
                          value={item1.name}
                          checked={isChoiceSelected(index, item1.name)}
                          onChange={() =>
                            hanndleOptionsChange(
                              index,
                              item1.name,
                              item.optionName,
                              item1.price
                            )
                          }
                        />
                        <p>{item1.name}</p>
                      </div>
                      <p>+{formatCurrencyVN(item1.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 ">
            <p className="text-xl font-semibold mr-5">Số lượng: </p>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="bg-green-500 text-white p-2 text-xl rounded-lg cursor-pointer hover:bg-green-600 select-none"
              onClick={() =>
                setData({
                  ...data,
                  quantity: data.quantity === 1 ? 1 : data.quantity - 1,
                })
              }
            />
            <input
              type="number"
              value={data.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
              className="w-[50%] text-center bg-gray-100 p-2 text-xl rounded-xl focus:outline-none"
            />
            <FontAwesomeIcon
              icon={faAngleRight}
              className="bg-green-500 text-white p-2 text-xl rounded-lg cursor-pointer hover:bg-green-600 select-none"
              onClick={() => setData({ ...data, quantity: data.quantity + 1 })}
            />
          </div>
          {showError && (
            <div className="text-red-500 bg-red-100 p-2 font-semibold text-center">
              Lựa chọn đủ các option
            </div>
          )}
          <button
            className="bg-green-500 hover:bg-green-600 transition border text-white p-2 text-lg font-semibold rounded-2xl w-full"
            onClick={handleAddCart}
          >
            Đặt món
          </button>
        </div>
      </div>
      <p className="text-3xl mb-5 font-bold">Đánh giá từ khách hàng</p>
      <div className="flex space-x-8">
        <div className="w-[35%]">
          <ReviewBox reviews={reviews} dish={dish} reload={reloadReview}/>
        </div>
        <div className="flex-1 ">
          <ReviewPopUp
            selectedStar={selectedStar}
            onStarChange={setSelectedStar}
            reviews={reviews.data}
            limit={limit}
            page={page}
            onchangePage={setPage}
            count={count}
          />
        </div>
      </div>
    </div>
  );
}
