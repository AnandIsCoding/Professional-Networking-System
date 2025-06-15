import React from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import AdvertisementCard from "../Components/AdvertisementCard";
import { GrEdit } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";

function Profile() {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 mt-4 pb-14">
        {/* Left/main area: 70% */}
        <div className="lg:w-[70%] w-full flex flex-col gap-4">
          {/* Profile Card */}
          <Card padding={0}>
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=1200"
                alt="Banner"
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="absolute left-6 bottom-[-3rem] w-24 h-24 rounded-full border-4 border-white overflow-hidden ">
                <img
                  src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* edit icon */}
              <div className="absolute right-2 top-2 bg-gray-200 px-3 py-3 rounded-full overflow-hidden cursor-pointer">
                <MdModeEdit size={20} />
              </div>
            </div>
            <div className="pt-16 px-6 pb-6 relative">
              <h1 className="text-2xl font-bold">Anand Jha</h1>
              <p className="text-sm text-gray-600 mt-1">
                MERN Stack Developer | Building Softwares
              </p>
              <div className="mt-4 flex flex-wrap gap-3 md:justify-between">
                <div className="flex gap-3">
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
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
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                    Message
                  </button>
                  <button className="px-5 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition cursor-pointer">
                    Connect
                  </button>
                </div>
              </div>
              {/* edit icon */}
              <div className="absolute right-2 top-2 bg-gray-100 px-3 py-3 rounded-full overflow-hidden cursor-pointer">
                <MdModeEdit size={20} />
              </div>
            </div>
          </Card>

          {/* About Section */}
          <Card padding={1}>
            <div className="relative">
              <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              I’m a passionate Full-Stack Developer with a strong focus on
              building dynamic, scalable web applications using the MERN stack
              (MongoDB, Express.js, React, and Node.js). With a keen eye for
              UI/UX, I enjoy crafting clean, responsive interfaces and writing
              maintainable backend logic. <br />
              <br />
              Over the past few years, I’ve worked on several real-world
              projects including Learning Management Systems, social platforms,
              and RESTful APIs. I'm always curious to learn new technologies and
              push my boundaries as a developer.
            </p>
            {/* edit icon */}
              <div className="absolute right-2 top-2 bg-gray-100 px-3 py-3 rounded-full overflow-hidden cursor-pointer">
                <MdModeEdit size={20} />
              </div>
            </div>
          </Card>

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

        </div>

        {/* Right sidebar (30%) */}
        <div className="lg:w-[30%] w-full space-y-4">
          <AdvertisementCard />
          {/* Future: could add Featured section, etc. */}
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
