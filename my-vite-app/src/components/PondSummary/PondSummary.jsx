import React, { useRef, useState, useEffect, memo } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import { useSelector } from "react-redux";
import { Card } from "../Card";

const PondSummary = ({
  ponds,
  pondTypeName,
  pondTypeId,
  setIsDeleteModal,
  setIsCreateModal,
  onSelected,
  onDeleteCardSuccess,
  onPutSucces,
}) => {
  const expanded = useSelector((state) => state.sidebar.expanded);
  const [dragging, setDragging] = useState(false);

  const tabsBoxRef = useRef(null);

  const handleMouseMove = (e) => {
    const tabsBox = tabsBoxRef.current;
    if (tabsBox && dragging) {
      tabsBox.scrollLeft -= e.movementX;
    }
  };

  useEffect(() => {
    const tabsBox = tabsBoxRef.current;
    if (tabsBox) {
      // Không cần thêm logic scroll để kiểm tra mũi tên
    }
    return () => {
      if (tabsBox) {
        // Không cần cleanup sự kiện scroll
      }
    };
  }, []);

  // Lọc ponds dựa trên pondTypeName
  const filteredPonds = ponds.filter(
    (pond) =>
      pond.pondTypeName?.trim().toLowerCase() ===
      pondTypeName?.trim().toLowerCase()
  );

  return (
    <div className="flex flex-col w-full bg-white rounded-lg pb-1 border mt-4">
      <div className="flex text-xl mb-1 justify-between p-1">
        <h1 className="flex text-center px-4 text-2xl font-bold font-helvetica text-teal-800 mb-0.5">
          {pondTypeName} : {filteredPonds.length} ao
        </h1>
        <span className="flex gap-x-3 pr-5">
          <FaTrashAlt
            className="mt-2 cursor-pointer"
            onClick={() => {
              setIsDeleteModal(true);
              onSelected(pondTypeId, pondTypeName);
            }}
          />
          <IoMdAdd
            className="mt-1 text-3xl cursor-pointer"
            onClick={() => {
              setIsCreateModal(true);
              onSelected(pondTypeId, pondTypeName);
            }}
          />
        </span>
      </div>

      <div className="overflow-hidden px-5 h-full w-[calc(100% - 50px)]">
        <div
          ref={tabsBoxRef}
          className={`tabs-box flex gap-x-1 h-full overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
            dragging ? "cursor-grab" : ""
          }`}
          onMouseMove={handleMouseMove}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          <div className="flex gap-x-3 h-full last:mr-5">
            {filteredPonds.length === 0 ? (
              <p className="text-gray-500 italic">
                Không có ao nào thuộc loại {pondTypeName}
              </p>
            ) : (
              filteredPonds.map((res) => (
                <Card
                  onPutSucces={onPutSucces}
                  pondId={res.pondId}
                  pondTypeId={res.pondTypeId}
                  pondName={res.pondName}
                  status={res.status}
                  key={res.pondId}
                  onDeleteCardSuccess={onDeleteCardSuccess}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PondSummary);
