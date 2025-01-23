import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI } from "./components/Services/cartServices";
//만약 토큰이 있으면 axios 설정에 추가됨
setAuthToken(localStorage.getItem("token"));
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); //장바구니 //장바구니 담는 걸 앱에서 관리하니 앱에서 장바구니 담는 함수 만들어야 함
  const addToCart = (product, quantity) => {
    const UpdatedCart = [...cart]; //장바구니 복사
    const productIndex = UpdatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      UpdatedCart.push({ product: product, quantity: quantity });
    } else {
      UpdatedCart[productIndex].quantity += quantity;
      alert("이미 추가 된 항목입니다,");
    }
    setCart(UpdatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {} //토큰이 없을경우 아무 처리 x
  }, []);

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
