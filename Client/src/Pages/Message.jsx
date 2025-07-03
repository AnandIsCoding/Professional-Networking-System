import React from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../Components/Cards/Card";
import UserContactsPanel from "../Components/Chat/UserContactsPanel";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ChatBubble from "../Components/Chat/ChatBubble";
import ScrollChatToBottom from "../utils/ScrollChatToBottom";
import { FcGallery } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";

function Message() {
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
              <div className=" w-[30%] sm:w-[40%] border-r border-zinc-300 overflow-y-auto">
                <UserContactsPanel />
              </div>
              {/* Chat view */}
              <div className=" w-[70%] sm:w-[60%]   px-4 overflow-y-auto text-black custom-scrollbar">
                {/* sticky user name and 3 dots top section */}
                <div className="text-lg font-semibold sticky top-0 z-[999] bg-white py-3 flex justify-between border-b-1 border-zinc-300">
                  <div>
                    <h1>Chat with Sarang Tadaskar</h1>
                    <p className="text-gray-500 text-sm">User 1</p>
                  </div>

                  <div className="cursor-pointer">
                    {" "}
                    <HiOutlineDotsHorizontal size={24} />{" "}
                  </div>
                </div>

                {/* Selected User details */}
                <div className="flex flex-col  sm:gap-2 border-b-1 border-l-0 border-r-0 border-zinc-300  p-2 mb-2">
                  {/* user's profile picture */}
                  <img
                    src="https://imgs.search.brave.com/m3AjEyYqrqs66D2V3HzEOVsAP9yRCKGsKsLCf-_NFgo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"
                    alt="user's_profile_image"
                    className="h-16 w-16 rounded-full"
                  />
                  {/* user's name and occupation etc */}
                  <div className="flex flex-col ">
                    <h1>Sarang Tadaskar</h1>
                    <p className="text-gray-500 text-sm">
                      Btech Graduate, Maharastra India
                    </p>
                  </div>
                </div>

                {/* All Chats */}
                <div className="space-y-4  ">

                  <ChatBubble
                    type="outgoing"
                    name="Anand Jha"
                    image="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    profile="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                  />

                  <ChatBubble
                    type="incoming"
                    name="Sarang Tadaskar"
                    message="This is dummy incoming message"
                    profile="https://imgs.search.brave.com/m3AjEyYqrqs66D2V3HzEOVsAP9yRCKGsKsLCf-_NFgo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"
                  />
                  <ChatBubble
                    type="outgoing"
                    name="Anand Jha"
                    image="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    profile="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                  />

                  <ChatBubble
                    type="incoming"
                    name="Sarang Tadaskar"
                    message="This is dummy incoming message"
                    profile="https://imgs.search.brave.com/m3AjEyYqrqs66D2V3HzEOVsAP9yRCKGsKsLCf-_NFgo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"
                  />
                  {/* scroll to last message on each render */}
                  <ScrollChatToBottom />

                  {/* input box */}
                  {/* Message Input Section */}
                  <div className="sticky bottom-0 left-0 bg-white w-full pt-2 pb-1 border-t border-zinc-200 px-2">
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      {/* Image upload icon */}
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer text-gray-600 hover:text-blue-500"
                      >
                        <FcGallery size={24} />
                      </label>
                      <input type="file" id="imageUpload" className="hidden" />

                      {/* Message input */}
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                      />

                      {/* Send button */}
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200 flex items-center justify-center"
                      >
                        <IoMdSend size={20} className="sm:size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Message;
