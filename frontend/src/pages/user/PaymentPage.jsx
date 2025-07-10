import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import money from "../../assets/money.png";
import zalopay from "../../assets/zalopay.png";
import { useAuth } from "../../components/common/AuthContext";
import { getAddress } from "../../services/userServices/addressService";
import {
  checkout,
  checkoutWithZaloPay,
} from "../../services/userServices/orderService";
import { formatAddress, formatCurrencyVN } from "../../utils/Format";

export default function PaymentPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [order, setOrder] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];
  const subtotal = location.state?.subtotal;
  const discount = location.state?.discount || {};
  console.log(cart);
  useEffect(() => {
    getAddress(user.id).then((res) => {
      console.log(res);
      setAddresses(res);
      const defaultAddr = res.find((item) => item.default);
      if (defaultAddr) {
        setOrder((prev) => ({
          ...prev,
          address: defaultAddr,
        }));
        setSelectedAddress(defaultAddr._id);
      }
    });
  }, [user]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setOrder({ ...order, paymentMethod: event.target.value });
  };

  const handleSubmit = async () => {
    const isFilled = order.address && order.paymentMethod;
    if (!isFilled) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const tmp = {
      ...order,
      orderItem: cart.map((item) => ({
        ...item,
        price: item.dishId.price,
        name: item.dishId.name,
        image: item.dishId.image,
        dishId: item.dishId._id,
      })),
      userId: user.id,
      voucherId: discount._id,
      summary:subtotal + 30000 - (discount.value || 0)
    };
    if (paymentMethod === "cod") {
      await checkout(tmp).then((res) => navigate(`/tracking/${res.id}`));
    } else {
      localStorage.setItem("orderData", JSON.stringify(tmp));
      await checkoutWithZaloPay(tmp).then((res) => {
        console.log(res)
        window.location.href = res.order_url});
    }
  };
  return (
    <div className="w-[70vw] mx-auto">
      <div className="flex items-center">
        <button
          className="flex items-center justify-start"
          onClick={() => navigate("/cart")}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-xl mr-1" />
          trở lại
        </button>
        <h2 className="dancing-script-700 text-5xl flex-1 text-center">
          Thanh Toán
        </h2>
      </div>
      <div className="flex mt-8 space-x-10">
        <div className="w-[65%] space-y-5 ">
          <div className="p-4 shadow rounded-3xl bg-white px-7 space-y-3">
            <h3 className="font-semibold ">Giao đến</h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedAddress || ""}
                onChange={(e) => {
                  setSelectedAddress(e.target.value);
                  console.log(e.target.value);
                  const addr = addresses.find(
                    (item) => item._id === e.target.value
                  );
                  setOrder({
                    ...order,
                    address: addr,
                  });
                }}
                className={`w-full px-4 py-3 border 
                    hover:border-gray-400
                border-gray-300 rounded-lg focus:outline-none shadow-sm  transition-all duration-200 cursor-pointer`}
              >
                {addresses.map((item) => (
                  <option
                    value={item._id || ""}
                    key={item._id}
                    className="py-2 px-4 text-gray-900 hover:bg-blue-50"
                  >
                    {formatAddress(item)} ({item.phone})
                  </option>
                ))}
              </select>
            </div>
            <p className="font-semibold my-3">Ghi chú</p>
            <input
              type="text"
              name=""
              id=""
              placeholder="Ghi chú cho giao hàng, ví dụ: tầng phòng,..."
              onChange={(e) => setOrder({ ...order, note: e.target.value })}
              className="w-full px-4 py-3 border 
                    hover:border-gray-400
                border-gray-300 rounded-lg focus:outline-none shadow-sm  transition-all duration-200"
            />
          </div>
          <div className="p-4 shadow rounded-3xl bg-white px-7">
            <h3 className="font-semibold text-xl mb-7">
              Phương thức thanh toán
            </h3>
            <ul className="space-y-5">
              <div className="flex items-center w-[25%] justify-between">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-600 rounded-full"
                  value={"cod"}
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentMethodChange}
                />
                <img src={money} alt="" className="w-8" />
                <p>Tiền mặt</p>
              </div>
              <div className="flex items-center w-[25%] justify-between">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-600 rounded-full"
                  value={"zalopay"}
                  checked={paymentMethod === "zalopay"}
                  onChange={handlePaymentMethodChange}
                />
                <img src={zalopay} alt="" className="w-8" />
                <p>ZaloPay</p>
              </div>
            </ul>
          </div>
        </div>
        <div className=" w-[30%]">
          <div className="space-y-7 p-4 shadow h-fit rounded-4xl font-semibold bg-white">
            <p>Chi tiết thanh toán</p>
            <div className="flex justify-between">
              <p>Tạm tính</p>
              <p>{formatCurrencyVN(subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Giảm giá</p>
              <p className="text-red-500">
                -{formatCurrencyVN(discount.value)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Phí giao hàng</p>
              <p>{formatCurrencyVN(30000)}</p>
            </div>
            <hr className="w-[80%] mx-auto" />
            <div className="flex justify-between text-xl">
              <p>Tổng cộng</p>
              <p className="text-green-500 ">
                {formatCurrencyVN(subtotal + 30000 - (discount.value || 0))}
              </p>
            </div>
          </div>
          <button
            className="w-full bg-[rgba(227,70,63,1)] hover:bg-red-700 transition rounded-3xl shadow font-bold p-3 text-white text-xl mt-7"
            onClick={handleSubmit}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
