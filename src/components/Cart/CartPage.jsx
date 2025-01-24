import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import CartContext from "../contexts/CartContext";
import { checkoutAPI } from "../Services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateCart, setCart } =
    useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);

  //useContext로 UserContext가져오기
  const user = useContext(UserContext);

  //체크아웃 함수
  const checkout = () => {
    const oldCart = [...cart]; //원래 카트 복사
    setCart([]); //장바구니 비우기 빈 배열로 만들어버림
    checkoutAPI()
      .then(() => toast.success("주문 성공!"))
      .catch(() => {
        toast.error("checkout중 에러 발생");
        setCart(oldCart); //이전 장바구니 복구
      });
  };
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);

  // console.log(cart);
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          {/* user을 가지고 올 때 잠깐이라도 없으면 에러가 나기 때문에 user뒤에 ?예외처리 */}
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>

      <Table headings={["상품", "가격", "구매수량", "총 금액", "상품삭제"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price.toLocaleString("ko-KR")}원</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>{(quantity * product.price).toLocaleString("ko-KR")}원</td>
              <td>
                <img
                  onClick={() => removeFromCart(product._id)}
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>총 금액</td>
            <td>{subTotal.toLocaleString("ko-KR")} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>5,000 원</td>
          </tr>
          <tr className="cart_bill_final">
            <td>결재금액</td>
            <td>{(subTotal + 5000).toLocaleString("ko-KR")} 원</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        결재하기
      </button>
    </section>
  );
};

export default CartPage;
