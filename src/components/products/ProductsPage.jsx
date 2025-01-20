import ProducstsList from "./ProducstsList";
import "./ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";

const ProductsPage = () => {
  return (
    <section className="products_page">
      <ProductsSidebar />
      <ProducstsList />
    </section>
  );
};

export default ProductsPage;
