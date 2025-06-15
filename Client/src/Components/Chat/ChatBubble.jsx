import React from "react";

function ChatBubble({ type, name, message, image, profile }) {
  const isIncoming = type === "incoming";

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
        <h1 className="text-sm font-medium">{name}</h1>

        {/* Conditional text message */}
        {message && <p className="text-sm mt-1">{message}</p>}

        {/* Conditional image */}
        {image && (
          <img
            src={image}
            alt="chat"
            className="rounded-lg mt-2 max-w-full object-contain"
          />
        )}
      </div>

      {/* Profile image on right if outgoing */}
      {!isIncoming && (
        <img src={profile} alt="profile" className="h-8 w-8 rounded-full" />
      )}
    </div>
  );
}

export default ChatBubble;
