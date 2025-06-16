import React from "react";
import ProfileCard from "../Components/Cards/ProfileCard";
import AdvertisementCard from "../Components/AdvertisementCard";
import MainLayout from "../layouts/MainLayout";

function Notifications() {
  const notifications = [
    { id: 1, title: "John Doe commented on your post.", time: "9h" },
    { id: 2, title: "Alex Roy sent you a friend request.", time: "14h" },
    { id: 3, title: "Neha Sharma started following you.", time: "1d" },
    { id: 4, title: 'Priya commented: "Amazing work!"', time: "2d" },
    { id: 5, title: "Rahul liked your recent post.", time: "3d" },
    { id: 6, title: "Swati viewed your profile.", time: "4d" },
    { id: 7, title: "Amit sent you a connection request.", time: "5d" },
    { id: 8, title: "Alex Roy sent you a friend request.", time: "14h" },
    { id: 9, title: "Neha Sharma started following you.", time: "1d" },
    { id: 10, title: 'Priya commented: "Amazing work!"', time: "2d" },
    { id: 11, title: "Rahul liked your recent post.", time: "3d" },
    { id: 12, title: "Swati viewed your profile.", time: "4d" },
    { id: 13, title: "Amit sent you a connection request.", time: "5d" },
  ];

  return (
    <MainLayout>
      <div className="h-screen  w-full overflow-hidden mt-[-1vw] ">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full">
          {/* Left - ProfileCard */}
          <div className="md:col-span-3 h-fit hidden md:block overflow-hidden  px-2 py-4">
            <ProfileCard />
          </div>

          {/* Center - Scrollable Notifications */}
          <div className="md:col-span-6 h-full overflow-y-auto px-4 py-6 mt-4 space-y-4 bg-white">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="bg-white  p-4  flex items-start border-b border-gray-300 space-x-4 cursor-pointer"
              >
                {/* Profile Image */}
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Notification Text */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
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
