import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../Components/Cards/ProfileCard";

function MyNetwork() {
  const [headingText, setHeadingText] = useState("Catch up with Friends");

  return (
    <MainLayout>
      {/* Heading & Buttons */}
      <div className="w-full bg-white rounded-md border border-gray-300 py-4 px-4 sm:px-8 md:px-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-700">
          {headingText}
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setHeadingText("Catch up with Friends")}
            className={`px-4 py-2 rounded-md transition duration-300 text-sm sm:text-base cursor-pointer ${
              headingText === "Catch up with Friends"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setHeadingText("Connection Requests")}
            className={`px-4 py-2 rounded-md transition duration-300 text-sm sm:text-base cursor-pointer ${
              headingText === "Connection Requests"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="w-full px-4 sm:px-8 md:px-14 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(6)].map((_, idx) => (
          <ProfileCard key={idx} />
        ))}
      </div>
    </MainLayout>
  );
}

export default MyNetwork;
