import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../Components/Cards/ProfileCard";
import toast from "react-hot-toast";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

function MyNetwork() {
  const [headingText, setHeadingText] = useState("Catch up with Friends");
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingrequest] = useState([]);
  const fetchFriends = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/myfriends`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setFriends(data?.friends);
      } else {
        toast.error("SOmething went wrong");
      }
    } catch (error) {
      console.log("Error in fetching friends ---> ", error);
      return toast.error(
        error.response?.data?.message ||
          "Something went wrong in fetching friends"
      );
    }
  };
  const fetchPendingrequests = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/mypendingfriendrequests`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setPendingrequest(data?.pendingRequests);
      } else {
        toast.error("SOmething went wrong");
      }
    } catch (error) {
      console.log("Error in fetching pending Requests ---> ", error);
      return toast.error(
        error.response?.data?.message ||
          "Something went wrong in fetching pending requests"
      );
    }
  };
  useEffect(() => {
    fetchFriends();
    fetchPendingrequests()
  }, []);
  console.log("friends ---->> ", friends);

  return (
    <MainLayout>
      {/* Heading & Buttons */}
      <div className="w-full bg-white rounded-md border border-gray-300 py-4 px-4 sm:px-8 md:px-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-700">{headingText}</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setHeadingText("Catch up with Friends")}
            className={`px-4 py-2 rounded-md transition duration-300 text-sm sm:text-base cursor-pointer ${
              headingText === "Catch up with Friends"
                ? "bg-blue-700 text-white"
                : "border border-gray-600 text-black"
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setHeadingText("Connection Requests")}
            className={`px-4 py-2 rounded-md transition duration-300 text-sm sm:text-base cursor-pointer ${
              headingText === "Connection Requests"
                ? "bg-blue-700 text-white"
                : "border border-gray-600 text-black"
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="w-full px-4 sm:px-8 md:px-14 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {headingText === "Catch up with Friends"
          ? friends.length < 1 && <p>No friends found</p>
          : pendingRequests.length < 1 && <p>No Pending Request found</p>}
        {headingText === "Catch up with Friends"
          ? friends.map((item, idx) => <ProfileCard user={item} key={item._id} />)
          : pendingRequests.map((item, index) => {
              return <ProfileCard user={item} key={item._id} />;
            })}
      </div>
    </MainLayout>
  );
}

export default MyNetwork;
