import React from "react";
import { useAuth } from "./AuthContext";

const HeaderLoad = () => {
  const { user, setUser } = useAuth();
  console.log("HeaderLoad user", user);
  return (
    <div
      className="flex justify-between items-center p-4 h-14 
    bg-white/10 backdrop-blur-md border border-white/20 
    shadow-lg backdrop-blur-md border border-white/20"
    >
      {user ? (
        <div className="flex items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1746718185468-86c85c1f431e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNjd8fHxlbnwwfHx8fHw%3D"
            alt="Tuan Anh"
            className=" w-10 h-10 rounded-full object-cover shadow-md shadow-gray-500 border border-white/20"
          />
          <span className="ml-2 text-sm font-semibold">
            Welcome back {user.name}
          </span>
        </div>
      ) : (
        <span className="text-sm font-large">Welcome</span>
      )}
      <button
        className="bg-black/30 backdrop-blur-md 
        border border-white/20
        shadow-lg rounded-full px-4 py-1.5 text-black text-sm font-medium 
      hover:scale-110 transition-transform duration-200"
        onClick={() => {
          setUser(null);
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default HeaderLoad;
