// src/Components/MainLayout.jsx
import React from 'react';
import UserNavbar from '../Components/NavbarV1/UserNavbar';
import BottomNavigation from '../Components/NavbarV1/BottomNavigation';

function MainLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#F4F2EE]">
      <UserNavbar/>
      
      {/* Page content injected here */}
      <div className="pt-4 px-2 md:px-44 md:pl-[15vw]">
        {children}
      </div>

      <BottomNavigation/>
    </div>
  );
}

export default MainLayout;
