import axios from "axios";
import React, { useEffect,useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setUser } from "../../Redux/Slices/auth.slice";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Banner({ banner }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [bannerImage, setBannerimage] = useState(null);
  const [preview, setPreview] = useState("");

  const labelText =
    banner === 1 ? "your profile banner" : "your profile picture";

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        Swal.fire(
          "Unsupported file",
          "Only .jpg, .jpeg, .png are allowed",
          "error"
        );
        return;
      }

      setBannerimage(file);
      const generatedUrl = URL.createObjectURL(file);
      setPreview(generatedUrl);
    }
  };

  const handleSubmit = async () => {
    if (!bannerImage) {
      Swal.fire(
        "No Image Selected",
        `Please select ${labelText} before updating.`,
        "warning"
      );
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change ${labelText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Upload logic placeholder
      // console.log(
      //   `Uploading ${banner === 1 ? "banner" : "profile pic"}:`,
      //   bannerImage
      // );
      const formData = new FormData();
      if (banner === 1) {
        formData.append("profileBanner", bannerImage);
      } else {
        formData.append("profilePic", bannerImage);
      }
      try {
        // console.log(formData)
        const res = await axios.put(`${baseUrl}/user/auth/update`, formData, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          console.log(res);
          Swal.fire("Updated!", `${labelText} has been changed.`, "success");
          dispatch(setUser(res?.data?.user));
        } else {
          setLoading(false);
          Swal.fire("Error", "Something went wrong while updating.", "error");
        }
      } catch (error) {
        console.error("Upload Error:", error);
        Swal.fire(
          "Upload Failed",
          error.response?.data?.message || "An error occurred",
          "error"
        );
      }
    } else {
      console.log("User cancelled the action.");
    }
  };

  return (
    <div className="relative w-full pt-8 pb-12 flex flex-col items-center">
      {banner === 1 ? (
        <div className="w-full h-[30vh] md:h-[35vh] bg-gray-200 rounded-md overflow-hidden relative mb-8">
          <img
            src={preview || user?.profileBanner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <label className="absolute top-3 right-3 bg-white hover:bg-gray-100 rounded-full p-2 shadow cursor-pointer transition-all">
            <FaCamera className="text-gray-600 text-xl" />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 md:w-56 md:h-56 rounded-full border-4 border-white bg-white">
            <img
              src={preview || user?.profilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <label className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-white hover:bg-gray-100 rounded-full p-2 shadow cursor-pointer transition-all">
              <FaCamera className="text-gray-600 text-xl" />
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-10 py-2 rounded-xl transition-all shadow"
      >
        Update
      </button>
    </div>
  );
}

export default Banner;
