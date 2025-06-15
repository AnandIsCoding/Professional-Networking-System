import React from "react";
import MainLayout from "../layouts/MainLayout";
import AdvertisementCard from "../Components/AdvertisementCard";

function Resume() {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 w-full text-gray-800">
        {/* Left: Resume PDF */}
        <div className="w-full sm:w-[75%] min-h-[100vh]">
          <iframe
            src="https://docs.google.com/gview?url=https://anandjii.web.app/AnandJhaResume.pdf&embedded=true"
            className="w-full h-screen rounded-md"
            frameBorder="0"
            title="Resume PDF"
          ></iframe>
        </div>

        {/* Right: Sticky Advertisement Card */}
        <div className=" h-fit">
          <AdvertisementCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default Resume;
