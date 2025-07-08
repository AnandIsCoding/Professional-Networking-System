import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcHome } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";
import { HiUserGroup } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import { PiReadCvLogo } from "react-icons/pi";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const notificationCount = useSelector((state) => state.notification.count);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const isFeed = location.pathname === "/feed";
  const isMyNetwork = location.pathname === "/mynetwork";
  const isResume = location.pathname === "/resume";
  const isNotifications = location.pathname === "/notifications";
  const isMessage = location.pathname === "/message";
  const isProfile = location.pathname.startsWith("/profile");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchresults] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchSearchedUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/user/search?query=${search}`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setShowSearchResult(true);
        setSearchresults(data?.users);
      } else {
        toast.error("Something went wrong in search");
      }
    } catch (error) {
      setLoading(false);
      setShowSearchResult(false);
      console.log(error?.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search.trim() !== "") {
        fetchSearchedUsers();
      } else {
        setSearchresults([]); // Clear results if search is empty
      }
    }, 500); // wait 500ms after the last keystroke

    return () => clearTimeout(debounceTimer); // cleanup
  }, [search]);

  return (
    <div className="sticky bg-white top-0 left-0 right-0  z-[999] w-full px-4 xl:px-48 py-1  flex items-center justify-between flex-wrap backdrop-blur-lg">
      {/* left side */}
      <div className="flex gap-1">
        {/* Logo */}
        <div
          onClick={() => navigate("/feed")}
          className="w-28 h-full cursor-pointer"
        >
          <img
            src="/DevlinkedLogo.png"
            alt="LinkedIn Logo"
            className=" h-10 object-contain"
          />
        </div>
        {/* search box */}
        <div className="w-full max-w-md mx-auto relative ml-4">
          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={(e) => setShowSearchResult(false)}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md searchuserbox"
          />

          {/* Search Results Dropdown */}
          {showSearchResult && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl max-h-96 custom-scrollbar overflow-y-auto z-50 border border-gray-200">
              {loading ? (
                <p className="px-6 py-4 text-gray-500 text-center animate-pulse">
                  Searching users 🔎 ...
                </p>
              ) : searchResults.length < 1 ? (
                <p className="px-6 py-4 text-gray-500 text-center">
                  No User Found
                </p>
              ) : (
                searchResults.map((item, index) => (
                  <NavLink
                    key={item?._id}
                    to={`/profile/${item?._id}`}
                    className="flex items-center gap-4 px-4 py-3  hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  >
                    <img
                      src={
                        item?.profilePic ||
                        "https://picsum.photos/id/237/536/354"
                      }
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                    <div
                      className="flex flex-col"
                      onClick={() => navigate(`/profile/${item?._id}`)}
                    >
                      <span className="font-semibold text-gray-800">
                        {item?.fullName}
                      </span>
                      <span
                        className={`text-sm text-gray-500 ${
                          item?.currentCompany ? "" : "hidden"
                        }`}
                      >
                        @{item?.currentCompany}
                      </span>
                    </div>
                  </NavLink>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex justify-around text-xs">
        <div
          onClick={() => navigate("/feed")}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isFeed ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <FcHome size={20} />
          <span className="">Home</span>
        </div>

        <div
          onClick={() => navigate("/mynetwork")}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isMyNetwork ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <HiUserGroup size={20} />
          <span>My Network</span>
        </div>

        <div
          onClick={() => navigate("/resume")}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isResume ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <PiReadCvLogo size={20} />
          <span>Resume</span>
        </div>

        <div
          onClick={() => navigate("/message")}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isMessage ? "scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <FcVoicePresentation size={20} />
          <span>Message</span>
        </div>

        <div
          onClick={() => navigate("/notifications")}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isNotifications
              ? "scale-110 font-semibold border-b-1 border-black"
              : ""
          }`}
        >
          <IoMdNotifications size={20} />
          <span
            className={`absolute -top-0.5 -right-0 px-1 py-1 text-[10px] font-bold ${
              notificationCount === 0 ? "" : "bg-red-600"
            } text-white rounded-full leading-none`}
          >
            {notificationCount !== 0 && notificationCount}
          </span>
          <span>Notifications</span>
        </div>

        <div
          onClick={() => navigate(`/profile/${user?._id}`)}
          className={`flex relative flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ${
            isProfile ? " scale-110 font-semibold border-b-1 border-black" : ""
          }`}
        >
          <img
            src={user?.profilePic}
            alt="user_image"
            className={`w-5 h-5 rounded-full `}
          />
          <span>Me</span>
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
