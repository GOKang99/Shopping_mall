import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../assets/Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagenation from "../Common/Pagenation";

const ProducstsList = () => {
  const [search, setSearch] = useSearchParams(); //요청 주소 뒤의 쿼리스트링
  const category = search.get("category"); //카테고리 값을 가져옴
  const page = search.get("page");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        category,
        page,
      },
    },
    [category, page]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePageChange = (page) => {
    //카테고리가 있음녀
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          !isLoading &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {data && (
        <Pagenation
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProducstsList;
