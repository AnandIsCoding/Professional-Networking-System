// src/Components/MainLayout.jsx
import React from "react";

import BottomNavigation from "../Components/NavbarV1/BottomNavigation";
import UserNavbar from "../Components/NavbarV1/UserNavbar";

function MainLayout({ children }) {
  return (
    <div className="w-full min-h-[100vh]  bg-[#F4F2EE]">
      <UserNavbar />

      {/* Page content injected here */}
      <div className="pt-4 px-2 md:px-44  md:pl-[11vw] mb-18 md:mb-0 overflow-x-hidden">
        {children}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default MainLayout;
