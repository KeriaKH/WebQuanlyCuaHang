import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "./Pagination";

export default function ReviewPopUp({
  limit,
  page,
  onchangePage,
  count,
  reviews,
  selectedStar,
  onStarChange,
}) {
  return (
    <div className="bg-[rgba(192,192,192,1)] h-full rounded-2xl shadow-xl">
      <div className="flex justify-center space-x-5 p-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className={`${selectedStar===index+1?"border-red-500 text-red-500":" border-gray-200"} border p-2 bg-white text-xl hover:border-red-500 rounded hover:text-red-500 transition cursor-pointer`}
            key={index}
            onClick={() => onStarChange(index + 1)}
          >
            {index + 1} sao
          </div>
        ))}
      </div>
      <hr />
      <div className="p-5 space-y-5 ">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="text-start bg-white p-5 border rounded-2xl space-y-2"
            >
              <div className="space-x-3 flex items-center">
                <img
                  src={review.userId.avatar}
                  alt={review.userId.name}
                  className="rounded-full size-10 object-cover shadow"
                />
                <span>{review.userId.name}</span>
              </div>
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={index}
                    className={`${
                      review.star > index ? "text-yellow-400" : ""
                    }`}
                  />
                ))}
                <span className="ml-3 text-black/50 text-sm">
                  {review.createdAt}
                </span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="mt-10 text-2xl font-semibold text-gray-600 text-center">
            Hiện tại chưa có bình luận nào{" "}
          </p>
        )}
      </div>
      <Pagination
        limit={limit}
        current={page}
        onPageChange={onchangePage}
        count={count}
      />
    </div>
  );
}
