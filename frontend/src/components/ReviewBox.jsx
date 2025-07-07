import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReviewRes from "./ReviewRes";

export default function ReviewBox({ reviews,dish,reload }) {
  const totalReviews = reviews.data?.length || 0;
  const rating = reviews.star;
  const starCount = reviews.starCount || {};
  const ratingBars = [5, 4, 3, 2, 1].map((item) => ({
    stars: item,
    percent: ((starCount[item] || 0) / totalReviews) * 100 || 0,
  }));
  const [showPopUp, setShowPopup] = useState(false);

  return (
    <div className="border rounded-t-2xl text-center bg-white h-fit">
      <div className="bg-white py-2 border-b rounded-t-2xl">
        <h2 className="font-semibold text-lg">Tổng quan đánh giá</h2>
      </div>
      <div className="bg-white p-5">
        <div className="flex items-center justify-between text-sm mb-2 px-6 py-2 bg-[rgba(217,217,217,0.4)] rounded-t-2xl">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-semibold">{rating}</span>
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
          </div>
          <span className="text-gray-500">{totalReviews} đánh giá</span>
        </div>

        <div className="space-y-1 text-sm text-gray-500 p-5 bg-[rgba(217,217,217,0.4)] rounded-b-2xl">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center space-x-2">
              <span className="w-4">{bar.stars}</span>
              <div className="flex-1 bg-gray-300 rounded-full h-1">
                <div
                  className="bg-yellow-400 h-1 rounded-full"
                  style={{ width: `${bar.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="bg-green-500 text-white w-[80%] p-2 font-semibold mb-4 rounded-2xl hover:bg-green-600 transition" onClick={()=>setShowPopup(true)}>
        Viết đánh giá
      </button>
      {showPopUp && <ReviewRes resDetail={dish} dishStar={rating} handleClose={setShowPopup} reload={reload}/>}
    </div>
  );
}
