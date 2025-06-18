import React from "react";
import styled from "styled-components";
import { FaShrimp } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { RiKey2Fill } from "react-icons/ri";
import Button from "./Button";

const Account = () => {
  return (
    <div className="account-page">
      <StyledWrapper>
        <form className="form">
          <div className="title">
            <div className="title-logo">
              <div className="button-title">
                <img
                  src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoasang.png"
                  className=""
                  alt="Logo"
                />
              </div>
              <div className="title-big">Login here</div>
              <div className="button-title">
                <FaShrimp />
              </div>
            </div>
            <br />
            <span>_sign up to continue_</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
          />
          <Button></Button>
          <div className="login-with">
            <div className="login-with-item">
              <div className="button-log">
                <RiKey2Fill />
              </div>
              <div className="login-text">Quên mật khẩu</div>
            </div>
            <div className="login-with-item">
              <div className="button-log">
                <FaUserPlus />
              </div>
              <div className="login-text">Tạo tài khoản</div>
            </div>
          </div>
        </form>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  background-color: #c8ead1; /* Tuỳ chọn: thêm màu nền nhẹ */
  .form {
    width: 400px;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: beige;
    --main-color: black;
    padding: 30px;
    background: lightgreen;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title span {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .input:focus {
    border: 2px solid var(--input-focus);
  }

  .login-with {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
  }

  .login-with-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .login-text {
    font-size: 13px;
    color: var(--font-color-sub);
    font-weight: 500;
    transition: color 0.2s;
  }

  .button-log {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    color: var(--font-color);
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    width: 24px;
    height: 24px;
    fill: var(--main-color);
  }

  .button-log:active,
  .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }
  .button-title {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--bg-color);
    box-shadow: 1px 1px var(--main-color);
    color: var(--font-color);
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-confirm {
    margin: 0px;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
  .title-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

export default Account;
