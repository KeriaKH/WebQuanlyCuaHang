import {
  faArrowLeft,
  faCalendar,
  faCircleUser,
  faLocationDot,
  faPhone,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/common/AuthContext";
import OrderItem from "../../components/hostRes/OrderItem";

import {
  formatAddress,
  formatCurrencyVN,
  formatDateVN,
} from "../../utils/Format";
import {
  confirmOrder,
  getOrderById,
} from "../../services/userServices/orderService";

export default function OrderDetailPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState({});

  useEffect(() => {
    getOrderById(id).then((res) => {
      console.log(res);
      setOrder(res);
    });
  }, [user, id]);

  const handleConfirm = async () => {
    await confirmOrder(id);
    nav("/order");
  };

  return (
    <div className="w-[60vw] mx-auto bg-gray-200 p-2 my-5 rounded-2xl space-y-6">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center gap-4 ">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => nav("/Order")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Chi tiết đơn hàng
            </h1>
            <p className="text-gray-600">{order._id}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faCircleUser} />
          Thông tin khách hàng
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center">
              <img
                src={order.userId?.avatar}
                alt=""
                className="size-12 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {order.userId?.name}
              </p>
              <p className="text-sm text-gray-600">Khách hàng</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FontAwesomeIcon icon={faPhone} className="w-6" />
            <span>{order.address?.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FontAwesomeIcon icon={faLocationDot} className="w-6" />
            <span className="leading-relaxed">
              {formatAddress(order.address)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FontAwesomeIcon icon={faCalendar} className="w-6" />
            <span>Đặt ngày {formatDateVN(order.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Món ăn đã đặt ({order.orderItem?.length})
        </h2>
        <div className="space-y-4">
          {order.orderItem?.map((item, index) => (
            <OrderItem key={index} orderItem={item} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faReceipt} />
          Tóm tắt đơn hàng
        </h2>
        {order.summary && (
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span>{formatCurrencyVN(order.summary)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí giao hàng:</span>
              <span>{formatCurrencyVN(30000)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Giảm giá:</span>
              <span>{formatCurrencyVN(order.voucherId?.value)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Tổng cộng:</span>
                <span className="text-green-600">
                  {formatCurrencyVN(
                    order.summary - (order.voucherId?.value || 0) + 30000
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {order.order_status === "pending" ? (
        <button
          className="w-full bg-green-500 p-2 text-xl font-semibold rounded-2xl text-white hover:bg-green-600 transition"
          onClick={handleConfirm}
        >
          Xác nhận đơn hàng
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
