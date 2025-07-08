import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../Redux/Slices/modal.slice";
import ImageModal from "./ImageModal";

function ChatBubble({ type, name, message, image, profile }) {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);
  const [activeImage, setActiveimage] = useState("");

  const isIncoming = type === "incoming";

  const handleImageClick = (image) => {
    setActiveimage(image);
    dispatch(setShowModal("chatImage"));
  };

  return (
    <div
      className={`flex items-start gap-2 ${
        isIncoming ? "justify-start" : "justify-end"
      }`}
    >
      {/* Profile image (left for incoming, right for outgoing) */}
      {isIncoming && (
        <img src={profile} alt="profile" className="h-8 w-8 rounded-full" />
      )}

      <div
        className={`max-w-[70%] ${
          isIncoming ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
        } rounded-lg px-3 py-2 ${!isIncoming && "text-right"}`}
      >
        <p className="text-sm font-medium">{name}</p>

        {/* Conditional text message */}
        {message && <p className="text-sm mt-1">{message}</p>}

        {/* Conditional image */}
        {image && (
          <img
            src={image}
            onClick={() => handleImageClick(image)}
            alt="chat"
            className="rounded-lg md:h-[14vw] mt-2 max-w-full object-contain cursor-pointer"
          />
        )}
      </div>

      {/* Profile image on right if outgoing */}
      {!isIncoming && (
        <img src={profile} alt="profile" className="h-8 w-8 rounded-full" />
      )}

      {showModal === "chatImage" && activeImage && (
        <ImageModal imageUrl={activeImage} setActiveimage={setActiveimage} />
      )}
    </div>
  );
}

export default ChatBubble;
