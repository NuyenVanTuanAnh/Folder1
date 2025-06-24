import { div } from "framer-motion/client";
import React from "react";
import styled from "styled-components";
import Sidebar1 from "../../components/Sidebar/Sidebar1";
import { PiShrimpDuotone } from "react-icons/pi";
import { Navigate, useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("farmId");
    localStorage.removeItem("farmName");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <div>
      <div>
        <Sidebar1></Sidebar1>
      </div>
      <div
        className="flex bg-gradient-to-br from-teal-200 to-gray-100
                   flex-col items-center justify-center h-screen"
      >
        <StyledWrapper>
          <div className="card">
            <img
              className="image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG3OrPIQXhrJlhxNggRXvFutKe-lC9liaCiA&s"
              alt=""
            />
            <div className="card-info">
              <span>Shrimp_Pond</span>
              <p>© 2025 HCMUT. All rights reserved.</p>
            </div>
            <button className="button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </StyledWrapper>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 350px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    background-color: #fffffe;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .card::before {
    content: "";
    width: 350px;
    height: 100px;
    position: absolute;
    top: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: 3px solid #fefefe;
    background: linear-gradient(
      40deg,
      rgb(0, 153, 50) 0%,
      rgb(0, 153, 155) 50%,
      rgb(0, 153, 135) 100%
    );
    transition: all 0.3s ease;
  }

  .card * {
    z-index: 1;
  }

  .image {
    width: 90px;
    height: 90px;
    background-color: #1468bf;
    border-radius: 50%;
    border: 4px solid #fefefe;
    margin-top: 30px;
    transition: all 0.5s ease;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    transition: all 0.5s ease;
  }

  .card-info span {
    font-weight: 600;
    font-size: 24px;
    color: #161a42;
    margin-top: 15px;
    line-height: 5px;
  }

  .card-info p {
    color: rgba(0, 0, 0, 0.5);
  }

  .button {
    text-decoration: none;
    background-color: rgb(0, 153, 150);
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    border: 1px solid white;
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
  }

  .card:hover {
    width: 300px;
    border-radius: 250px;
    .card-info span {
      font-weight: 600;
      font-size: 24px;
      color: white;
      margin-top: 15px;
      line-height: 5px;
    }
    .card-info p {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .card:hover::before {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border-bottom: none;
    transform: scale(0.95);
  }

  .card:hover .card-info {
    transform: translate(0%, -15%);
  }

  .button:hover {
    background-color: rgb(110, 0, 153);
    transform: scale(1.1);
  }
`;

export default Card;
