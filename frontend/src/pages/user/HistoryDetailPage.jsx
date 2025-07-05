import {
  faArrowLeft,
  faCalendar,
  faLocationDot,
  faPhone,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OrderItem from "../../components/hostRes/OrderItem";
import {
  formatAddress,
  formatCurrencyVN,
  formatDateVN1,
} from "../../utils/Format";
import { useState } from "react";
import { useEffect } from "react";
import { getOrderById } from "../../services/userServices/orderService";

export default function HistoryDetailPage() {
  const nav = useNavigate();
  const [detail, setDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    getOrderById(id).then((res) => {
      console.log(res);
      setDetail(res);
    });
  }, [id]);

  return (
    detail && (
      <div className="w-[60vw] mx-auto">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-4 ">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => nav("/history")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Chi tiết đơn hàng
              </h1>
              <p className="text-gray-600">{detail._id}</p>
            </div>
          </div>
        </div>
        <div className=" bg-gray-200 p-2 my-5 rounded-2xl space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src={detail.userId.avatar} alt="" className="rounded-full"/>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {detail.userId.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FontAwesomeIcon icon={faPhone} className="w-6" />
                <span>{detail.address.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} className="w-6" />
                <span className="leading-relaxed">
                  {formatAddress(detail.address)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FontAwesomeIcon icon={faCalendar} className="w-6" />
                <span>Đặt ngày {formatDateVN1(detail.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Món ăn đã đặt {detail.orderItem.length}
            </h2>
            <div className="space-y-4">
              {detail.orderItem &&
                detail.orderItem.map((item, index) => (
                  <OrderItem key={index} orderItem={item} />
                ))}
            </div>
            <div className="border-t pt-3 mt-10 space-y-3">
              <div className="flex justify-between text-gray-400">
                Tạm tính:
                <span className="text-black">
                  {formatCurrencyVN(detail.summary)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                Giảm giá :
                <span className="text-black">
                  {formatCurrencyVN(detail.voucherId?.value)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                Phí vận chuyển:
                <span className="text-black">
                  {formatCurrencyVN(30000)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <p>
                  <FontAwesomeIcon icon={faReceipt} /> Tổng cộng:
                </p>
                <span className="text-green-600 text-lg font-semibold">
                  {formatCurrencyVN(detail.summary-detail.voucherId?.value||0+30000)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
