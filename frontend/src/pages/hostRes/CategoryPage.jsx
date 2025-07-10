import {
    faMagnifyingGlass,
    faTag,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
    addCategory,
    deleteCategory,
    getCategories,
} from "../../services/userServices/categoryService";

export default function CategoryPage() {
  const [isAdd, setIsAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category,setCategory]=useState("")

  const load = () => {
    getCategories().then((res) => {
      setCategories(res.categories);
    });
  };

  useEffect(() => {
    getCategories().then((res) => {
      console.log(res);
      setCategories(res.categories);
    });
  }, []);

  const handleAdd = async () => {
    console.log(category)
    await addCategory(category)
    load();
    setIsAdd(false)
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    load();
  };

  return (
    <div className="w-full p-3 space-y-5">
      <div className="flex items-center space-x-2 font-semibold text-2xl mb-4">
        <FontAwesomeIcon icon={faTag} />
        <p>Category</p>
      </div>
      <div className="bg-gray-200 flex justify-between p-2 px-4 rounded-xl text-xl font-semibold items-center">
        <p>{categories.length} Category</p>
        <button
          className="text-white bg-green-500 text-lg p-2 rounded-lg"
          onClick={() => {
            setIsAdd(!isAdd);
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
          <p className="font-semibold text-xl p-2">Danh Sách Category</p>
          <div className="p-2 space-y-3 ">
            {categories &&
              categories.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border group border-gray-300 p-2 text-lg rounded-xl hover:text-green-700 font-semibold hover:border-green-500 bg-white transition hover:bg-green-100"
                >
                  <span>{item.categoryName}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              ))}
          </div>
        </div>
        {isAdd ? (
          <div className="bg-gray-100 w-[48%] shadow p-4 rounded-2xl border-l-4 border-green-500 h-fit space-y-3">
            <p className="font-semibold text-xl mb-4 ">Thêm Category</p>
            <p className="font-semibold">Tên Category</p>
            <input
              type="text"
              placeholder="Nhập tên Category "
              value={category}
              onChange={(e) => {setCategory(e.target.value)}}
              className="p-2 px-4 border rounded-2xl focus:outline-green-300 w-full"
            />
            <div className="space-x-4">
              <button className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition" onClick={handleAdd}>
                Thêm
              </button>
              <button
                className="p-2 bg-gray-500 text-white rounded-xl hover:bg-gray-700 transition"
                onClick={()=>setIsAdd(false)}
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
