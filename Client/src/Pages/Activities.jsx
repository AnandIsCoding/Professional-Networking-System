import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import ProfileCard from "../Components/Cards/ProfileCard";
import AdvertisementCard from "../Components/AdvertisementCard";
import { useSelector } from "react-redux";
import ShimmerPost from "../Components/Post/ShimmerPost";
import { useParams } from "react-router-dom";
import axios from 'axios'
import Post from "../Components/Post/Post";

const baseUrl = import.meta.env.VITE_BASE_URL;
//  http://localhost:3000/api/v1/post/allpost/68555b1ce5436eec4064e01a

function Activities() {
    const {id} = useParams()
  const user = useSelector((state) => state.user.user);
  const [activities, setActivities] = useState([])
  const [isLoading, setIsloading] = useState(true);
   const fetchPostsActivityPage = async () => {
    setIsloading(true);
    try {
      const res = await axios.get(`${baseUrl}/post/allpost/${id}`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setActivities(data?.posts);
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
    fetchPostsActivityPage();
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 w-full text-gray-800 mb-5 ">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[25%] space-y-4 h-fit ">
          <ProfileCard user={user} />
        </div>

        {/* Middle Feed */}
        <div className="md:h-[100vh] w-full lg:w-[50%]  overflow-y-auto ">
           
          <div className=" h-fit mt-1">
            {isLoading ? (
              Array(2)
                .fill(0)
                .map((item, index) => {
                  return (
                    <div key={index} className="mb-3">
                      {" "}
                      <ShimmerPost key={index} />
                    </div>
                  );
                })
            ) : activities?.length < 1 ? (
              <p>No post found 🥲</p>
            ) : (
              activities?.map((item, index) => {
                return (
                  <div key={item?._id} className="mb-6 ">
                    <Post post={item} />
                  </div>
                );
              })
            )}
          </div>
          <h1 className=" font-semibold rounded-md bg-white px-4 py-2 w-fit text-center "> {activities?.length} &nbsp; Posts as of now</h1>
        </div>

         
        {/* Right Sidebar */}
        <div className="w-full lg:w-[25%] flex flex-col space-y-4 h-fit ">         

          <div className="">
            <AdvertisementCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Activities;
