import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import AdvertisementCard from "../Components/AdvertisementCard";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

import Post from "../Components/Post/Post";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../Redux/Slices/modal.slice";
import ModalLayout from "../Components/modal/ModalLayout";
import Banner from "../Components/modal/Banner";
import About from "../Components/modal/About";
import Experience from "../Components/modal/Experience";
import Info from "../Components/modal/Info";
import Message from "../Components/modal/Message";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ShareDialog from "../Components/modal/ShareDialog";
import Swal from "sweetalert2";
import { setUser } from "../Redux/Slices/auth.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Profile() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);
  const [showShareDialog, setShowshareDialog] = useState(false);
  const user = useSelector((state) => state.user.user); // subscribe to user
  const { id } = useParams();
  const navigate = useNavigate();
  const handleShowModal = (modalname) => {
    dispatch(setShowModal(modalname));
  };
  const [userData, setUserdata] = useState([]);
  const [top5Posts, setTop5posts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // or use _id instead
  const [editExperience, setEditExperience] = useState({
    designation: "",
    companyName: "",
    duration: "",
    location: "",
  });

  const MAX_LINES = 4;
  const toggleExpand = () => setExpanded((prev) => !prev);
  
  const fetchUserdata = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/auth/profile/${id}`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setUserdata(data?.user);
      } else {
        console.log("Error in fetching profile by id ---> ", error);
      }
    } catch (error) {
      console.log("Error in fetching profile by id ---->> ", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  // top 5 posts that will be displayed in Activities section
  const fetchTop5Posts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/post/top5/${id}`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setTop5posts(data?.posts);
      } else {
        console.log("Problem in fetching top5 posts of profile ---> ", res);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.log("Error in fetching top 5 posts ----> ", error);
    }
  };

  // delete a particular experience, receives id exp._id
  const handleDeleteExperience = async (expId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this experience?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmed.isConfirmed) return;

    try {
      const res = await axios.put(
        `${baseUrl}/user/auth/update`,
        {
          user: {
            deleteExperienceId: expId, // 👈 Backend will use this to delete
          },
        },
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        Swal.fire("Deleted!", "Experience removed.", "success");
        dispatch(setUser(res?.data?.user));
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete experience", "error");
    }
  };

  useEffect(() => {
    fetchUserdata();
    fetchTop5Posts();
  }, [user]);

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 mt-4 pb-14">
        {/* Left/main area: 70% */}
        <div className="lg:w-[70%] w-full flex flex-col gap-4">
          {/* Profile Card */}
          <Card padding={0}>
            <div className="relative ">
              <img
                src={
                  userData?.profileBanner ||
                  "https://res.cloudinary.com/dm0rlehq8/image/upload/v1750167749/default_banner_r0agoh.jpg"
                }
                alt="Profile_Banner"
                className="w-full h-52 object-cover rounded-t-md"
              />
              <div
                onClick={() => {
                  id === user._id && handleShowModal("editProfileImage");
                }}
                className="absolute left-6 bottom-[-3rem] w-32 h-32 rounded-full border-4 border-white overflow-hidden cursor-pointer! "
              >
                <img
                  src={userData?.profilePic}
                  alt="Profile"
                  className={`w-full ${
                    id !== user?._id ? "cursor-pointer" : ""
                  } h-full object-cover`}
                />
              </div>
              {/* edit icon */}
              {user?._id === userData?._id && (
                <div
                  onClick={() => handleShowModal("editBanner")}
                  className="absolute right-2 top-2 cursor-pointer hover:bg-[#ffffff8e] px-3 py-3 rounded-full overflow-hidden "
                >
                  <MdModeEdit size={20} color={"blue"} />
                </div>
              )}
            </div>
            <div className="pt-16 px-6 pb-6 relative">
              <h1 className="text-2xl font-bold">{userData?.fullName}</h1>

              <p className="text-sm text-gray-600 mt-1">
                {userData?.friends?.length} &nbsp; Connections
              </p>
              <p className="text-md text-gray-600 mt-1">{userData?.headline}</p>
              <p className="text-sm text-gray-700 mt-1">
                {userData?.currentCompany}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {userData?.currentLocation}
              </p>
              <p
                className={`whitespace-pre-line transition-all duration-200 ${
                  expanded ? "" : "line-clamp-4"
                }`}
              >
                {userData?.about}
              </p>

              {userData?.about?.split("\n").length > MAX_LINES && (
                <button
                  onClick={toggleExpand}
                  className="mt-2 text-blue-600 hover:underline font-medium"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              )}
              <div className="mt-4 flex flex-wrap gap-3 md:justify-between">
                <div className="flex gap-3">
                  {id === user?._id && (
                    <button
                      onClick={() => handleShowModal("editAbout")}
                      title="Open Edit About Pop Up"
                      className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  )}
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                    Add To
                  </button>
                  <button
                    onClick={() => setShowshareDialog((prev) => !prev)}
                    className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer"
                  >
                    Share Profile
                  </button>
                </div>
                {/* show message only on other user's profile , not on my */}
                <div className="flex gap-3">
                  {id !== user?._id && (
                    <button
                      onClick={() => handleShowModal("message")}
                      className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer"
                    >
                      Message
                    </button>
                  )}
                  {user?._id !== id && (
                    <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                      Connect
                    </button>
                  )}
                </div>
              </div>
              {/* edit icon */}
              {user?._id === userData?._id && (
                <div
                  onClick={() => handleShowModal("editInfo")}
                  className="absolute right-2 top-2 hover:bg-gray-100 px-3 py-3 rounded-full overflow-hidden cursor-pointer"
                >
                  <MdModeEdit size={20} />
                </div>
              )}
            </div>
          </Card>

          {/* About Section */}
          <Card padding={1}>
            <div className=" mb-3">
              {/* heading and edit */}
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                {/* edit icon */}
                {user?._id === userData?._id && (
                  <div
                    onClick={() => handleShowModal("editAbout")}
                    className=" hover:bg-[#ffffffcc] px-3 py-3 rounded-full overflow-hidden cursor-pointer"
                  >
                    <MdModeEdit size={20} />
                  </div>
                )}
              </div>

              <p
                className={`whitespace-pre-line transition-all duration-200 ${
                  expanded ? "" : "line-clamp-4"
                }`}
              >
                {userData?.about}
              </p>

              {userData?.about?.split("\n").length > MAX_LINES && (
                <button
                  onClick={toggleExpand}
                  className="mt-2 text-blue-600 hover:underline font-medium"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              )}
            </div>
          </Card>

          {/* Skills */}
          <Card padding={1}>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {userData?.skills?.map((skill, index) => (
                <button
                  key={index}
                  className="px-4 py-1.5 text-sm font-medium bg-white  text-blue-700 border border-blue-600 rounded-xl shadow-sm transform hover:scale-105 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </Card>

          {/* activity, 5 posts */}
          <div>
            <Card padding={1}>
              {/* heading and button */}
              <h2 className="text-lg font-semibold mb-2">Activities</h2>
              <button className="w-fit px-4 py-1.5 text-sm font-medium bg-green-500  text-white border  rounded-xl shadow-sm transform hover:scale-105 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                Posts
              </button>

              {/* x axis scrollable parent div */}
              <div className="w-full overflow-x-auto mt-2 overflow-y-hidden flex gap-1 custom-posts-scrollbar">
                {top5Posts.length < 1 ? (
                  <p>No posts till now</p>
                ) : (
                  top5Posts.map((post, index) => {
                    return (
                      <div
                        key={post._id}
                        className={`w-[350px] md:w-[400px] my-2 ${
                          post.postImage === "" ? "h-fit" : "min-h-[560px]"
                        } cursor-pointer shrink-0`}
                      >
                        <Post post={post} />
                      </div>
                    );
                  })
                )}
              </div>
              {/* button to show all posts */}
              <div className="flex justify-center items-center">
                <button
                  onClick={() => navigate(`/profile/${id}/activities`)}
                  title="Show All Posts"
                  className="px-5 mt-2 py-2  flex justify-between text-sm bg-blue-300 text-black hover:bg-blue-200 rounded-xl transition cursor-pointer"
                >
                  <span>Show All Posts </span>
                  <FaArrowRightLong className="mt-1 mx-3" />
                </button>
              </div>
            </Card>
          </div>

          {/* Experience */}
          <div className=" w-full  ">
            <Card padding={1}>
              {/* heading Experience and add + icon */}
              <div className="w-full flex justify-between ">
                <h2 className="text-lg font-semibold mb-2">Experience</h2>
                {user?._id === userData?._id && (
                  <IoAddSharp
                    onClick={() => handleShowModal("editExperience")}
                    size={24}
                    className="cursor-pointer text-black"
                  />
                )}
              </div>

              {/* actual experience with edit icon */}
              {userData?.experience?.map((exp, index) => {
                return (
                  <div
                    key={exp._id}
                    className="w-full flex justify-between border-t border-gray-200 py-2 "
                  >
                    <div>
                      <h2 className="text-gray-900">{exp?.designation}</h2>
                      <p className="text- text-gray-500">{exp?.companyName}</p>
                      <p className="text-sm text-gray-500">{exp?.duration}</p>
                      <p className="text-sm text-gray-500">{exp?.location}</p>
                    </div>
                    {/* edit icon */}
                    {user?._id === userData?._id && (
                      <div
                        onClick={() => handleDeleteExperience(exp._id)}
                        className=" hover:bg-[#ffffff8e] px-3 py-3 h-fit text-pink-300 hover:text-[red] rounded-full overflow-hidden cursor-pointer"
                      >
                        <MdDelete size={20} />
                      </div>
                    )}
                  </div>
                );
              })}
            </Card>
          </div>
        </div>

        {/* Right sidebar (30%) */}
        <div className="lg:w-[30%] w-full space-y-4">
          <AdvertisementCard />
          {/* Future: could add Featured section, etc. */}
        </div>
      </div>

      {/* modals showing logic 😊😊😊😊😊😊😊😊 */}
      {/* about section edit modal */}
      {showModal === "editAbout" && (
        <ModalLayout title="Edit About" modalName="editAbout" showImage={1}>
          <About />
        </ModalLayout>
      )}

      {/* experience edit modal */}
      {showModal === "editExperience" && (
        <ModalLayout
          title="Edit Experience"
          modalName="editExperience"
          showImage={1}
        >
          <Experience />
        </ModalLayout>
      )}

      {/* Edit Banner Image */}
      {showModal === "editBanner" && (
        <ModalLayout title="Edit Banner" modalName="editBanner" showImage={1}>
          <Banner banner={1} />
        </ModalLayout>
      )}

      {/* Edit Banner Image */}
      {showModal === "editProfileImage" && (
        <ModalLayout
          title="Edit Profile Image"
          modalName="editProfileImage"
          showImage={1}
        >
          <Banner banner={0} />
        </ModalLayout>
      )}
      {/* edit info */}
      {showModal === "editInfo" && (
        <ModalLayout title="Edit Info" modalName="editInfo" showImage={1}>
          <Info banner={0} />
        </ModalLayout>
      )}

      {/* message model */}
      {showModal === "message" && (
        <ModalLayout title="Message" modalName="message" showImage={1}>
          <Message banner={0} />
        </ModalLayout>
      )}

      {/* share profile */}
      {showShareDialog && (
        <ShareDialog
          heading="Profile"
          showShareDialog={showShareDialog}
          setShowshareDialog={setShowshareDialog}
        />
      )}
    </MainLayout>
  );
}

export default Profile;
