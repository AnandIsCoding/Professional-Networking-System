import React from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../../Redux/Slices/modal.slice";

function ImageModal({ imageUrl }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowModal(null));
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center"
    >
      <img
        src={imageUrl}
        alt="chat_image"
        onClick={(e) => e.stopPropagation()} // prevent closing on image click
        className="rounded-md shadow-lg object-contain
          max-h-[90vh] max-w-[90vw]
          sm:max-w-[80vw] sm:max-h-[80vh]
          md:max-w-[60vw] md:max-h-[70vh]
          lg:max-w-[50vw] lg:max-h-[70vh]
        "
      />
    </div>
  );
}

export default ImageModal;
