import React from "react";
import Card from "./Cards/Card";

function AdvertisementCard() {
  return (
    <div className="">
      <Card padding={0}>
        {/* banner and user profile pic  */}
        <div className="h-22 w-full relative rounded-md  ">
          <div className="relative w-full h-18 rounded-t-md">
            <img
              src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFubmVyfGVufDB8fDB8fHww"
              alt="Profile_Banner"
              className="w-full h-full object-cover rounded-t-md"
            />
          </div>
          <div className="absolute left-[38%] top-8 h-16 w-16 rounded-full p-[2px] bg-white z-10">
            <img
              src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
              alt="Profile_Banner"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* some details */}
        <div className="p-4">
            <h1 className="text-center text-lg text-gray-700 mt-2 ">Anand Jha</h1>
        <p className="text-center text-sm text-zinc-600">Get the latest job and industry news</p>
        <div className="flex justify-center pt-2">
            <button className="px-10 w-fit text-sm border-blue-950 py-2 bg-blue-700 hover:bg-blue-800 rounded-2xl cursor-pointer text-white">Explore</button>
        </div>
        </div>
        
      </Card>
    </div>
  );
}

export default AdvertisementCard;
