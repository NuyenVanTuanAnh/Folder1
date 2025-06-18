import React, { createContext, useContext, useState } from "react";

// 1. Tạo AuthContext
const AuthContext = createContext();

// 2. Provider chia sẻ thông tin user toàn ứng dụng
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Janny",
    email: "TuanAnh@gmail.com",
    photoURL:
      "https://images.unsplash.com/photo-1728443433557-3fc9e37b58c2?w=600&auto=format&fit=crop&q=60",
    uid: "1234567890",
  });

  const value = { user, setUser }; // ✅ dùng object thay vì array để rõ ràng

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // ✅ cung cấp object { user, setUser } cho các component con
};

// 3. Custom hook để truy cập AuthContext
function useAuth() {
  const context = useContext(AuthContext); // ✅ lấy context từ AuthContext
  // ✅ nếu context là undefined, nghĩa là useAuth được gọi ngoài AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // ✅ return object { user, setUser }
}

// 4. Export cả 2
export { AuthProvider, useAuth };
// ✅ AuthProvider để bao bọc ứng dụng và cung cấp thông tin user
// ✅ useAuth để truy cập thông tin user trong các component con
