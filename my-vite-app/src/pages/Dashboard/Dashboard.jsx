import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaHome, FaWater, FaFish, FaInfoCircle } from "react-icons/fa";

// ⚠️ Sidebar tạm thời tạo giả
const Sidebar = () => (
  <div className="flex flex-col h-full">
    <h2 className="text-2xl font-bold mb-8 text-center">ShrimpPond</h2>

    <nav className="flex-1">
      <ul className="space-y-2">
        <SidebarItem icon={<FaHome />} label="Tổng quan" />
        <SidebarItem icon={<FaWater />} label="Thông số môi trường" />
        <SidebarItem icon={<FaFish />} label="Thu hoạch" />
        <SidebarItem icon={<FaInfoCircle />} label="Thông tin ao" />
      </ul>
    </nav>

    <footer className="text-xs text-white/70 mt-auto pt-6 text-center">
      © 2025 ShrimpPond
    </footer>
  </div>
);

const SidebarItem = ({ icon, label }) => (
  <li className="flex items-center gap-3 p-2 hover:bg-white/10 rounded cursor-pointer transition">
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </li>
);

// ✅ Component hiển thị nhóm ao
const PondSummary = ({ pondTypeName, ponds }) => {
  return (
    <div className="mb-6 bg-white shadow-md rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-teal-700">
          {pondTypeName} : {ponds.length} ao
        </h3>
        <div className="flex gap-3 text-xl text-gray-500">
          <button className="hover:text-black">
            <i className="fas fa-trash" />
          </button>
          <button className="hover:text-black">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {ponds.map((pond) => (
          <div
            key={pond.id}
            className={`w-60 flex-shrink-0 rounded-xl border shadow ${
              pond.batches > 0 ? "bg-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <div
              className={`p-3 rounded-t-xl ${
                pond.batches > 0 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              <div className="flex justify-between font-bold">
                <span>{pond.id}</span>
                <span>{pond.days} ngày</span>
              </div>
              <p className="text-sm font-light">{pond.batches} vụ</p>
            </div>

            <div className="p-3 space-y-2">
              {/* Thiết bị (giả lập) */}
              <div className="flex flex-col gap-1 text-center text-sm">
                {pond.batches > 0 ? (
                  <>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
                      Máy quạt
                    </span>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
                      Máy oxi
                    </span>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
                      Máy lọc
                    </span>
                  </>
                ) : (
                  <>
                    <span className="bg-gray-300 px-2 py-1 rounded">N/A</span>
                    <span className="bg-gray-300 px-2 py-1 rounded">N/A</span>
                  </>
                )}
              </div>

              {/* Nút hoặc icon */}
              {pond.batches > 0 ? (
                <button className="flex justify-between items-center gap-1 text-white text-sm cursor-pointer">
                  <Icon icon="💧" color="blue" />
                  <Icon icon="🌿" color="green" />
                  <Icon icon="📊" color="purple" />
                  <Icon icon="🍤" color="cyan" />
                  <Icon icon="🗑️" color="orange" />
                </button>
              ) : (
                <button className="bg-green-500 text-white w-full py-1 mt-2 rounded hover:bg-green-600 text-sm">
                  ▶ Kích hoạt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const Icon = ({ icon, color }) => {
  const bgClass = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
    orange: "bg-orange-500",
  }[color];

  return (
    <span
      className={`text-white w-8 h-8 flex items-center justify-center rounded text-sm ${bgClass}`}
    >
      {icon}
    </span>
  );
};

const Dashboard = () => {
  // Dữ liệu mẫu
  const pondTypes = [
    {
      pondTypeName: "Ao Thương Phẩm",
      ponds: [
        { id: "B01", days: 95, batches: 7 },
        { id: "B02", days: 95, batches: 4 },
        { id: "B03", days: 20, batches: 1 },
      ],
    },
    {
      pondTypeName: "Ao Thử Nghiệm",
      ponds: [
        { id: "T01", days: 30, batches: 0 },
        { id: "T02", days: 15, batches: 0 },
      ],
    },
  ];

  return (
    <div className="flex bg-gradient-to-br from-teal-100 to-gray-100/40 min-h-screen">
      {/* Nội dung chính */}
      <main className="flex-1 flex flex-col items-center p-6 space-y-6 overflow-y-auto">
        {/* Thông tin tổng quan */}
        <section className="w-full max-w-[1300px] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Tổng số ao */}
          <div className="bg-white shadow rounded-xl p-3 text-center">
            <h2 className="text-xl font-bold text-teal-700 uppercase">
              Tổng số ao
            </h2>
            <p className="text-5xl text-red-500 font-mono font-bold mt-2">
              {pondTypes.reduce(
                (total, group) => total + group.ponds.length,
                0
              )}
            </p>
          </div>

          {/* Thông tin trang trại */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center text-center space-y-2">
            <h2 className="text-lg font-bold text-teal-600">
              Trang trại: Ao tôm Cần Giờ
            </h2>
            <p className="text-gray-600">Thời gian hiện tại: 00:00:00</p>
            <p className="text-gray-600">Số ngày vận hành: 35</p>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              Cảm biến: Tốt
            </span>
            <div className="flex gap-4 mt-2">
              <AiOutlineClockCircle className="text-3xl text-gray-600" />
              <FaMapMarkerAlt className="text-3xl text-red-500" />
            </div>
          </div>

          {/* Trạng thái tủ điện */}
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h2 className="text-lg font-bold text-teal-700 mb-4">
              Trạng thái tủ điện
            </h2>
            <div className="space-y-2">
              <div className="bg-red-100 text-red-700 p-2 rounded-md">
                Tủ điện 1: Offline
              </div>
              <div className="bg-red-100 text-red-700 p-2 rounded-md">
                Tủ điện 2: Offline
              </div>
            </div>
          </div>
        </section>

        {/* Danh sách loại ao */}
        <section className="w-[90%] max-h-[90%] flex-1 sm:overflow-y-auto rounded-lg p-4 gap-y-3">
          {pondTypes.length === 0 ? (
            <p className="text-center text-teal-600">Không có loại ao nào</p>
          ) : (
            pondTypes.map((type) => (
              <PondSummary
                key={type.pondTypeName}
                pondTypeName={type.pondTypeName}
                ponds={type.ponds}
              />
            ))
          )}
        </section>
      </main>
      {/* Nút thêm ao */}
      <button
        type="button"
        className="fixed bottom-6 right-6 bg-white shadow-lg p-2 rounded-full"
      >
        <IoMdAddCircle className="text-4xl text-teal-600" />
      </button>
    </div>
  );
};

export default Dashboard;
