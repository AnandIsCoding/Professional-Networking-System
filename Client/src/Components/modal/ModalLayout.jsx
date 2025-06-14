import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { setShowModal } from "../../Redux/Slices/modal.slice";

function ModalLayout(props) {
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
  };

  return (
    <div className="w-full z-[999] fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center max-h-screen overflow-hidden">
      <div className="w-[95%] md:w-[50%] h-[500px] bg-white rounded-xl p-10 overflow-y-auto ">
        {/* top section */}
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <div className=" h-14 w-14 rounded-full  bg-white z-10">
          <img
            src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
            alt="Profile_Banner"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
            <h1 className="text-xl text-gray-700 pt-3 px-3">{props?.title}</h1>
          </div>
          <div onClick={handleCloseModal}>
            {" "}
            <AiOutlineClose size={30} className="cursor-pointer" />{" "}
          </div>
        </div>
        {/* Main Content */}
        <div>{props?.children}</div>
      </div>
    </div>
  );
}

export default ModalLayout;
