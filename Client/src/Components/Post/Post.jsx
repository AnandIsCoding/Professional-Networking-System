import React, { useState } from "react";
import Card from "../Cards/Card";
import { AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function Post({ post }) {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const description = post?.description;
  // sendcomment handler function
  const sendComment = async (event) => {
    event.preventDefault();
  };
  const localtion = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <Card padding={0}>
      <div className="px-8 py-4 flex gap-6 h-fit ">
        <div className=" h-14 w-14 rounded-full p-[2px] bg-white z-10">
          <img
            src={post?.user?.profilePic}
            alt="Profile_Banner"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* name */}
        <div className="text-gray-600">
          <h1 className="text-xl text-black">{post?.user?.fullName}</h1>
          <p className="text-sm">{post?.user?.headline}</p>
        </div>
      </div>
      {/* description */}
      {
        description && <div className="w-full px-8 py-2 text-gray-700">
        <p className="whitespace-pre-line text-gray-700">
          {showMore
            ? description
            : description?.split(" ").slice(0, 20).join(" ")}
          {description?.split(" ").length > 20 && (
            <span
              onClick={() => setShowMore((prev) => !prev)}
              className="text-blue-500 cursor-pointer"
            >
              {showMore ? " See less" : " See more"}
            </span>
          )}
        </p>
      </div>
      }

      {/* image */}
      {post?.postImage && (
        <div className="w-full h-[300px] mt-4 ">
          <img
            src={post?.postImage}
            alt="Post_image"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* number of likes and comment */}
      <div className="px-4 py-2 flex justify-between">
        <div className="flex gap-3">
          <AiFillLike size={20} color="blue" className="mt-[1px]" />
          <p> {post?.likes?.length}</p>
        </div>
        <div className="flex gap-3">
          {/* <FaRegCommentDots size={20}  className="mt-[1px]"/> */}
          <p> {post?.comments?.length} comment</p>
        </div>
      </div>

      {/* like comment share */}
      <div
        className={`px-14 py-6 flex justify-between ${
          isProfilePage ? "hidden" : ""
        }`}
      >
        <div title='I like this' className="flex gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full">
          <AiFillLike  size={22} color="blue" className="mt-[1px]" />
          <p> Like</p>
        </div>
        <div
          onClick={() => setShowComments((prev) => !prev)}
          className="flex gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full"
        >
          <MdComment size={22} className="mt-[1px]" />
          <p> Comment</p>
        </div>
        <div className="flex gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full">
          <IoShareSocial size={22} className="mt-[1px]" />
          <p>Share</p>
        </div>
      </div>

      {/* new comment onClick of comment */}
      {showComments && (
        <>
          <div className="w-full px-4 pt-3">
            {/* comment input */}
            <form className="flex gap-2">
              {/* user image */}
              <div className=" h-10 w-13 rounded-full p-[2px] bg-white z-10">
                <img
                  src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                  alt="Profile_Banner"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* input box */}
              <input
                type="text"
                placeholder="Enter comment"
                className="w-full px-5 py-2 rounded-full outline-none border-1 border-zinc-400"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition cursor-pointer"
                onClick={sendComment}
              >
                Send
              </button>
            </form>
          </div>
          {/* all comments */}
          <div className="px-14 py-2 h-fit ">
            <div className=" h-10 w-10 rounded-full p-[2px] bg-white z-10">
              <img
                src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                alt="Profile_Banner"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1>Aditya jha</h1>
              <p className="text-sm text-gray-600 "> @ Sanskrit Proffessor</p>
            </div>
            {/* actual comment */}
            <div>
              <p className="text-sm text-gray-800 ">
                {" "}
                this is actual comment !!! ...............
              </p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default Post;
