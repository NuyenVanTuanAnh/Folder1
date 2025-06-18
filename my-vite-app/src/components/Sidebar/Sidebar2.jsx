import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsDroplet, BsFileText, BsGrid, BsSearch } from "react-icons/bs";
import { DiSnapSvg } from "react-icons/di";
import { FaExchangeAlt, FaInfo, FaLeaf, FaTablets } from "react-icons/fa";
import { FaShrimp } from "react-icons/fa6";
import { MdReportProblem } from "react-icons/md";
import { PiFanDuotone } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  { name: "Trang chủ", icon: <DiSnapSvg />, lnk: "/" },
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

const Sidebar2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const expanded = useSelector((state) => state.sidebar.expanded);
  const dispatch = useDispatch();

  const [active, setActive] = useState("Dashboard");
  const [item, setItem] = useState(menuItems[0].name);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (!token || !storedUsername) {
      navigate("/");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  useLayoutEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.lnk === currentPath);
    if (activeItem) {
      setActive(activeItem.name);
      document.title = activeItem.name;
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-teal-400 via-green-200 to-white/70 p-2 shadow-lg">
        <ul className="flex flex-col gap-1">
          <li className="group overflow-hidden rounded-lg border-l border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-500">
            <button className="peer flex items-center gap-2.5 px-3 py-2 text-left text-teal-700 w-full">
              <div className="rounded-full bg-gradient-to-tr from-teal-800 via-green-200 to-teal-300 p-2 text-black font-bold shadow-md">
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
              <span className="font-semibold text-sm text-gray-700">
                {item}
              </span>
            </button>
          </li>
          <div className="p-2">
            {menuItems.map((menu) => (
              <li key={menu.name} className="py-2">
                <NavLink
                  to={menu.lnk}
                  onClick={() => setItem(menu.name)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm rounded-lg p-2 transition-all 
                    ${
                      isActive
                        ? "bg-teal-100 text-teal-700 font-semibold"
                        : "text-black hover:text-teal-700 hover:bg-teal-50"
                    }`
                  }
                >
                  <span className="text-xl">{menu.icon}</span>
                  <span>{menu.name}</span>
                </NavLink>
              </li>
            ))}
          </div>
        </ul>
        <div className="mt-auto border-t border-teal-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-300 rounded-full flex items-center justify-center text-white font-bold">
              {username ? username[0].toUpperCase() : "A"}
            </div>
            <div className="text-sm font-medium">{username || "Admin"}</div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 flex items-center text-white bg-teal-700 hover:bg-teal-900 px-3 py-1 rounded-md"
          >
            <FiLogOut size={18} className="mr-1" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet /> {/* ✅ nơi hiển thị nội dung route con */}
      </main>
    </div>
  );
};

export default Sidebar2;
