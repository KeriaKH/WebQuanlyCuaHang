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
  useEffect(() => {
    getOrderByUserId(user.id, page, LIMIT).then((res) => {
      setCount(res.count || 0);
      setHistory(res.order);
    });
  }, [user, page]);
  return (
    <div className="w-[60vw] mx-auto">
      <p className="dancing-script-700 text-7xl ">History</p>
      <hr className="mb-10" />
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
