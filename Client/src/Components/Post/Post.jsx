import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import { AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Post({ post }) {
  const [showMore, setShowMore] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommenttext] = useState("");
  const [commentCount, setCommentCount] = useState(post?.totalComments || 0);


  useEffect(() => {
    if (user && post?.likes) {
      const liked = post.likes.some((id) => String(id) === String(user._id));
      setIsliked(liked);
    }

  }, [post.likes, user]);


  const description = post?.description;

  const localtion = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");
  // api call on click of like btn, signle api for like dislike
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/post/like-dislike`,
        { postId: post?._id },
        { withCredentials: true }
      );
      const { data } = res;
      // console.log(res);
      // console.log(isLiked);
      if (data.success) {
        setIsliked((prev) => !prev); // Optimistic update
      }
      // toast.success(data?.message);
    } catch (error) {
      console.log("Error in like post ---> handleLike ---> ", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong in liking post"
      );
    }
  };
  // add comment
  const handleSendComment = async (event, postId) => {
    event.preventDefault();
    if(commentText.trim().length<1) return toast.error('Please Enter a valid comment')
    try {
      const res = await axios.post(
        `${baseUrl}/comment/add`,
        { comment: commentText, postId },
        { withCredentials: true }
      );
      const { data } = res;
      if (data?.success) {
        // console.log("commented successfullly ---> ", data);
        toast.success(data?.message || "Comment added successfully");
        setComments((prev) => [data.comment, ...prev]); // ✅ Update comments locally
        setCommenttext(""); // ✅ Clear input
        setCommentCount(prev => prev + 1);
      } else {
        console.log("Problem in sendcomment --->", data);
      }
    } catch (error) {
      console.log("Error in handleSendComment ---> ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  // fetch comments by postid
  const fetchCommentsOfPost = async (postId) => {
    try {
      const res = await axios.get(`${baseUrl}/comment/post/${postId}`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data.success) {
        // console.log("comments fetched successfully ---> ", data.comments);
        setComments(data.comments);
      } else {
        console.log("Problem in fetching comments ---> ", data);
      }
    } catch (error) {
      console.log("Error in fetching comments ---> ", error);
    }
  };
  // console.log('Post is ',post)

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
      {description && (
        <div className="w-full px-8 py-2 text-gray-700">
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
      )}

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
          <p> {post?.likes?.length} &nbsp; Like</p>
        </div>
        <div className="flex gap-3">
          <p> {commentCount} &nbsp; comment</p>
        </div>
      </div>

      {/* like comment share */}
      <div
        className={`px-14 py-6 flex justify-between ${
          isProfilePage ? "hidden" : ""
        }`}
      >
        <div
          onClick={handleLike}
          title="I like this"
          className="flex gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full"
        >
          <AiFillLike
            size={22}
            color={isLiked ? "blue" : ""}
            className={`mt-[1px]`}
          />
          <p> {isLiked ? "Liked" : "Like"}</p>
        </div>
        <div
          onClick={() => {
            setShowComments((prev) => !prev);
            fetchCommentsOfPost(post?._id);
          }}
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
          <div className="w-full px-4 pt-3 ">
            {/* comment input */}
            <form
              onSubmit={(event) => handleSendComment(event, post._id)}
              className={`flex gap-2 ${comments.length < 1 ? "mb-4" : "mb-2"}`}
            >
              {/* user image */}
              <div className=" h-10 w-13 rounded-full p-[2px] bg-white z-10">
                <img
                  src={user?.profilePic}
                  alt="Profile_Banner"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* input box */}
              <input
                type="text"
                placeholder="Enter comment"
                value={commentText}
                onChange={(event) => setCommenttext(event.target.value)}
                className="w-full px-5 py-2 rounded-full outline-none border-1 border-zinc-400"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition cursor-pointer">
                Send
              </button>
            </form>
          </div>
          {/* all comments */}
          <div className="max-h-[300px] overflow-y-auto  custom-scrollbar ">
            {comments &&
              comments?.map((item, index) => {
                return (
                  <div key={index} className="px-14 py-2 h-fit">
                    <div className=" h-10 w-10 rounded-full p-[2px] bg-white z-10">
                      <img
                        src={item?.user?.profilePic}
                        alt="Profile_Banner"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h1>{item?.user?.fullName}</h1>
                      <p className="text-sm text-gray-600 ">
                        {" "}
                        {item?.user?.headline}
                      </p>
                    </div>
                    {/* actual comment */}
                    <div>
                      <p className="text-sm text-gray-800 "> {item?.comment}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </Card>
  );
}

export default Post;
