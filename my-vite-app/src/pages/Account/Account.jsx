import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { FaShrimp } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { RiKey2Fill } from "react-icons/ri";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import useCallApi from "../../hooks/useCallApi";
import DashboardRequestApi from "../../services/api/DashboardApi/pondTypeRequest";
import Register from "../../components/Register";
import { IoEye, IoEyeOff } from "react-icons/io5";
import ResetPassword from "../../components/ResetPassword";
import cl from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Account() {
  const navigate = useNavigate();
  const callApi = useCallApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

  const handleLogin = useCallback(() => {
    console.log(isLoginEnabled);
    if (!isLoginEnabled) return;

    setIsLoading(true);
    setErrorMessage("");

    const loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    callApi(
      [DashboardRequestApi.authRequest.login(loginData)],
      (res) => {
        if (res && res[0] && res[0].token) {
          localStorage.setItem("token", res[0].token);
          localStorage.setItem("email", loginData.email);
          localStorage.setItem("username", loginData.email);
          navigate("/status");
        } else {
          setErrorMessage("Email hoặc mật khẩu không đúng!");
        }
        setIsLoading(false);
      },
      (error) => {
        if (error.response?.status === 401) {
          setErrorMessage("Sai email hoặc mật khẩu!");
        } else {
          setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
        setIsLoading(false);
      }
    );
  }, [callApi, email, password, isLoginEnabled, navigate]);

  const handleRegisterSuccess = () => {
    alert("Tài khoản đã được tạo thành công!");
  };
  const handleResetPasswordSuccess = () => {
    alert("Đặt lại mật khẩu thành công!");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/slide2image/1743086606/slbktv.jpg')`,
      }}
    >
      <div className="bg-opacity-80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full mx-4 sm:mx-10 max-w-md border border-teal-300 transform transition-all duration-300 hover:shadow-3xl">
        {/* Tiêu đề */}
        <div className="flex justify-center mx-auto items-center mb-6">
          <img
            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
            className="w-12 sm:w-16 transition-all duration-300"
            alt="Logo"
          />
          <div className="text-2xl sm:text-3xl mr-8 font-bold tracking-tight">
            <span className="text-teal-800">Đăng</span>
            <span className="text-teal-600"> nhập</span>
          </div>
        </div>
        {/* Form đăng nhập */}
        <StyledWrapper>
          <div className="form-control">
            <input
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>U</span>
              <span style={{ transitionDelay: "50ms" }}>s</span>
              <span style={{ transitionDelay: "100ms" }}>e</span>
              <span style={{ transitionDelay: "150ms" }}>r</span>
              <span style={{ transitionDelay: "200ms" }}>n</span>
              <span style={{ transitionDelay: "250ms" }}>a</span>
              <span style={{ transitionDelay: "300ms" }}>m</span>
              <span style={{ transitionDelay: "350ms" }}>e</span>
            </label>
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="form-control">
            <input
              type={isPasswordVisible ? "text" : "password"}
              required
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>P</span>
              <span style={{ transitionDelay: "50ms" }}>a</span>
              <span style={{ transitionDelay: "100ms" }}>s</span>
              <span style={{ transitionDelay: "150ms" }}>s</span>
              <span style={{ transitionDelay: "200ms" }}>w</span>
              <span style={{ transitionDelay: "250ms" }}>o</span>
              <span style={{ transitionDelay: "300ms" }}>r</span>
              <span style={{ transitionDelay: "350ms" }}>d</span>
            </label>
            <span
              className="z-10 absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer text-gray-100 hover:text-teal-600 transition-colors duration-200"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
        </StyledWrapper>

        {/* Thông báo lỗi */}
        {errorMessage && (
          <p className="text-red-600 font-medium text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}
        {/* Nút đăng nhập */}
        <button
          onClick={handleLogin}
          disabled={!isLoginEnabled || isLoading}
          className={cl(
            "w-full py-3 sm:py-4 text-white font-semibold rounded-lg shadow-lg transition-all duration-300",
            {
              "bg-teal-700 hover:bg-teal-800 hover:shadow-xl":
                isLoginEnabled && !isLoading,
              "bg-gray-400 cursor-not-allowed": !isLoginEnabled || isLoading,
            }
          )}
        >
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
        {/* Link đăng ký */}
        <p className="text-center text-teal-800 mt-4 text-sm sm:text-base">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => setIsRegisterOpen(true)}
            className="underline cursor-pointer hover:text-teal-900 font-semibold transition-colors duration-200"
          >
            Đăng ký ngay
          </span>
        </p>
        {/* Quên mật khẩu */}
        <p className="text-center text-teal-800 mt-4 text-sm sm:text-base">
          Quên mật khẩu?{" "}
          <span
            onClick={() => setIsResetPasswordOpen(true)}
            className="underline cursor-pointer hover:text-teal-900 font-semibold transition-colors duration-200"
          >
            Đặt lại mật khẩu
          </span>
        </p>
      </div>

      {/* Component Register */}
      {isRegisterOpen && (
        <Register
          setIsRegister={setIsRegisterOpen}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      {/* Component Register */}
      {isResetPasswordOpen && (
        <ResetPassword setIsResetPassword={setIsResetPasswordOpen} />
      )}
    </div>
  );
}
const StyledWrapper = styled.div`
  /* Autofill fix */
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    color: white !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }

  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 100%;
  }

  .form-control input {
    position: relative;
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: white;
    z-index: 2;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: black;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
    z-index: 1;
  }

  .form-control label span {
    pointer-events: none;
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: black;
    transform: translateY(-40px);
  }
`;

export default memo(Account);
