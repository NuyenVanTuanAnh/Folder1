import React, { createContext, useContext, useState } from "react";

// Tạo một vùng dữ liệu dùng chung giữa các component.
const CountContext = createContext();

// Component Provider
function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  const value = [count, setCount];

  // CountContext.Provider sẽ được dùng để cung cấp dữ liệu
  // useContext(CountContext) dùng để lấy dữ liệu
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

// Component hiển thị count
function CountDisplay() {
  const [count] = useContext(CountContext); // lấy count từ context
  return <div>The count is {count}</div>;
}

// Component tăng count
function Counter() {
  const [, setCount] = useContext(CountContext); // lấy setCount từ context
  const increment = () => {
    setCount((c) => c + 1);
  };
  return (
    <button
      onClick={increment}
      className="p-4 m-2 rounded-lg text-white font-semibold bg-blue-500"
    >
      Increment count
    </button>
  );
}

export default Counter;
