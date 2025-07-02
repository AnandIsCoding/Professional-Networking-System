import React, { useEffect, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaTimes } from "react-icons/fa";

function ShareDialog({ showShareDialog, setShowshareDialog, heading }) {
  if (!showShareDialog) return null;

  const currentURL = encodeURIComponent(window.location.href);

  // Close modal on outside click
  const modalRef = useRef();
    useEffect(() => {
      function handleOutsideClick(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowshareDialog(false)
        }
      }
  
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [showShareDialog]);

  return (
    <div  className="fixed inset-0 z-50 bg-[#0000009f] bg-opacity-30 flex justify-center items-center px-4">
      <div ref={modalRef} className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowshareDialog(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition cursor-pointer"
        >
          <FaTimes size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Share this {heading}
        </h2>

        {/* Share Buttons */}
        <div className="flex justify-center gap-6">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${currentURL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl transition shadow"
          >
            <FaWhatsapp size={20} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Instagram */}
          <a
            href={`https://www.instagram.com/?url=${currentURL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white px-5 py-2.5 rounded-xl transition shadow"
          >
            <FaInstagram size={20} />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShareDialog;
