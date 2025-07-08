import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { setShowModal } from "../../Redux/Slices/modal.slice";

function ImageModal({ imageUrl, setActiveimage }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowModal(null));
    setActiveimage("");
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-xl overflow-hidden shadow-2xl animate-zoomIn p-2 max-w-[90vw] max-h-[90vh] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-red-400 hover:text-red-600 z-10 cursor-pointer"
        >
          <FaTimes size={24} />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt="chat_image"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
}

export default ImageModal;
