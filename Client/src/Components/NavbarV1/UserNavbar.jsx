import React, { useState } from "react";
import { FcHome } from "react-icons/fc";
import { HiUserGroup } from "react-icons/hi2";
import { PiReadCvLogo } from "react-icons/pi";
import { FcVoicePresentation } from "react-icons/fc";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function UserNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const isFeed = location.pathname === "/feed";
  const isMyNetwork = location.pathname === "/mynetwork";
  const isResume = location.pathname === "/resume";
  const isNotifications = location.pathname === "/notifications";
  const isMessage = location.pathname === "/message";
  const isProfile = location.pathname === "/profile";
  return (
    <div className="sticky bg-white top-0 left-0 right-0  z-[999] w-full px-4 xl:px-48 py-1  flex items-center justify-between flex-wrap backdrop-blur-lg">
      {/* left side */}
      <div className="flex gap-1">
        {/* Logo */}
        <div
          onClick={() => navigate("/feed")}
          className="w-28 h-[2vw] cursor-pointer"
        >
          <img
            src="/LinkedIn_logo.png"
            alt="LinkedIn Logo"
            className=" h-10 object-contain"
          />
        </div>
        {/* search box */}
        <div className="relative h-full  border-1 border-zinc-400 w-full rounded-full">
          {/* inputbox */}
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full object-cover px-5 py-3 searchuserbox outline-none transition ease-in-out duration-500"
          />
          {/* search result */}
          {showSearchResult && (
            <div className="absolute left-0 right-0 bg-white  w-full h-full px-1 py-3 cursor-pointer ">
              <div className="w-full px-2 py-1  border--1 bg-zinc-200 border-zinc-300 flex gap-14 mt-1 rounded-lg">
                <img
                  src="https://picsum.photos/id/237/536/354"
                  alt="user_image"
                  className="w-10 h-10 rounded-lg"
                />
                <h1 className="text-center mt-2 font-medium">Anand Jha</h1>
              </div>

              <div className="w-full px-2 py-1  border--1 bg-zinc-200 border-zinc-300 flex gap-14 mt-1 rounded-lg">
                <img
                  src="https://picsum.photos/id/237/536/354"
                  alt="user_image"
                  className="w-10 h-10 rounded-lg"
                />
                <h1 className="text-center mt-2 font-medium">Anand Jha</h1>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex justify-around text-xs">
        <div
        onClick={()=>navigate('/feed')}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isFeed ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <FcHome size={20} />
          <span className="">Home</span>
        </div>

        <div
          onClick={()=>navigate('/mynetwork')}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isMyNetwork ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <HiUserGroup size={20} />
          <span>My Network</span>
        </div>

        <div
        onClick={()=>navigate('/resume')}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isResume ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <PiReadCvLogo size={20} />
          <span>Resume</span>
        </div>

        <div
        onClick={()=>navigate('/message')}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isMessage ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <FcVoicePresentation size={20} />
          <span>Message</span>
        </div>

        <div
         onClick={()=>navigate('/notifications')}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isNotifications
              ? "scale-110 font-semibold border-b-1 border-black"
              : ""
          }`}
        >
          <IoMdNotifications size={20} />
          <span className="absolute -top-1 -right-0 px-1.5 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-full leading-none">
            1
          </span>
          <span>Notifications</span>
        </div>

        <div
         onClick={()=>navigate(`/profile/${user?._id}`)}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isProfile ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <img
            src={user?.profilePic}
            alt="user_image"
            className="w-5 h-5 rounded-full"
          />
          <span>Me</span>
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
