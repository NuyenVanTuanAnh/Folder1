import React, { memo, useCallback, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaHome, FaWater, FaFish, FaInfoCircle } from "react-icons/fa";
import Button from "./Button";
import Button1 from "./Button1";
import useCallApi from "../../hooks/useCallApi";
import { useSelector } from "react-redux";
import useSignalR from "../../hooks/useSignalR";
import DashboardRequestApi from "../../services/api/DashboardApi/pondTypeRequest";
import { toast } from "react-toastify";
import AlarmRequestApi from "../../services/api/AlarmApi/alarmRequest";
import { motion } from "framer-motion";
//import Modal from "../../components/Modal";
//import DeleteModal from "../../components/DeleteModal";
//import SetTime from "../../components/SetTime";
//import CreateModal from "../../components/CreateModal";
//import ImageModal from "../../components/ImageModal";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PondSummary from "../../components/PondSummary";
import Sidebar1 from "../../components/Sidebar/Sidebar1";
import SetTime from "../../components/SetTime";
import ImageModal from "../../components/ImageModal";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import CreateModal from "../../components/CreateModal";

function Dashboard() {
  const callApi = useCallApi();
  const expanded = useSelector((state) => state.sidebar.expanded);
  const [isModal, setIsModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isSetTime, setIsSetTime] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [activePonds, setActivePonds] = useState(0);
  const [pondTypes, setPondTypes] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [selectedPondTypeId, setSelectedPondTypeId] = useState("");
  const [selectedPondTypeName, setSelectedPondTypeName] = useState("");
  const [daysOperated, setDaysOperated] = useState(0);
  const [needsCleaning, setNeedsCleaning] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const farmName = localStorage.getItem("farmName") || "";
  const farmId = Number(localStorage.getItem("farmId"));

  // // Lưu farmName và farmId vào localStorage khi component mount, tạm thời sử dụng giá trị cố định
  // // Bạn có thể thay thế giá trị này bằng giá trị thực tế từ backend hoặc props nếu cần
  // useEffect(() => {
  //   localStorage.setItem("farmName", "Farm A");
  //   localStorage.setItem("farmId", "1");
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //trạng thái của tủ điện
  const [cabinData, setCabinData] = useState([
    { name: "Tủ điện 1", status: "Offline", updated: false },
    { name: "Tủ điện 2", status: "Offline", updated: false },
  ]);
  // Mã hóa trạng thái của tủ điện
  const cabinStatusMapping = {
    "Tủ điện 1": {
      GOOD: "Online",
      BAD: "Offline",
      Measuring: "Đang đo",
    },
    "Tủ điện 2": {
      GOOD: "Online",
      BAD: "Offline",
    },
  };
  const handleCabinStatusChanged = useCallback((data) => {
    setCabinData((prevData) => {
      const updatedData = [...prevData]; // Tạo bản sao của cabinData để tránh thay đổi trực tiếp
      // Map "Cabin 1" to "Tủ điện 1" and "Cabin 2" to "Tủ điện 2"
      const displayName =
        data.Name === "Cabin 1"
          ? "Tủ điện 1"
          : data.Name === "Cabin 2"
          ? "Tủ điện 2"
          : null; //Dữ liệu từ backend là "Cabin 1" hoặc "Cabin 2", còn trên UI bạn hiển thị là "Tủ điện 1" hoặc "Tủ điện 2".
      if (!displayName) return updatedData; //  Nếu không phải là Cabin 1 hoặc Cabin 2, không làm gì cả

      const cabinIndex = updatedData.findIndex((c) => c.name === displayName); //Tìm index của cabin cần cập nhật trong danh sách cabin hiện tại.
      // Nếu tìm thấy cabin, cập nhật trạng thái và đánh dấu là đã cập nhật. findIndex là một hàm buil-in, sẽ trả về -1 nếu không tìm thấy.

      if (cabinIndex !== -1) {
        const mappedStatus =
          cabinStatusMapping[displayName]?.[data.Value] || "Offline"; //cabinStatusMapping -> displayName -> GOOD
        updatedData[cabinIndex] = {
          ...updatedData[cabinIndex],
          status: mappedStatus,
          updated: true, //Gán trạng thái mới và flag updated: true (để trigger animation)
        };
        setTimeout(() => {
          setCabinData((current) => {
            const resetData = [...current];
            resetData[cabinIndex] = {
              ...resetData[cabinIndex],
              updated: false, //Sau khi hiệu ứng animation chạy 1 giây, bạn đặt lại updated: false để không ảnh hưởng render tiếp theo.
            };
            return resetData;
          });
        }, 1000);
      }
      return updatedData;
    });
  }, []);

  useSignalR(handleCabinStatusChanged);

  const fetchData = useCallback(() => {
    if (!farmName || farmName.trim() === "") {
      setIsLoading(false);
      toast.error("Vui lòng chọn một trang trại!");
      return;
    }

    setIsLoading(true);

    callApi(
      [
        DashboardRequestApi.pondTypeRequest.getPondTypeRequestByFamrId(farmId),
        DashboardRequestApi.pondRequest.getPondRequestByFarmId(farmId),
        DashboardRequestApi.pondRequest.getPondRequestByStatus(farmId, 1),
        DashboardRequestApi.timeRequest.getTimeCleaning(farmId),
        AlarmRequestApi.alarmRequest.getStatusCabin(
          farmId,
          "Tình trạng kết nối ESP tủ điện 1"
        ),
        AlarmRequestApi.alarmRequest.getStatusCabin(
          farmId,
          "Tình trạng kết nối ESP tủ điện 2"
        ),
      ],
      (res) => {
        console.log("farmId:", farmId);
        setPondTypes(res[0] || []);
        setPonds(res[1] || []);
        setActivePonds(res[2]?.length || 0);

        const lastCleaningTime = new Date(res[3].cleanTime);
        const currentTime = new Date();
        const days = Math.floor(
          (currentTime - lastCleaningTime) / (1000 * 60 * 60 * 24)
        );
        setDaysOperated(days);

        if (days >= 60) {
          setNeedsCleaning(true);
        } else {
          setNeedsCleaning(false);
        }

        setCabinData((prevData) => {
          const updatedData = [...prevData];
          const cabin1Status =
            cabinStatusMapping["Tủ điện 1"][res[4].status] || "Offline";
          updatedData[0] = { ...updatedData[0], status: cabin1Status };
          const cabin2Status =
            cabinStatusMapping["Tủ điện 2"][res[5].status] || "Offline";
          updatedData[1] = { ...updatedData[1], status: cabin2Status };
          return updatedData;
        });

        setIsLoading(false); //  Dừng loading sau khi nhận dữ liệu
      },
      (err) => {
        toast.error("Không thể tải dữ liệu từ API!");
        console.error("Lỗi", err);
        setIsLoading(false);
      }
    );
  }, [callApi, farmId]);

  //Gọi tự động khi `Dashboard` render
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log("🧪 Đã vào useEffect test API");
    DashboardRequestApi.pondTypeRequest
      .getPondTypeRequestByFamrId(1)
      .then((res) => {
        console.log("✅ Test API thành công:", res);
      })
      .catch((err) => {
        console.error("❌ Test API lỗi:", err);
      });
  }, []);

  const handleSelected = (pondTypeId, pondTypeName) => {
    setSelectedPondTypeId(pondTypeId);
    setSelectedPondTypeName(pondTypeName);
  };

  const handleCleanSensor = () => {
    const currentTime = new Date().toISOString();
    callApi(
      [
        DashboardRequestApi.timeRequest.postCleaningTime({
          cleanTime: currentTime,
          farmId: farmId,
        }),
      ],
      (res) => {
        toast.success("Vệ sinh cảm biến thành công!");
        setDaysOperated(0);
        setNeedsCleaning(false);
        setIsConfirmModalOpen(false);
      },
      (err) => {
        toast.error("Không thể cập nhật thời gian vệ sinh!");
      }
    );
  };

  const renderCabinStatus = () => {
    return (
      <div className="flex-1 flex flex-col items-center justify-center rounded-xl shadow-md bg-white border p-2">
        <h2 className="text-xl font-bold text-teal-800 mb-3">
          Trạng thái tủ điện
        </h2>
        <div className="flex flex-col gap-2">
          {cabinData.map((cabin, index) => (
            <motion.div
              key={cabin.name}
              className="text-center py-2 p-10 text-sm font-medium rounded-md"
              animate={{
                backgroundColor:
                  cabin.status === "Online"
                    ? "#DCFCE7"
                    : cabin.status === "Đang đo"
                    ? "#FFEDD5"
                    : "#FEE2E2",
                color:
                  cabin.status === "Online"
                    ? "#166534"
                    : cabin.status === "Đang đo"
                    ? "#C2410C"
                    : "#991B1B",
                scale: cabin.updated ? [1, 1.05, 1] : 1,
              }}
              transition={{
                color: { duration: 0.3 },
                backgroundColor: { duration: 0.3 },
                scale: { duration: 0.5 },
              }}
            >
              {cabin.name}: {cabin.status}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  //--------------------------------------------------------------------------------------//
  return (
    <div className="flex max-h-screen bg-gray-50">
      <Sidebar1></Sidebar1>
      <div className="flex-1 flex flex-col mt-16 sm:mt-0 transition-all m-2 rounded-xl items-center w-full mr-2 overflow-y-auto overflow-hidden max-h-screen mb-2">
        <div className="w-[95%] h-auto flex flex-col gap-2 items-stretch sm:flex-row justify-between p-5 m-5 bg-gray-100 rounded-lg shadow-md">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 flex flex-col items-center justify-center rounded-xl shadow-md bg-white p-2 min-w-0 border">
              <h1 className="uppercase min-w-50 sm:text-2xl font-sans text-sm font-bold text-teal-800 text-center">
                Tổng số ao
              </h1>
              <span className="text-5xl font-mono font-bold text-red-500">
                {ponds?.length || 0}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center rounded-xl shadow-md bg-white p-2 min-w-0 border">
              <h1 className="uppercase min-w-50 sm:text-2xl font-sans text-sm font-bold text-teal-800 text-center">
                Hoạt động
              </h1>
              <span className="text-5xl font-mono font-bold text-red-500">
                {activePonds}
              </span>
            </div>
          </div>

          <div className="border flex-1 flex-col gap-4 items-center rounded-xl bg-white shadow-lg p-2">
            <div className="flex flex-col items-center justify-center gap-1 ">
              <h1 className="text-xl font-bold font-helvetica bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
                Trang trại: {farmName}
              </h1>
              <div className="text-gray-700 space-y-1 text-center">
                <p className="text-base font-helvetica">
                  Thời gian hiện tại: {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-base font-helvetica">
                  Số ngày vận hành: {daysOperated}
                </p>
                {needsCleaning ? (
                  <span
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full cursor-pointer hover:bg-red-200 transition"
                  >
                    Cần vệ sinh cảm biến
                  </span>
                ) : (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Cảm biến: Tốt
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-rows items-center justify-center gap-3 pt-5">
              <Button1 onClick={() => setIsSetTime(true)} />
              <Button onClick={() => setShowImage(true)} />
            </div>
          </div>
          {renderCabinStatus()}
        </div>

        <div className="w-[90%] max-h-[90%] flex-1 sm:overflow-y-auto rounded-lg p-4 gap-y-3">
          {pondTypes.length === 0 ? (
            <p className="text-teal-600 text-center">Không có loại ao nào</p>
          ) : (
            pondTypes.map((pondType) => {
              const filteredPonds = ponds.filter(
                (pond) => pond.pondTypeName === pondType.pondTypeName
              );
              console.log(
                "Rendering PondSummary for",
                pondType.pondTypeName,
                "with ponds:",
                filteredPonds
              );
              return (
                <PondSummary
                  onPutSucces={fetchData}
                  key={pondType.pondTypeId}
                  pondTypeName={pondType.pondTypeName}
                  pondTypeId={pondType.pondTypeId}
                  ponds={filteredPonds}
                  setIsDeleteModal={setIsDeleteModal}
                  setIsCreateModal={setIsCreateModal}
                  onSelected={handleSelected}
                  onDeleteCardSuccess={fetchData}
                />
              );
            })
          )}
        </div>
        <button className="h-10 w-10 right-4 items-center rounded-2xl -mr-3 bottom-5 fixed flex justify-center">
          <IoMdAddCircle
            onClick={() => setIsModal(true)}
            className="h-12 text-4xl text-black"
          />
        </button>
        {isSetTime && (
          <SetTime
            setIsSetTime={setIsSetTime}
            onPostSuccess={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {isModal && <Modal setIsModal={setIsModal} onPostSuccess={fetchData} />}
        {isDeleteModal && (
          <DeleteModal
            setIsDeleteModal={setIsDeleteModal}
            pondTypeId={selectedPondTypeId}
            pondTypeName={selectedPondTypeName}
            onDeleteSuccess={fetchData}
          />
        )}
        {isCreateModal && (
          <CreateModal
            setIsCreateModal={setIsCreateModal}
            onPostSuccess={fetchData}
            pondTypeId={selectedPondTypeId}
          />
        )}
        {showImage && <ImageModal setShowImage={setShowImage} />}
      </div>
      {isLoading && <Loading />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium mb-4">
              Bạn có chắc chắn muốn vệ sinh cảm biến?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={handleCleanSensor}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Dashboard);
