import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileCard({ user }) {
  const navigate = useNavigate()
  const profileImage =
    user?.profilePic && user.profilePic.startsWith("http")
      ? user.profilePic
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.fullName || "User"
        )}`;

  return (
    <Card padding={0}>
      <div className="h-22 w-full relative rounded-md cursor-pointer" onClick={()=>navigate(`/profile/${user?._id}`)}>
        <div className="relative w-full h-18 rounded-t-md" >
          <img
            src={user?.profileBanner}
            alt="Profile_Banner"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80"; // Optional fallback for banner
            }}
            className="w-full h-full object-cover rounded-t-md"
          />
        </div>
        <div className="absolute left-5 top-8 h-16 w-16 rounded-full p-[2px] bg-white z-10">
          <img
            src={user?.profilePic || profileImage}
            alt="Profile_Pic"
           
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-xl font-medium">{user?.fullName}</h1>
        <p className="text-xs">{user?.headline}</p>
        <p className="text-xs">{user?.currentLocation}</p>
        <p className="text-xs md:mt-2">{user?.currentCompany}</p>
      </div>
    </Card>
  );
}

export default ProfileCard;
