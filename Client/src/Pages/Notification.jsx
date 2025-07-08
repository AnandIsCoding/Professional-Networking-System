import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdvertisementCard from "../Components/AdvertisementCard";
import ProfileCard from "../Components/Cards/ProfileCard";
import MainLayout from "../layouts/MainLayout";
import { setNotificationCount } from "../Redux/Slices/notification.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true); // start loading
    try {
      const res = await axios.get(`${baseUrl}/notification/all`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setNotifications(data?.notifications);
      } else {
        console.log("Something went wrong in fetching notifications ");
        console.log(res);
      }
    } catch (error) {
      console.log(
        error?.response?.data?.message ||
          "Something went wrong in fetching active notifications---->> ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (
    notificationType,
    notificationId,
    postId,
    senderId
  ) => {
    if (!notificationType || !notificationId) return;
    // handle further tasks like navigating
    try {
      const res = await axios.put(
        `${baseUrl}/notification/updateIsRead`,
        { notificationId },
        { withCredentials: true }
      );
      const { data } = res;
      if (data?.success) {
        dispatch(setNotificationCount(data?.activeNotificationCount));
        if (notificationType === "comment") {
          navigate(`/post/${postId}`);
        } else if (notificationType === "like") {
          navigate(`/post/${postId}`);
        } else if (notificationType === "friendRequest") {
          navigate(`/profile/${senderId}`);
        }
      } else {
        console.log(
          "Something went wrong in handleNotificationClick ---> and this is response ---> ",
          res
        );
      }
    } catch (error) {
      console.log(
        "SOmething went wrong in handleNotificationClick ---->> ",
        error
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <MainLayout>
      <div className="h-screen  w-full overflow-hidden mt-[-1vw] ">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full">
          {/* Left - ProfileCard */}
          <div className="md:col-span-3 h-fit hidden md:block overflow-hidden  px-2 py-4">
            <ProfileCard user={user} />
          </div>

          {/* Center - Scrollable Notifications */}
          <div className="md:col-span-6 h-full overflow-y-auto px-4 py-5 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-sm text-gray-600">
                  Loading notifications...
                </span>
              </div>
            ) : notifications?.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() =>
                    handleNotificationClick(
                      item?.notificationType,
                      item?._id,
                      item?.postId,
                      item?.sender?._id
                    )
                  }
                  className={`${
                    item?.isRead ? "bg-white" : "bg-blue-50"
                  } p-4 flex items-start border-b border-gray-300 space-x-4 cursor-pointer rounded-md hover:shadow-sm transition-all`}
                >
                  {/* Profile Image */}
                  <img
                    src={item?.sender?.profilePic}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  {/* Notification Text */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">
                      {item?.sender?.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item?.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item?.updatedAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      ,{" "}
                      {new Date(item?.updatedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <img
                  src="https://static.thenounproject.com/png/4462572-200.png"
                  alt="no-notification"
                  className="w-12 h-12 opacity-50"
                />
                <p className="mt-2 text-sm">No notifications found</p>
              </div>
            )}
          </div>

          {/* Right - AdvertisementCard */}
          <div className="md:col-span-3 hidden md:block overflow-hidden  px-2 py-4">
            <AdvertisementCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Notifications;
