import React from "react";
import { BsDroplet, BsFileText, BsGrid, BsSearch } from "react-icons/bs";
import { FaExchangeAlt, FaInfo, FaLeaf, FaTablets } from "react-icons/fa";
import { FaShrimp } from "react-icons/fa6";
import { MdReportProblem } from "react-icons/md";
import { PiFanDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const menuItems = [
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

const Button = () => {
  return (
    <div>
      <ul className="w-64 flex flex-col gap-1 border-l border-gray-200 pl-1">
        <li className="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-64 has-[:focus]:shadow-lg">
          <button className="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95">
            <div className="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <div className="font-semibold">Notifications</div>
          </button>

          <div className="grid grid-rows-[0fr] overflow-hidden transition-all duration-500 peer-focus:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200 p-4 pt-0">
                {menuItems.map((props) => (
                  <li className="py-2" key={props.name}>
                    <NavLink
                      key={props.name}
                      to={props.lnk}
                      className={({ isActive }) =>
                        isActive ? "text-green-400" : ""
                      }
                    >
                      {props.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Button;
