import React from "react";
import StartPostBox from "../Components/StartPostBox";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import ProfileCard from "../Components/Cards/ProfileCard";
import AdvertisementCard from "../Components/AdvertisementCard";

function Feed() {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 w-full text-gray-800">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[25%] space-y-4 h-fit md:sticky md:top-17">
          <ProfileCard />
          <Card padding={1}>
            <div className="flex justify-between text-sm">
              <span>Post Viewers</span>
              <span>23</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Post Impressions</span>
              <span>37</span>
            </div>
          </Card>
        </div>

        {/* Middle Feed */}
        <div className="w-full lg:w-[50%]">
          <StartPostBox />
        </div>

        {/* Right Sidebar */}
        {/* Right Sidebar */}
        <div className="w-full lg:w-[25%] flex flex-col space-y-4 h-fit md:sticky md:top-17">
          <Card padding={1}>
            <h1 className="text-xl font-semibold text-gray-700">
              LinkedIn News
            </h1>
            <h2 className="text-md font-semibold text-gray-500">Top Stories</h2>
            <div className="text-sm text-gray-500 space-y-1 mt-2">
              <p>Air India flight crash leaves 265 dead</p>
              <span className="text-xs text-gray-400">2 hours ago</span>
              <p>Startup scene sees major funding cuts</p>
              <span className="text-xs text-gray-400">1 day ago</span>
              <p>Remote work changing hiring trends</p>
              <span className="text-xs text-gray-400">2 minutes ago</span>
            </div>
          </Card>

          <div className="">
            <AdvertisementCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Feed;
