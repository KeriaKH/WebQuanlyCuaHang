import {
  faCalendarAlt,
  faClock,
  faGlobe,
  faMagnifyingGlass,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect";
import MyChart from "../../components/MyChart";
import Pagination from "../../components/Pagination";
import OrderCard from "../../components/hostRes/OrderCard";
import {
  getDashboarData,
  getOrder,
} from "../../services/userServices/orderService";

export default function OrderPage() {
  const LIMIT = 12;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [priceSort, setPriceSort] = useState(0);
  const [dateSort, setDateSort] = useState(0);
  const [orderStatus, setOrderStatus] = useState("all");
  const [sortBy, setSortBy] = useState();
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getOrder(
      page,
      LIMIT,
      search,
      orderStatus,
      sortBy,
      sortBy === "summary" ? priceSort : dateSort
    ).then((res) => {
      console.log(res);
      setOrders(res.order);
      setCount(res.count || 0);
    });
    getDashboarData().then((res) => {
      console.log(res);
      setData(res);
    });
    setTimeout(() => setIsLoading(false), 500);
  }, [dateSort, priceSort, page, orderStatus, search, sortBy]);

  const handleSetDateSort = (value) => {
    setDateSort(value);
    setSortBy("createdAt");
  };

  const handleSetPriceSort = (value) => {
    setPriceSort(value);
    setSortBy("summary");
  };

  return (
    <div className="w-full p-3 space-y-5">
      <div className="flex items-center space-x-2 font-semibold text-2xl mb-4">
        <FontAwesomeIcon icon={faTruck} />
        <p>Order</p>
      </div>
      <div className="bg-gray-200 p-4 space-y-3 rounded-2xl">
        <div className="text-xl p-2 bg-gray-400 text-white font-semibold rounded-xl">
          <FontAwesomeIcon icon={faTruck} className="mr-3" />
          Đơn hàng
        </div>
        <div className="flex justify-between space-x-4">
          <MyChart type={"line"} />
          <div className="w-[35%] flex flex-col justify-between">
            <div className="p-3 font-semibold text-xl bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white  ">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Số lượng đơn hôm nay
              <p className="mt-2">{data?.todayOrder}</p>
            </div>
            <div className="p-3 font-semibold text-xl bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white ">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Số lượng đơn tháng này
              <p className="mt-2">{data?.monthOrder}</p>
            </div>
            <div className="p-3 font-semibold text-xl bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl text-white ">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Tổng đơn hàng
              <p className="mt-2">{data?.totalOrder}</p>
            </div>
            <div className="p-3 font-semibold text-xl bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl text-white ">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Số lượng đơn đang được giao
              <p className="mt-2">{data?.deliveryOrder}</p>
            </div>
          </div>
        </div>
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
      <div className="bg-gray-200 p-3 px-5 rounded-xl flex items-center text-sm">
        <p className="text-xl font-semibold">{orders?.length} Đơn hàng</p>
        <div className="flex items-center ml-auto space-x-4">
          <div className="bg-white flex items-center p-1 space-x-2 rounded">
            <p>Trạng thái:</p>
            <CustomSelect
              options={[
                { name: "Tất cả", value: "all" },
                { name: "pending", value: "pending" },
                { name: "cooking", value: "cooking" },
                { name: "shipping", value: "shipping" },
                { name: "delivered", value: "delivered" },
              ]}
              handleChange={setOrderStatus}
            />
          </div>
          <div className="bg-white flex items-center p-1 space-x-2 rounded">
            <p>Ngày tạo:</p>
            <CustomSelect
              options={[
                { name: "Tất cả", value: 0 },
                { name: "Mới nhất", value: -1 },
                { name: "Cũ nhất", value: 1 },
              ]}
              handleChange={handleSetDateSort}
            />
          </div>
          <div className="bg-white flex items-center p-1 space-x-2 rounded">
            <p>Giá tiền:</p>
            <CustomSelect
              options={[
                { name: "Tất cả", value: 0 },
                { name: "Tăng dần", value: 1 },
                { name: "Giảm dần", value: -1 },
              ]}
              handleChange={handleSetPriceSort}
            />
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 p-4 space-y-3 rounded-2xl grid grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <OrderCard key={index} loading={true} />
            ))
          : orders &&
            orders.map((item, index) => <OrderCard key={index} item={item} />)}
      </div>
      <Pagination
        limit={LIMIT}
        count={count}
        current={page}
        onPageChange={setPage}
      />
    </div>
  );
}
