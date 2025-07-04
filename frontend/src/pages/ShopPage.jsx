import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDishbyId } from "../services/userServices/dishService";
import { formatCurrencyVN } from "../utils/Format";
import ReviewBox from "../components/ReviewBox";
import ReviewPopUp from "../components/ReviewPopUp";
import { getReviews } from "../services/userServices/reviewService";

export default function ShopPage() {
  const { id } = useParams();
  const limit = 5;
  const [dish, setdish] = useState({});
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedStar, setSelectedStar] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getDishbyId(id).then((res) => {
      console.log(res.dish);
      setdish(res.dish);
    });
    getReviews(id, page, limit,selectedStar).then((res) => {
      console.log(res);
      setCount(res.count);
      setReviews(res);
    });
  }, [id, page, selectedStar]);

  return (
    <div className="w-[80vw] mx-auto">
      <div className="flex p-10 justify-between">
        <div className="flex-1 px-20">
          <img
            src={dish.image}
            alt={dish.name}
            className=" w-100 object-contain mx-auto"
          />
        </div>
        <div className="bg-gray-100 shadow-2xl h-fit px-8 space-y-5 rounded-2xl pb-5">
          <div className="flex space-x-3">
            {Array.from({ length: 3 }).map((_,index) => (
              <div className="h-10 w-4 bg-green-600" key={index}></div>
            ))}
          </div>
          <h2 className="text-3xl font-bold">{dish.name}</h2>
          <p className="italic text-gray-500">{dish.description}</p>
          <p className="text-xl font-bold">{formatCurrencyVN(dish.price)}</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-[30%] px-10">
          <ReviewBox reviews={reviews} />
        </div>
        <div className="flex-1 px-10">
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
