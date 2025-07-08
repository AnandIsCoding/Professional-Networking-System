import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import UserContactsPanel from "../Components/Chat/UserContactsPanel";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ChatBubble from "../Components/Chat/ChatBubble";
import ScrollChatToBottom from "../utils/ScrollChatToBottom";
import { FcGallery } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

import socket from "../../socket.js";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Message() {
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversationUser, setActiveConversationUser] = useState(null);
  const [allMessages, setAllMessages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      Swal.fire(
        "Unsupported file",
        "Only .jpg, .jpeg, .png are allowed",
        "error"
      );
      return;
    }

    const generatedUrl = URL.createObjectURL(file);

    Swal.fire({
      title: "Preview Image",
      imageUrl: generatedUrl,
      imageAlt: "Selected image",
      showCancelButton: true,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl",
        confirmButton:
          "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
        cancelButton:
          "bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300",
      },
      preConfirm: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      URL.revokeObjectURL(generatedUrl); // Always clean up
      if (result.isConfirmed) {
        handleSendMessage(message, file); // ✅ call directly with current message + file
      }
    });
  };

  const handleSendMessage = async (msg = message, img) => {
    if ((msg?.trim?.().length || 0) === 0 && !img) return;

    const toastId = img ? toast.loading("Sending image...") : null;

    try {
      const formData = new FormData();
      formData.append("message", msg);
      formData.append("conversationId", activeConversationId);
      if (img) {
        formData.append("image", img);
      }

      const res = await axios.post(`${baseUrl}/message/new`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = res;
      if (data?.success) {
        // setAllMessages((prev) => [...prev, data.newMessage]);
        if (img) toast.success("Image sent successfully", { id: toastId });
        socket.emit('sendMessage',activeConversationId, data)
      } else {
        if (img)
          toast.error(data?.message || "Failed to send image", { id: toastId });
      }
    } catch (error) {
      if (img)
        toast.error(error?.response?.data?.message || "Failed to send image", {
          id: toastId,
        });
      console.error("Error in sending message --->>", error);
    } finally {
      setImage("");
      setMessage("");
    }
  };

  // Cleanup if needed elsewhere (not required with above revoke)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const fetchConversationMembers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/conversation/all`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        setConversations(data?.conversations);
      } else {
        console.log("data.success is false ----> and response is ---> ", res);
      }
    } catch (error) {
      console.log(
        "something went wrong in fetching conversations ---->> ",
        error
      );
    }
  };
  useEffect(() => {
    fetchConversationMembers();
  }, []);

  // setactive conversation id with socket
  const setActive = (id, details) => {
    setActiveConversationId(id);
    socket.emit('joinConversation',id)
    setActiveConversationUser(details);
  };

  const fetchAllMessagesPerActiveId = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/message/${activeConversationId}`,
        {
          withCredentials: true,
        }
      );
      const { data } = res;
      if (data?.success) {
        // console.log(data.messages);
        setAllMessages(data.messages);
      } else {
        console.log("⚠️ Unexpected API structure:", res);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log("❌ Error in fetching messages per id:", error);
    }
  };

  useEffect(() => {
    if (activeConversationId) {
      fetchAllMessagesPerActiveId();
    }
  }, [activeConversationId]);

  useEffect(()=>{
      socket.on('receiveMessage',(response)=>{
        setAllMessages([...allMessages,response?.newMessage])
      })
  },[allMessages])

  return (
    <MainLayout>
      <div className="w-full ">
        <Card padding={0}>
          {/* Sticky chat container */}
          <div className="sticky top-20 md:top-0 bg-white z-10 rounded-md shadow-md h-[85vh] md:h-[650px] md:mt-[-13px] overflow-hidden ">
            {/* Header */}
            <div className="w-full px-4 py-2 text-lg font-semibold text-gray-800 border-b border-zinc-200">
              Messaging
            </div>

            {/* Split layout */}
            <div className="flex h-[calc(100%-3rem)]">
              {" "}
              {/* 3rem ~ header height */}
              {/* User list */}
              <div className=" w-[30%] sm:w-[40%] border-r border-zinc-300 overflow-y-auto custom-scrollbar">
                <div className="space-y-0">
                  {/* map previous conversations */}
                  {conversations?.length < 1 ? (
                    <div className="text-center text-gray-600 py-10">
                      <p className="text-lg font-medium">
                        No Previous Conversations Found 😥
                      </p>
                      <p className="text-sm text-gray-500 mt-4 md:mt-1">
                        Start a new chat to see it here.
                      </p>
                      <p className="text-sm text-gray-500 mt-4 md:mt-1">
                        Go to Friend's profile just message them to start
                        Chatting.
                      </p>
                    </div>
                  ) : (
                    conversations.map((item, index) => (
                      <UserContactsPanel
                        setActive={setActive}
                        activeConversationId={activeConversationId}
                        item={item}
                        key={item._id || index}
                      />
                    ))
                  )}
                </div>
              </div>
              {/* Chat view */}
              {/* Chat view */}
              <div className="w-[70%] sm:w-[60%] flex flex-col h-full max-h-[650px]">
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-zinc-300 flex justify-between items-center text-lg font-semibold text-gray-800 bg-white sticky top-0 z-10">
                  {activeConversationId && (
                    <h1>Chat with {activeConversationUser?.fullName}</h1>
                  )}
                  <HiOutlineDotsHorizontal
                    size={24}
                    className="cursor-pointer"
                  />
                  
                </div>

              

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 custom-scrollbar z-[999]">
                  {activeConversationId && allMessages.length < 1 ? (
                    <p className="text-sm text-gray-500">No messages yet.</p>
                  ) : (
                    allMessages.map((item, index) => (
                      <ChatBubble
                        key={index}
                        type={
                          item?.sender?._id === user._id
                            ? "outgoing"
                            : "incoming"
                        }
                        name={item?.sender?.fullName}
                        image={item?.image}
                        message={item?.message}
                        profile={item?.sender?.profilePic}
                      />
                    ))
                  )}
                  <ScrollChatToBottom dependency={allMessages.length} />
                </div>

                {/* Input Box */}
                {activeConversationUser && (
                  <div className="border-t border-zinc-200 bg-white px-3 py-2">
                    <div className="flex items-center gap-2 flex-wrap  mb-[-20vw] md:mb-0">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer text-gray-600 hover:text-blue-500"
                      >
                        <FcGallery size={24} />
                      </label>
                      <input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                      />

                      {/* Message input */}
                      <input
                        type="text"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                      />

                      {/* Send button */}
                      <button
                        type="button"
                        onClick={() => handleSendMessage()}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200 flex items-center justify-center"
                      >
                        <IoMdSend size={20} className="sm:size-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Message;
