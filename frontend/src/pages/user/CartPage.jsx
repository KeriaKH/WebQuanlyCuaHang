import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { useAuth } from "../../components/common/AuthContext";
import VoucherPopUp from "../../components/VoucherPopUp";
import {
  deleteCartItem,
  getCart,
} from "../../services/userServices/dishService";
import { formatCurrencyVN } from "../../utils/Format";
import { getVoucher } from "../../services/userServices/voucherService";
import { toast } from "react-toastify";

export default function CartPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [cart, setCart] = useState([]);
  const [vouchers, setVouchers] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowPopup(false);
  };

  const reloadCart = async () => {
    await getCart(user.id).then((res) => {
      setCart(res.cart);
      setSubtotal(res.subtotal);
    });
  };

  const handleDeleteCart = async (cartItemId) => {
    await deleteCartItem(user.id, cartItemId);
  };

  const handlePayment = () => {
    if(cart.length<=0)
      return toast.warning("vui lòng thêm món ăn vào giỏ hàng")
    navigate("/payment", {
      state: {
        cart: cart,
        subtotal: subtotal,
        discount: selectedVoucher,
      },
    });
  };

  useEffect(() => {
    getCart(user.id).then((res) => {
      console.log(res.cart)
      setCart(res.cart);
      setSubtotal(res.subtotal);
    });
    getVoucher(user.id).then((res) => {
      console.log(res);
      setVouchers(res);   
    });
  }, [user]);

  return (
    <div className="w-[70vw] mx-auto ">
      <div className="flex items-center">
        <button
          className="flex items-center justify-start"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-xl mr-1" />
          trở lại
        </button>
        <h2 className="dancing-script-700 text-5xl flex-1 text-center">
          Giỏ hàng của tôi
        </h2>
      </div>
      <div className="flex mt-8 space-x-10">
        <div className="p-7 rounded-3xl w-[65%] bg-white shadow">
          <div className="space-y-5 py-5 bg-gray-100 h-full p-5 rounded-2xl">
            {cart?.length === 0 ? (
              <div className="text-center space-y-3">
                <p className="text-2xl text-gray-400">
                  Hiện chưa có món ăn nào trong Giỏ hàng{" "}
                </p>
                <button
                  className="text-xl p-2 bg-green-500 hover:bg-green-600 transition text-white rounded-xl"
                  onClick={() => navigate("/")}
                >
                  Thêm món ăn
                </button>
              </div>
            ) : (
              cart?.map((item, index) => (
                <div key={index} className="space-y-3">
                  <CartItem
                    key={index}
                    cartItem={item}
                    token={user.token}
                    reloadCart={reloadCart}
                    handleDelete={handleDeleteCart}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className=" w-[30%] ">
          <div
            className="space-y-7 p-4 px-7 shadow h-fit rounded-4xl bg-white cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <div className="flex items-center justify-between font-bold text-xl ">
              Voucher
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <p className="text-red-700 font-semibold">
              {selectedVoucher ? selectedVoucher.code : "Chọn voucher"}
            </p>
          </div>
          <div className="space-y-7 p-4 px-7 shadow h-fit rounded-4xl mt-5 font-semibold bg-white">
            <p>Chi tiết thanh toán</p>
            <div className="flex justify-between">
              <p>Tạm tính</p>
              <p>{formatCurrencyVN(subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Giảm giá</p>
              <p className="text-red-500">
                - {formatCurrencyVN(selectedVoucher?.value)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Phí giao hàng</p>
              <p>{subtotal ? formatCurrencyVN(30000) : formatCurrencyVN(0)}</p>
            </div>
            <hr className="w-[90%] mx-auto" />
            <div className="flex justify-between text-xl">
              <p>Tổng cộng</p>
              <p className="text-green-500 ">
                {subtotal
                  ? formatCurrencyVN(
                      subtotal + 30000 - selectedVoucher?.value ||
                        subtotal + 30000
                    )
                  : formatCurrencyVN(0)}
              </p>
            </div>
          </div>
          <button
            className="w-full bg-[rgba(227,70,63,1)] hover:bg-red-700 transition rounded-3xl shadow font-bold p-3 text-white text-xl mt-7"
            onClick={handlePayment}
          >
            Thanh toán
          </button>
        </div>
      </div>
      {showPopup && (
        <VoucherPopUp
          handleClose={setShowPopup}
          vouchers={vouchers}
          onSelectVoucher={handleSelectVoucher}
          subtotal={subtotal}
        />
      )}
    </div>
  );
}
