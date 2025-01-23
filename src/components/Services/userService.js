import apiClient from "../../utils/api-client";

//유저 가입하기 함수
export async function singup(user, profile) {
  const body = new FormData(); //자바 스크립트 폼 데이터
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);

  await apiClient.post("user/signup", body);
}
