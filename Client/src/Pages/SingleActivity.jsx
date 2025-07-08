import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AdvertisementCard from "../Components/AdvertisementCard";
import ProfileCard from "../Components/Cards/ProfileCard";
import Post from "../Components/Post/Post";
import ShimmerPost from "../Components/Post/ShimmerPost";
import MainLayout from "../layouts/MainLayout";
const baseUrl = import.meta.env.VITE_BASE_URL;

function SingleActivity() {
  const user = useSelector((state) => state.user.user);
  const [post, setPost] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { id } = useParams();
  const fetchPostById = async () => {
    setIsloading(true);
    try {
      const res = await axios.get(`${baseUrl}/post/${id}`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setPost(data?.post);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      setIsloading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    fetchPostById();
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 w-full text-gray-800 mb-5 ">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[25%] space-y-4 h-fit ">
          <ProfileCard user={user} />
        </div>

        {/* Middle Single Post */}
        <div className="md:h-[100vh] w-full lg:w-[50%]  overflow-y-auto ">
          <div className=" h-fit mt-1">
            {isLoading ? <ShimmerPost /> : <Post post={post} />}
          </div>
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

export default SingleActivity;
