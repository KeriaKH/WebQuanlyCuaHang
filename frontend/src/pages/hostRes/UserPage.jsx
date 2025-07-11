import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getUser } from "../../services/userServices/profileService";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import UserItem from "../../components/hostRes/UserItem";
import CustomSelect from "../../components/CustomSelect";
import Pagination from "../../components/Pagination";

const UserPage = () => {
  const LIMIT=10;
  const [user, setUser] = useState([]);
  const [count, setCount] = useState(0);  
  const [search,setSearch]=useState("")
  const [dateSort,setDateSort]=useState(0)
  const [page,setPage]=useState(1)

  useEffect(() => {
    getUser(page,LIMIT,search,"createdAt",dateSort).then((res) => {
      console.log(res);
      setUser(res.user);
      setCount(res.count);
    });
  },[page,search,dateSort]);
  return (
    <div className="w-full p-3 space-y-5">
      <div className="flex items-center space-x-2 font-semibold text-2xl mb-4">
        <FontAwesomeIcon icon={faUser} />
        <p>Người dùng</p>
      </div>
      <div className="bg-gray-200 flex justify-between p-2 px-4 rounded-xl text-xl font-semibold items-center">
        <p>{count} Người dùng</p>
      </div>
      <div className="bg-gray-200 p-3 px-5 rounded-xl">
        <div className="w-full bg-white rounded-xl p-1.5 px-3 flex items-center">
          <input
            type="text"
            className="w-full focus:outline-none"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      <div className="bg-gray-200 p-3 px-5 rounded-xl flex items-center text-sm">
        <p className="text-xl font-semibold">{user?.length} kết quả</p>
        <div className="flex items-center ml-auto space-x-4">
          <div className="bg-white flex items-center p-1 space-x-2 rounded">
            <p>Ngày tạo:</p>
            <CustomSelect
              options={[
                { name: "Tất cả", value: 0 },
                { name: "Mới nhất", value: 1 },
                { name: "Cũ Nhất", value: -1 },
              ]}
              handleChange={setDateSort}
            />
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 p-4 space-y-3 rounded-2xl grid grid-cols-3 gap-5">
          {user?.map((item, index) => <UserItem key={index} item={item} />)}
      </div>
      <Pagination
        limit={LIMIT}
        count={count}
        current={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UserPage;
