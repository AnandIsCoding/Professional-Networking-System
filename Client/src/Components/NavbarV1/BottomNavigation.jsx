import React from "react";
import { FcHome, FcVoicePresentation } from "react-icons/fc";
import { HiUserGroup } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiReadCvLogo } from "react-icons/pi";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const notificationCount = useSelector((state) => state.notification.count);

  const isFeed = location.pathname === "/feed";
  const isMyNetwork = location.pathname === "/mynetwork";
  const isResume = location.pathname === "/resume";
  const isMessage = location.pathname === "/message";
  const isNotifications = location.pathname === "/notifications";
  const isProfile = location.pathname.startsWith("/profile");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center text-xs py-2 md:flex lg:hidden z-50">
      {/* Home */}
      <NavLink
        to="/feed"
        className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isFeed ? "scale-120 font-semibold border-b-1 border-black" : ""
        }`}
        onClick={() => navigate("/feed")}
      >
        <FcHome onClick={() => navigate("/feed")} size={20} />
        <span onClick={() => navigate("/feed")}>Home</span>
      </NavLink>

      {/* My Network */}
      <NavLink
        to="/mynetwork"
        className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isMyNetwork ? "scale-120 font-semibold border-b-1 border-black" : ""
        }`}
        onClick={() => navigate("/mynetwork")}
      >
        <HiUserGroup size={20} />
        <span>Network</span>
      </NavLink>

      {/* Resume */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isResume ? "scale-120 font-semibold border-b-1 border-black" : ""
        }`}
        onClick={() => navigate("/resume")}
      >
        <PiReadCvLogo size={20} />
        <span>Resume</span>
      </div>

      {/* Message */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isMessage ? "scale-120 font-semibold border-b-1 border-black" : ""
        }`}
        onClick={() => navigate("/message")}
      >
        <FcVoicePresentation size={20} />
        <span>Message</span>
      </div>

      {/* Notifications */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isNotifications
            ? "scale-120 font-semibold border-b-1 border-black"
            : ""
        }`}
        onClick={() => navigate("/notifications")}
      >
        <IoMdNotifications size={20} />
        <span
          className={`absolute -top-2 -right-2 px-1.5 py-1 text-[10px] font-bold ${
            notificationCount === 0 ? "" : "bg-red-600"
          }  text-white rounded-full leading-none`}
        >
          {notificationCount !== 0 && notificationCount}
        </span>
        <span>Alerts</span>
      </div>

      {/* Profile */}
      <div
        className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isProfile ? "scale-120 font-semibold border-b-1 border-black" : ""
        }`}
        onClick={() => navigate(`/profile/${user?._id}`)}
      >
        <img
          src={user?.profilePic}
          alt="profilePic_user"
          className="w-5 h-5 rounded-full"
        />
        <span>Me</span>
      </div>
    </div>
  );
}

export default BottomNavigation;
