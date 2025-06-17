import React from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import AdvertisementCard from "../Components/AdvertisementCard";
import { GrEdit } from "react-icons/gr";
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

function Profile() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);
  const handleShowModal = (modalname) => {
    dispatch(setShowModal(modalname));
  };
  console.log(showModal);
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 mt-4 pb-14">
        {/* Left/main area: 70% */}
        <div className="lg:w-[70%] w-full flex flex-col gap-4">
          {/* Profile Card */}
          <Card padding={0}>
            <div className="relative ">
              <img
                src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=1200"
                alt="Banner"
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div
                onClick={() => handleShowModal("editProfileImage")}
                className="absolute left-6 bottom-[-3rem] w-24 h-24 rounded-full border-4 border-white overflow-hidden cursor-pointer "
              >
                <img
                  src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                  alt="Profile"
                  className="w-full cursor-pointer h-full object-cover"
                />
              </div>
              {/* edit icon */}
              <div
                onClick={() => handleShowModal("editBanner")}
                className="absolute right-2 top-2 cursor-pointer hover:bg-[#ffffff8e] px-3 py-3 rounded-full overflow-hidden "
              >
                <MdModeEdit size={20} color={'blue'}/>
              </div>
            </div>
            <div className="pt-16 px-6 pb-6 relative">
              <h1 className="text-2xl font-bold">Anand Jha</h1>
              <p className="text-sm text-gray-600 mt-1">
                MERN Stack Developer | Building Softwares
              </p>
              <div className="mt-4 flex flex-wrap gap-3 md:justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShowModal("editAbout")}
                    title="Open Edit About Pop Up"
                    className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer"
                  >
                    Edit Profile
                  </button>
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                    Add To
                  </button>
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                    Share Profile
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShowModal("message")}
                    className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer"
                  >
                    Message
                  </button>
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                    Connect
                  </button>
                </div>
              </div>
              {/* edit icon */}
              <div
                onClick={() => handleShowModal("editInfo")}
                className="absolute right-2 top-2 hover:bg-gray-100 px-3 py-3 rounded-full overflow-hidden cursor-pointer"
              >
                <MdModeEdit size={20} />
              </div>
            </div>
          </Card>

          {/* About Section */}
          <Card padding={1}>
            <div className=" mb-3">
              {/* heading and edit */}
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                {/* edit icon */}
                <div
                  onClick={() => handleShowModal("editAbout")}
                  className=" hover:bg-[#ffffffcc] px-3 py-3 rounded-full overflow-hidden cursor-pointer"
                >
                  <MdModeEdit size={20} />
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                I’m a passionate Full-Stack Developer with a strong focus on
                building dynamic
              </p>
            </div>
          </Card>

          {/* Skills */}
          <Card padding={1}>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "JavaScript",
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Tailwind CSS",
                "REST APIs",
                "Git & GitHub",
                "Redux Toolkit",
                "Cloudinary",
              ].map((skill, index) => (
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
              <div className="w-full overflow-x-auto mt-2 overflow-y-hidden flex gap-1 ">
                <div className="w-[350px] min-h-[560px] shrink-0 cursor-pointer ">
                  <Post />
                </div>
                <div className="w-[350px] min-h-[560px]  shrink-0 cursor-pointer">
                  <Post />
                </div>
                <div className="w-[350px] min-h-[560px]  shrink-0 cursor-pointer">
                  <Post />
                </div>
                <div className="w-[350px]  min-h-[560px] shrink-0 cursor-pointer">
                  <Post />
                </div>
                <div className="w-[350px]  min-h-[560px] shrink-0 cursor-pointer">
                  <Post />
                </div>
                <div className="w-[350px] min-h-[560px]  shrink-0 cursor-pointer">
                  <Post />
                </div>
              </div>
              {/* button to show all posts */}
              <div className="flex justify-center items-center">
                <button
                  title="Show All Posts"
                  className="px-5 py-2 flex justify-between text-sm bg-blue-300 text-black hover:bg-blue-400 rounded-xl transition cursor-pointer"
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
                <IoAddSharp
                  onClick={() => handleShowModal("editExperience")}
                  size={24}
                  className="cursor-pointer text-black"
                />
              </div>

              {/* actual experience with edit icon */}
              <div className="w-full flex justify-between border-t border-gray-200 py-2 ">
                <div>
                  <h2 className="text-gray-900">
                    Sr Software Engineer | Full stack Devloper | Cloud Engineer
                  </h2>
                  <p className="text- text-gray-500">Uber</p>
                  <p className="text-sm text-gray-500">
                    January 2024 - Present
                  </p>
                  <p className="text-sm text-gray-500">Banglore, India</p>
                </div>
                {/* edit icon */}
                <div className=" hover:bg-[#ffffff8e] px-3 py-3 h-fit rounded-full overflow-hidden cursor-pointer">
                  <MdModeEdit size={20} />
                </div>
              </div>
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
    </MainLayout>
  );
}

export default Profile;
