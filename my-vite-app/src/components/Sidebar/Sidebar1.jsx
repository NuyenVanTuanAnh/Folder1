import React, { useEffect, useLayoutEffect, useState } from "react";
import { BsDroplet, BsFileText, BsGrid, BsSearch } from "react-icons/bs";
import { DiSnapSvg } from "react-icons/di";
import { FaExchangeAlt, FaInfo, FaLeaf, FaTablets } from "react-icons/fa";
import { FaShrimp } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdReportProblem } from "react-icons/md";
import { PiFanDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";

const menuItems = [
  { name: "Tài khoản", icon: <HiOutlineUser />, lnk: "/accounton" },
  { name: "Tổng quan", icon: <BsGrid />, lnk: "/dashboard" },
  { name: "Thông số môi trường", icon: <BsDroplet />, lnk: "/evista" },
  { name: "Thu hoạch", icon: <FaLeaf />, lnk: "/harvest" },
  { name: "Chuyển ao", icon: <FaExchangeAlt />, lnk: "/transfer" },
  { name: "Danh mục thực phẩm", icon: <FaTablets />, lnk: "/food" },
  { name: "Danh mục máy móc", icon: <PiFanDuotone />, lnk: "/machinesmanager" },
  { name: "Thông tin tôm", icon: <FaShrimp />, lnk: "/shrimpmanagement" },
  { name: "Thông tin ao", icon: <FaInfo />, lnk: "/info" },
  { name: "Truy xuất nguồn gốc", icon: <BsSearch />, lnk: "/access" },
  { name: "Thông báo và cảnh báo", icon: <MdReportProblem />, lnk: "/alarm" },
  { name: "Thông tin trang trại", icon: <BsFileText />, lnk: "/farm" },
];

const Sidebar1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const expanded = useSelector((state) => state.sidebar.expanded);
  const dispatch = useDispatch();

  const [active, setActive] = useState("Dashboard");
  const [item, setItem] = React.useState(menuItems[0].name);
  const [username, setUsername] = useState(null);
  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");
  //   const token = localStorage.getItem("token");
  //   if (!token || !storedUsername) {
  //     navigate("/");
  //   } else {
  //     setUsername(storedUsername);
  //   }
  // }, [navigate]);

  // useLayoutEffect(() => {
  //   if (location.pathname === "/") {
  //     document.title = "Dashboard";
  //   }
  // }, [location.pathname]);

  // useLayoutEffect(() => {
  //   const currentPath = location.pathname;
  //   const activeItem = menuItems.find((item) => item.lnk === currentPath);
  //   if (activeItem) {
  //     setActive(activeItem.name);
  //     document.title = activeItem.name;
  //   }
  // }, [location.pathname]);

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
    <div className="relative">
      <div className="absolute z-10">
        <ul className="m-1 pt-0.5 w-64 flex flex-col gap-1 border-l border-gray-200 pl-1">
          <li
            className="group w-14 overflow-hidden rounded-lg 
        border
        bg-white
        transition-all duration-500 
        hover:w-64 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-64 has-[:focus]:shadow-lg"
          >
            <button
              className="peer flex w-fit cursor-pointer 
          items-center gap-2.5 px-2 py-2 text-left 
          text-teal-700 transition-all active:scale-95"
            >
              <div
                className="rounded-full
                        border border-black/80
                        bg-white
                        backdrop-blur-lg
                        p-2
                        text-black text-sm font-bold
                        shadow-md
                        hover:bg-white/15 active:bg-white/20
                        transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                  />
                </svg>
              </div>
              <div className="font-semibold text-sm text-gray-700">
                <div>{item}</div>
              </div>
            </button>
            <div
              className="grid grid-rows-[0fr] 
          overflow-hidden transition-all 
          hover:grid-rows-[1fr]
          duration-500 peer-focus:grid-rows-[1fr]"
            >
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200 p-4 pt-0">
                  {menuItems.map((props) => (
                    <li className="py-2" key={props.name}>
                      <NavLink
                        onClick={() => setItem(props.name)}
                        key={props.name}
                        to={props.lnk}
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-sm 
                        transition-colors 
                        backdrop-blur-xl rounded-2x2
                        hover:scale-110 hover:-translate hover:shadow-2x2 ${
                          isActive
                            ? "text-teal-700 font-semibold"
                            : "text-black hover:text-teal-700"
                        }`
                        }
                      >
                        <span className="p-1 bg-teal-100 text-teal-700 rounded-lg text-xl shadow-sm">
                          {props.icon}
                        </span>
                        <span>{props.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar1;
