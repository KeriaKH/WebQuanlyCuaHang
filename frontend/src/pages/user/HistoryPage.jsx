import { useEffect, useState } from "react";
import HistotyItem from "../../components/HistotyItem";
import Pagination from "../../components/Pagination";
import { useAuth } from "../../components/common/AuthContext";
import { getOrderByUserId } from "../../services/userServices/orderService";

export default function HistoryPage() {
  const LIMIT = 5;
  const [history, setHistory] = useState();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    getOrderByUserId(user.id, page, LIMIT,activeTab).then((res) => {
      setCount(res.count || 0);
      setHistory(res.order);
    });
  }, [user, page,activeTab]);
  return (
    <div className="w-[60vw] mx-auto">
      {/* Tabs */}
      <div className="relative flex mb-5">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex-1 px-6 py-3 text-center font-medium transition-colors relative z-10 ${
            activeTab === 0
              ? "text-green-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Đang giao
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 px-6 py-3 text-center font-medium transition-colors relative z-10 ${
            activeTab === 1
              ? "text-green-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Đã giao
        </button>

        {/* Sliding indicator */}
        <div
          className={`absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300 ease-in-out z-10 ${
            activeTab === 0 ? "left-0 w-1/2" : "left-1/2 w-1/2"
          }`}
        />

        {/* Background highlight */}
        <div
          className={`absolute top-0 h-full bg-green-50 transition-all duration-300 ease-in-out ${
            activeTab === 0 ? "left-0 w-1/2" : "left-1/2 w-1/2"
          }`}
        />
      </div>
      {history && (
        <div className="space-y-7 mb-10 ">
          {history.map((item, index) => (
            <HistotyItem key={index} item={item} />
          ))}
        </div>
      )}
      <Pagination
        count={count}
        current={page}
        limit={LIMIT}
        onPageChange={setPage}
      />
    </div>
  );
}
