import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN, formatDateVN1 } from "../utils/Format";

export default function HistotyItem({ item }) {
  const nav = useNavigate();

  return (
    <div className="flex w-full shadow bg-white">
      <div className="w-36 h-32">
        <img
          src={item.orderItem[0].dishId.image}
          alt=""
          className="w-36 h-32 object-cover "
        />
      </div>
      <div className="w-full flex flex-col justify-around px-9">
        <div className="flex justify-between w-full p-3 ">
          <div className="space-y-10">
            <p className="font-bold text-xl">{item._id}</p>
            <div className="space-x-5">
              <button
                onClick={() => nav(`/history/${item._id}`,{state:{item}})}
                className="font-semibold"
              >
                Xem chi tiết
                <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
              </button>
            </div>
          </div>
          <div className="space-y-10">
            <p className="italic text-gray-400">
              {formatDateVN1(item.createdAt)}
            </p>
            <p className="font-semibold text-lg  text-red-500">
              {formatCurrencyVN(item.summary)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
