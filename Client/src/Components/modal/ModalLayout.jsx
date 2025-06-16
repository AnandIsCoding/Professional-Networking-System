import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { setShowModal } from "../../Redux/Slices/modal.slice";

function ModalLayout(props) {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);
  const modalRef = useRef();

  // Prevent background scroll
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // Close modal on outside click
  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(setShowModal(null));
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(setShowModal(null));
  };

  return (
    <div className="w-full z-[999] fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center max-h-screen overflow-hidden">
      <div
        ref={modalRef}
        className="w-[95%] md:w-[50%] h-[500px] bg-white rounded-xl p-10 overflow-y-auto"
      >
        {/* Top Section */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="h-14 w-14 rounded-full bg-white z-10">
              <img
                src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
                alt="Profile_Banner"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-xl text-gray-700 pt-3 px-3">{props?.title}</h1>
          </div>
          <div onClick={handleCloseModal}>
            <AiOutlineClose size={30} className="cursor-pointer" />
          </div>
        </div>

        {/* Main Content */}
        <div>{props?.children}</div>
      </div>
    </div>
  );
}

export default ModalLayout;
