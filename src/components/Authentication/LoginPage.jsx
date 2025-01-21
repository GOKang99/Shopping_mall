import { useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = (formData) => console.log(formData);
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(submitData)}>
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              // ref={passwordRef}
              id="password"
              className="form_text_input"
              placeholder="패스워드 입력..."
            />
            {/* <button
              type="button"
              onClick={() => (passwordRef.current.type = "password")}
            >
              비밀번호 숨기기
            </button>
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "text")}
            >
              비밀번호 보이게
            </button> */}
          </div>

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
export default LoginPage;
