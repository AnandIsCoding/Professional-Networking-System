import React, { useEffect } from "react";
import { MdArticle,MdOndemandVideo, MdPhotoLibrary } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { setShowModal } from "../Redux/Slices/modal.slice";
import ModalLayout from "./modal/ModalLayout";
import WritePostModal from "./modal/WritePostModal";

const StartPostBox = ({ showModal, allPost, setAllpost }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleShowModel = () => {
    dispatch(setShowModal("writePost"));
  };
  useEffect(() => {
    dispatch(setShowModal(null));
  }, []);

  return (
    <div className="bg-white border border-zinc-200 p-4 rounded-md md:col-span-3 md:col-start-2 md:row-start-1">
      {/* Top: Avatar and Post Button */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user?.profilePic}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <button
          onClick={handleShowModel}
          className="flex-grow md:font-bold cursor-pointer text-left px-4 py-2 border border-zinc-300 rounded-full text-zinc-600 bg-white hover:bg-zinc-100 outline-none"
        >
          Write a post
        </button>
      </div>

      {/* Bottom: Post Options */}
      <div className="flex justify-between text-sm text-zinc-600 ">
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all">
          <MdPhotoLibrary className="text-blue-500 text-xl" />
          <span>Photo</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 hover:bg-green-100 px-4 py-2 rounded-xl transition-all">
          <MdOndemandVideo className="text-green-500 text-xl" />
          <span>Video</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 hover:bg-orange-100 px-4 py-2 rounded-xl transition-all">
          <MdArticle className="text-orange-500 text-xl" />
          <span>Write article</span>
        </div>
      </div>
      {/* Modal for writing post */}
      {showModal === "writePost" && (
        <ModalLayout title="Start Post" modalName="writePost" showImage={1}>
          <WritePostModal allPost={allPost} setAllpost={setAllpost} />
        </ModalLayout>
      )}
    </div>
  );
};

export default StartPostBox;
