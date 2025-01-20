import "./App.css";
import HomePage from "./components/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ProductsPage from "./components/products/ProductsPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <ProductsPage />
    </div>
  );
}

export default App;
