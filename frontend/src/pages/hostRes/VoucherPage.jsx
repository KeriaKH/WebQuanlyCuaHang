import { faMagnifyingGlass, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CategoryItem from "../../components/hostRes/CategoryItem";

import { addVoucher, deleteVoucher, getAllVoucher, updateVoucher } from "../../services/userServices/voucherService";
import { formatDateVN2 } from "../../utils/Format";
import { toast } from "react-toastify";

export default function VoucherPage() {
  const [isAdd, setIsAdd] = useState("");
  const [voucherData, setVoucherData] = useState({
    _id: "",
    code: "",
    value: "",
    minimumOrderAmount: "",
    expiresAt: "",
    quantity: "",
  });
  const [vouchers, setVouchers] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => {
    getAllVoucher().then((res) => {
      setVouchers(res);
    });
  };

  useEffect(() => {
    getAllVoucher().then((res) => {
      console.log(res);
      setVouchers(res);
    });
  }, []);

  const handleSave = async () => {
    const {_id,...voucherWithoutId}=voucherData
    console.log(voucherWithoutId)
    const isFilled = Object.values(voucherWithoutId).every(
      (item) => item && item.toString().trim() !== ""
    );
    if (!isFilled) {
      toast.error("nhập đủ thông tin của voucher");
      return;
    }
    if (isAdd === "add") await addVoucher(voucherWithoutId);
    else if (isAdd === "edit")
      await updateVoucher(_id,voucherWithoutId);
    setIsAdd("");
    load();
  };

  const handleDelete = async (id) => {
    await deleteVoucher(id);
    load();
  };

  const handleOpenEdit = (item) => {
    setVoucherData(item);
    setIsAdd("edit");
  };

  return (
    <div className="w-full p-3 space-y-5">
      <div className="flex items-center space-x-2 font-semibold text-2xl mb-4">
        <FontAwesomeIcon icon={faTicket} />
        <p>Voucher</p>
      </div>
      <div className="bg-gray-200 flex justify-between p-2 px-4 rounded-xl text-xl font-semibold items-center">
        <p>{vouchers?.length} Voucher</p>
        <button
          className="text-white bg-green-500 text-lg p-2 rounded-lg"
          onClick={() => {
            setIsAdd("add");
            setVoucherData({
              _id: "",
              code: "",
              value: "",
              minimum: "",
              expiresAt: "",
              quantity: "",
            });
          }}
        >
          Thêm +
        </button>
      </div>
      <div className="bg-gray-200 p-3 px-5 rounded-xl">
        <div className="w-full bg-white rounded-xl p-1.5 px-3 flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full focus:outline-none"
            placeholder="Tìm kiếm..."
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      <div className="flex space-x-5">
        <div className="p-2 w-[50%] bg-gray-200 space-y-5 rounded-2xl ease-in-out h-fit">
          <p className="font-semibold text-xl p-2">Danh Sách Voucher</p>
          {vouchers
            ?.filter((item) =>
              item.code.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <CategoryItem
                key={index}
                voucher={item}
                handleDelete={handleDelete}
                edit={handleOpenEdit}
              />
            ))}
        </div>
        {isAdd === "add" || isAdd === "edit" ? (
          <div className="bg-gray-100 w-[48%] shadow p-4 rounded-2xl border-l-4 border-green-500 h-fit space-y-3">
            <p className="font-semibold text-xl mb-4 ">
              {isAdd === "add" ? "Thêm Voucher" : "Sửa voucher"}
            </p>
            <p className="font-semibold">Mã Voucher</p>
            <input
              type="text"
              placeholder="Nhập mã voucher "
              value={voucherData.code}
              onChange={(e) =>
                setVoucherData({ ...voucherData, code: e.target.value })
              }
              className="p-2 px-4 border rounded-2xl focus:outline-green-300 w-full"
            />
            <p className="font-semibold">Số tiền giảm</p>
            <input
              type="number"
              placeholder="Nhập giá trị"
              value={voucherData.value}
              onChange={(e) =>
                setVoucherData({ ...voucherData, value: e.target.value })
              }
              className="p-2 px-4 border rounded-2xl focus:outline-green-300 w-full"
            />
            <p className="font-semibold">Số tiền tối thiểu</p>
            <input
              type="number"
              placeholder="Nhập giá tiền yêu cầu "
              value={voucherData.minimum}
              onChange={(e) =>
                setVoucherData({
                  ...voucherData,
                  minimum: e.target.value,
                })
              }
              className="p-2 px-4 border rounded-2xl focus:outline-green-300 w-full"
            />
            <p className="font-semibold">Ngày hết hạn</p>
            <input
              type="Date"
              min={new Date().toISOString().slice(0, 10)}
              value={formatDateVN2(voucherData.expiresAt)}
              onChange={(e) =>
                setVoucherData({
                  ...voucherData,
                  expiresAt: e.target.value,
                })
              }
              className="p-2 px-4 border rounded-2xl focus:outline-green-300 "
            />
            <p className="font-semibold">Số lượng</p>
            <input
              type="number"
              placeholder="Nhập số lượng "
              value={voucherData.quantity}
              onChange={(e) =>
                setVoucherData({
                  ...voucherData,
                  quantity: e.target.value,
                })
              }
              className="p-2 px-4 border rounded-2xl focus:outline-green-300 w-full"
            />
            <div className="space-x-4">
              <button
                className="p-2 bg-green-500 text-white rounded-xl"
                onClick={handleSave}
              >
                {isAdd === "add" ? "Thêm" : "Sửa"}
              </button>
              <button
                className="p-2 bg-gray-500 text-white rounded-xl"
                onClick={() => setIsAdd("")}
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
