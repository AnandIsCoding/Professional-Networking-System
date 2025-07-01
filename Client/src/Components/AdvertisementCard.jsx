import React from "react";
import Card from "./Cards/Card";
import {useSelector} from 'react-redux'

function AdvertisementCard() {
  const user = useSelector(state => state.user.user)
  // console.log(user)
  return (
    <div className="">
      <Card padding={0}>
        {/* banner and user profile pic  */}
        <div className="h-22 w-full relative rounded-md  ">
          <div className="relative w-full h-20 rounded-t-md">
            <img
              src={user?.profileBanner}
              alt="Profile_Banner"
              className="w-full h-full object-cover rounded-t-md"
            />
          </div>
          <div className="absolute left-[38%] top-8 h-16 w-16 rounded-full p-[2px] bg-white z-10">
            <img
              src={user?.profilePic}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* some details */}
        <div className="p-4">
            <h1 className="text-center text-lg text-gray-700 mt-2 ">{user?.fullName}</h1>
        <p className="text-center text-sm text-zinc-600">Get the latest job and industry news</p>
        <div className="flex justify-center pt-2">
            <button className="px-10 w-fit text-sm border-blue-950 py-2 bg-blue-700 hover:bg-blue-800 rounded-2xl cursor-pointer text-white">Buy Premium &nbsp; ✨</button>
        </div>
        </div>
        
      </Card>
    </div>
  );
}

export default AdvertisementCard;
