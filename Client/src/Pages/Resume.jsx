import React from "react";
import MainLayout from "../layouts/MainLayout";
import AdvertisementCard from "../Components/AdvertisementCard";
import { useSelector } from "react-redux";

function Resume() {
  const user = useSelector((state) => state.user.user);
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 w-full text-gray-800">
        {/* Left: Resume PDF */}
        <div
          className={`w-full sm:w-[75%] ${
            user?.resume ? "min-h-screen" : "min-h-[55vh]"
          } flex`}
        >
          {user?.resume ? (
            <iframe
              src={user.resume}
              className="w-full h-screen rounded-md shadow-md"
              frameBorder="0"
              title="Resume PDF"
            ></iframe>
          ) : (
            <p className="text-center text-gray-600 text-lg px-4 mt-14 md:ml-38">
              😥 No resume uploaded yet. <br />
              You can upload your resume from the{" "}
              <strong>Profile → About</strong> section.
            </p>
          )}
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
