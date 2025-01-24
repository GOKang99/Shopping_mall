import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./components/Services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "./components/contexts/UserContext";
import CartContext from "./components/contexts/CartContext";

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

    //상품 추가 API
    addToCartAPI(product._id, quantity)
      .then((res) => toast.success("상품 추가 성공!"))
      .catch((err) => toast.error("상품 추가에 실패했습니다."));
  };

  //카트 수정하기
  const removeFromCart = (id) => {
    const oldCart = [...cart]; //카트 복사
    //
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) =>
      toast.error("장바구니 상품 삭제 에러")
    );
  };

  const updateCart = (type, id) => {
    const updatedCart = [...cart]; //카트복사
    const i = updatedCart.findIndex((item) => item.product._id === id);
    if (type === "increase") {
      updatedCart[i].quantity += 1; //그 상품에 수량 1 증가
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => toast.error("상품 증가 에러"));
    }
    if (type === "decrease") {
      updatedCart[i].quantity -= 1; //그 상품에 수량 1 감소
      setCart(updatedCart);
      decreaseProductAPI.catch((err) => toast.error("상품 감소 에러"));
    }
  };

  //서버에서 장바구니 정보 가져옴
  const getCart = () => {
    getCartAPI()
      .then((res) => setCart(res.data))
      .catch((err) => toast.error("카트 정보 가져오기 실패"));
  };

  useEffect(() => {
    if (user) getCart();
  }, [user]);

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
    // 유저 정보 전역변수 설정
    <UserContext.Provider value={user}>
      {/* 장바구니 항목 전역변수 선언 */}
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
      >
        <div className="app">
          <Navbar user={user} cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
