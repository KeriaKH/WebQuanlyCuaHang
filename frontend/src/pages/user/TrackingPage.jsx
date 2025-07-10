import {
  faAngleLeft,
  faBowlFood,
  faClipboardCheck,
  faHome,
  faLocationDot,
  faMotorcycle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import money from "../../assets/money.png";
import zalo from "../../assets/zalopay.png";
import OrderItem from "../../components/hostRes/OrderItem";
import { formatAddress, formatCurrencyVN } from "../../utils/Format";
import { useEffect } from "react";
import {
  checkout,
  getOrderById,
} from "../../services/userServices/orderService";

export default function TrackingPage() {
  const [stage, setStage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.tmp || {});
  const orderStage = ["pending", "cooking", "delivering", "completed"];
  const { id } = useParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const storedOrder = localStorage.getItem("orderData");
    if (status === "1" && storedOrder) {
      const orderData = JSON.parse(storedOrder); // convert từ string về object
      const processCheckout = async () => {
        try {
          const res = await checkout(orderData);
          console.log(res);
          setStage(res.order_status);
          setOrder(res);
          localStorage.removeItem("orderData");
          navigate(`/tracking/${res._id}`, { replace: true }); // `replace` để không lưu lịch sử redirect
        } catch (err) {
          console.error("Lỗi khi checkout:", err);
        }
      };
      processCheckout();
    }
  }, [location, navigate]);

  useEffect(() => {
    if (id !== 0) {
      getOrderById(id).then((res) => setOrder(res));
    }
  }, [id]);

  const isActive = (current) => {
    return orderStage.indexOf(stage) >= orderStage.indexOf(current);
  };

  return (
    <div className="w-[70%] mx-auto">
      <div className="flex items-center">
        <button
          className="flex items-center justify-start"
          onClick={() => navigate("/cart")}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-xl mr-1" />
          trở lại
        </button>
        <h2 className="dancing-script-700 text-5xl flex-1 text-center">
          Chi tiết đơn hàng
        </h2>
      </div>
      <div className="w-full p-10 shadow-2xl flex mt-8 bg-white rounded-2xl ">
        <div className="w-[70%] ">
          <p className="font-bold text-xl mb-4">Đặt hàng thành công</p>
          <p>Đơn hàng sẽ được giao vào lúc 11:30</p>
          <div className="flex items-center space-x-3 mt-10 text-3xl w-full">
            {/* Bước 1: Đặt hàng */}
            <div className="flex items-center space-x-1 w-1/4">
              <div className="text-red-500">
                <FontAwesomeIcon icon={faClipboardCheck} />
              </div>
              <div className="bg-gray-300 w-full h-1">
                <div
                  className={`w-full h-1 bg-red-500 ${
                    stage === "pending" ? "animate-fill" : ""
                  }`}
                ></div>
              </div>
            </div>

            {/* Bước 2: Đang nấu */}
            <div className="flex items-center space-x-1 w-1/4">
              <div
                className={isActive("cooking") ? "text-red-500" : "text-black"}
              >
                <FontAwesomeIcon icon={faBowlFood} />
              </div>
              <div className="w-full h-1 bg-gray-300">
                <div
                  className={`w-full h-1 ${
                    isActive("cooking") ? "bg-red-500" : ""
                  } ${stage === "cooking" ? "animate-fill" : ""}`}
                ></div>
              </div>
            </div>

            {/* Bước 3: Giao hàng */}
            <div className="flex items-center space-x-1 w-1/4">
              <div
                className={
                  isActive("delivering") ? "text-red-500" : "text-black"
                }
              >
                <FontAwesomeIcon icon={faMotorcycle} />
              </div>
              <div className="w-full h-1 bg-gray-300">
                <div
                  className={`w-full h-1 ${
                    isActive("delivering") ? "bg-red-500" : ""
                  } ${stage === "delivering" ? "animate-fill" : ""}`}
                ></div>
              </div>
            </div>

            {/* Bước 4: Hoàn tất */}
            <div
              className={`${
                isActive("completed") ? "text-red-500" : "text-black"
              } text-end`}
            >
              <FontAwesomeIcon icon={faHome} />
            </div>
          </div>
          <div className="mt-5 space-y-2 mr-10">
            <div className="flex items-center space-x-2 ">
              <div className="size-4 bg-green-500 rounded-full"></div>
              <span className="font-semibold">Giao đến</span>
            </div>
            <p className="font-semibold">{order.address?.title}</p>
            <p className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faPhone} />
              <span>{order.address?.phone}</span>
            </p>
            <p className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{formatAddress(order.address)}</span>
            </p>
            <div className="text-sm flex items-center">
              Thanh toán:
              <img
                src={order.paymentMethod === "cod" ? money : zalo}
                className="size-10 ml-2"
              />
            </div>
          </div>
        </div>
        <div className="space-y-10 w-full">
          <div className="space-y-7 p-5 bg-gray-200 rounded-2xl">
            {order.orderItem.map((item, index) => (
              <OrderItem key={index} orderItem={item} />
            ))}
          </div>
          <hr />
          <div className="space-y-5 ml-auto">
            <p className="font-bold">Tổng {order.orderItem.length} món</p>
            <div className="flex justify-between">
              <p>Tạm tính</p>
              <p>{formatCurrencyVN(order.summary-30000+(order.voucherId.value || 0))}</p>
            </div>
            <div className="flex justify-between text-red-500">
              <p>Giảm giá</p>
              <p>- {formatCurrencyVN(order.voucherId.value)}</p>
            </div>
            <div className="flex justify-between">
              <p>Phí vận chuyển</p>
              <p>{formatCurrencyVN(30000)}</p>
            </div>
            <p className="text-end mt-7 text-2xl font-semibold text-green-600">
              {formatCurrencyVN(order.summary)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
