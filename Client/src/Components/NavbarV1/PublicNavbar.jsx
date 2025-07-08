import React from "react";
import { useNavigate } from "react-router-dom";

function PublicNavbar() {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 left-0 right-0 z-[999] w-full px-4 md:px-10 py-3  flex items-center justify-between flex-wrap backdrop-blur-lg">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="w-28 h-auto cursor-pointer">
        <img
          src="/DevlinkedLogo.png"
          alt="Devlinked Logo"
          className="object-contain"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3 md:mt-0 font-medium">
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-1 rounded-full hover:bg-zinc-200 text-sm md:text-base cursor-pointer"
        >
          Join now
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-1 rounded-full border border-zinc-700 text-sm md:text-base hover:bg-blue-50 cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default PublicNavbar;
