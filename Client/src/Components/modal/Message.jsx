import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { setUser } from "../../Redux/Slices/auth.slice";
import { setShowModal } from "../../Redux/Slices/modal.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Message({ userData }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim().length < 1) return;

    const toastId = toast.loading("Sending message...");

    try {
      const res = await axios.post(
        `${baseUrl}/conversation/new`,
        { receiverId: userData?._id, message },
        { withCredentials: true }
      );
      const { data } = res;

      if (data?.success) {
        toast.dismiss(toastId);
        setMessage("");
        dispatch(setShowModal(null));

        // SweetAlert2 with redirect after confirm
        await Swal.fire({
          icon: "success",
          title: "Message Sent!",
          html: `<strong>For future chatting</strong>, go to the <b>Message</b> tab and continue your conversation.`,
          confirmButtonText: "Go to Messages",
          confirmButtonColor: "#2563eb",
          background: "#fff",
          customClass: {
            popup: "rounded-xl shadow-md",
          },
        });

        // Redirect after user clicks OK
        navigate("/message");
      } else {
        toast.error(data?.message || "Something went wrong", { id: toastId });
        console.log(res);
        dispatch(setShowModal(null));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      console.log(error);
      setMessage("");
      dispatch(setShowModal(null));
    }
  };

  return (
    <div className="w-full mx-auto pt-8 md:pt-0">
      <div className="text-3xl font-bold text-center text-gray-800 mb-5 flex justify-center">
        {" "}
        <IoChatboxEllipsesOutline color="blue" /> &nbsp; &nbsp;
        <span>Send a Message</span>
      </div>

      <form
        onSubmit={handleSend}
        className="bg-white/60 w-full backdrop-blur-md  rounded-2xl md:p-2 space-y-6"
      >
        {/* Textarea */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Your Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="7"
            placeholder="Write your message..."
            className="w-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            title="Send message"
            type="submit"
            className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all"
          >
            <FaPaperPlane className="text-white" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Message;
