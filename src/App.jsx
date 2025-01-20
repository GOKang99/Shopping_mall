import "./App.css";
import CartPage from "./components/Cart/CartPage";
import Navbar from "./components/Navbar/Navbar";
import ProductsPage from "./components/products/ProductsPage";
import SingleProductPage from "./components/SingleProduct/SingleProductPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      {/* <ProductsPage /> */}
      {/* <SingleProductPage /> */}
      <CartPage />
    </div>
  );
}

export default App;
