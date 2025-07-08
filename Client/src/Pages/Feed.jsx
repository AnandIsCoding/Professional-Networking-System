import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AdvertisementCard from "../Components/AdvertisementCard";
import Card from "../Components/Cards/Card";
import ProfileCard from "../Components/Cards/ProfileCard";
import ModalLayout from "../Components/modal/ModalLayout";
import Post from "../Components/Post/Post";
import ShimmerPost from "../Components/Post/ShimmerPost";
import StartPostBox from "../Components/StartPostBox";
import MainLayout from "../layouts/MainLayout";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Feed() {
  const showModal = useSelector((state) => state.modal.showModal);
  const user = useSelector((state) => state.user.user);
  const [allPost, setAllpost] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  // console.log(user)
  const fetchPosts = async () => {
    setIsloading(true);
    try {
      const res = await axios.get(`${baseUrl}/post/allpost`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setAllpost(data?.allPosts);
      }
    } catch (error) {
      console.error("Error in fetching all posts ---->> ", error);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };
  // console.log("allPosts --->> ", allPost);
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 w-full text-gray-800 ">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[25%] space-y-4 h-fit ">
          <ProfileCard user={user} />
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
        <div className=" lg:h-[100vh] custom-scrollbar w-full lg:w-[50%]  overflow-y-auto ">
          <div className=" h-fit">
            <StartPostBox
              showModal={showModal}
              allPost={allPost}
              setAllpost={setAllpost}
            />
            <br></br>
            {isLoading ? (
              Array(2)
                .fill(0)
                .map((item, index) => {
                  return <ShimmerPost key={index} />;
                })
            ) : allPost?.length < 1 ? (
              <p>No post found 🥲</p>
            ) : (
              allPost?.map((item, index) => {
                return (
                  <div key={item?._id} className="mb-6">
                    <Post post={item} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[25%] flex flex-col space-y-4 h-fit ">
          <Card padding={1}>
            <h1 className="text-xl font-semibold text-gray-700">
              Devlinked News
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
