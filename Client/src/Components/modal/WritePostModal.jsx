import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";
import { useDispatch } from "react-redux";

import { setShowModal } from "../../Redux/Slices/modal.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function WritePostModal({ allPost, setAllpost }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [postImage, setPostimage] = useState("");
  const [preview, setPreview] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostimage(file);
      const generateUrl = URL.createObjectURL(file);
      setPreview(generateUrl);
    }
  };

  // console.log("Image is ---> ", preview);
  const handleCreatePost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("postImage", postImage);
    if (description.trim().length < 1 && !postImage) {
      toast.error("To create a post image or description is required");
    }
    const toastId = toast.loading("Please wait ....");
    try {
      const res = await axios.post(`${baseUrl}/post/new`, formData, {
        withCredentials: true,
      });
      const { data } = res;
      if (data.success) {
        toast.success(data.message || "Post created successfully", {
          id: toastId,
        });

        // ✅ Optimistically add new post to feed
        setAllpost((prev) => [data.post, ...prev]);

        // Optional: reset form
        setDescription("");
        setPostimage("");
        setPreview("");
        dispatch(setShowModal(null));
      } else {
        toast.error(data.message || "Post creation failed failed", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(
        "Error in handleCreatePost in WritePostModal.jsx ---->>",
        error
      );
      toast.error(error.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <textarea
        onChange={handleDescriptionChange}
        value={description}
        rows={6}
        placeholder="What do you want to talk about ? "
        className="my-3 outline-none text-xl p-2 w-[100%]"
      ></textarea>

      <div>
        <img
          src={
            preview
              ? preview
              : "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="image"
          className=" w-28 h-28 rounded-xl"
        />
      </div>

      <div className="flex justify-between">
        {/* input */}
        <div className="my-2">
          <label htmlFor="inputfile" className="cursor-pointer">
            {" "}
            <FcGallery size={25} color="blue" />{" "}
          </label>
          <input
            id="inputfile"
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {/* post it */}
        <div
          onClick={handleCreatePost}
          className="bg-blue-700 rounded-xl px-5 py-2 cursor-pointer h-fit text-white"
        >
          Post
        </div>
      </div>
    </div>
  );
}

export default WritePostModal;
