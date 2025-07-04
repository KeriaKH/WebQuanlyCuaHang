import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Category from "../components/Category";
import CustomSelect from "../components/CustomSelect";
import Pagination from "../components/Pagination";
import ShopCard from "../components/ShopCard";
import { getCategories } from "../services/userServices/categoryService";
import { getDishs } from "../services/userServices/dishService";

export default function HomePage() {
  const { search } = useOutletContext();
  const SHOP_LIMIT = 12;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [category, setcategory] = useState("Tất cả");
  const [categories, setcategories] = useState([]);
  const [priceSort, setPriceSort] = useState(0);

  const [dishes, setdishes] = useState([]);

  useEffect(() => {
    getDishs(page, SHOP_LIMIT, search, category, "price", priceSort).then(
      (res) => {
        setdishes(res.dishs);
        setCount(res.count);
      }
    );
    getCategories().then((res) => {
      console.log(res);
      setcategories(res.categories);
    });
  }, [page, category, search, priceSort]);

  return (
    <div className="w-[80vw] mx-auto flex">
      <div className="w-[80%] space-y-3">
        <div className="flex items-center">
          <h1 className="text-center text-2xl font-bold m-2 text-gray-600">
            DANH MỤC MÓN ĂN
          </h1>
          <hr className="w-[78%] mx-auto " />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mb-7">
          {Array.isArray(dishes) &&
            dishes.map((item, index) => (
              <ShopCard key={index} dishDetail={item} />
            ))}
        </div>
        <Pagination
          limit={SHOP_LIMIT}
          count={count}
          current={page}
          onPageChange={setPage}
        />
      </div>
      <div className="space-y-3 mt-20 ml-4">
        <div className="flex items-center">
          <span className="mr-4 text-lg font-semibold">Giá :</span>
          <CustomSelect
            options={[
              { name: "Tất cả", value: 0 },
              { name: "Tăng dần", value: 1 },
              { name: "Giảm dần", value: -1 },
            ]}
            handleChange={setPriceSort}
          />
        </div>
        {categories.length > 0 && (
          <Category
            header={"Danh mục món ăn"}
            items={categories}
            handleSelect={setcategory}
          />
        )}
      </div>
    </div>
  );
}
