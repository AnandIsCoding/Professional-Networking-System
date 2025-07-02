import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { setUser } from "../../Redux/Slices/auth.slice";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Info() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [fullName, setFullname] = useState("");
  const [headline, setHeadline] = useState("");
  const [currentCompany, setCurrentcompany] = useState("");
  const [currentLocation, setCurrentlocation] = useState("");
  // button submit handler
  const handleUpdateInfo = async (event) => {
    event.preventDefault();
    if (!fullName && !headline && !currentCompany && !currentLocation) {
      return Swal.fire(
        "Missing Fields",
        "Please fill in at least one field to update your profile.",
        "warning"
      );
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to update profile?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "Cancel",
    });
    // when confirmed than api call to update profile
    if (result.isConfirmed) {
      try {
        // creating userPayload becoz after api call, it modifies already existing fields with ''
        const userPayload = {};
        if (fullName.trim().length > 0){
           userPayload.fullName = fullName.trim()
        }
        if(fullName.trim().length < 1) userPayload.fullName = user?.fullName
        if (headline.trim().length > 0) userPayload.headline = headline.trim();
        if (currentCompany.trim().length > 0)
          userPayload.currentCompany = currentCompany.trim();
        if (currentLocation.trim().length > 0)
          userPayload.currentLocation = currentLocation.trim();
        const res = await axios.put(
          `${baseUrl}/user/auth/update`,
          { user: userPayload },
          {
            withCredentials: true,
          }
        );

        if (res?.data?.success) {
          // console.log(res);
          Swal.fire("Updated!", `Profile has been updated.`, "success");
          dispatch(setUser(res?.data?.user));
        } else {
          setLoading(false);
          Swal.fire("Error", "Something went wrong while updating.", "error");
        }
      } catch (error) {
        console.error("Update profile info error --->>", error);
        Swal.fire(
          "Profile update failed",
          error.response?.data?.message || "An error occurred",
          "error"
        );
      }
    } else {
      console.log("User cancelled the action.");
    }
  };
  return (
    <div className="max-full mx-auto md:p-4 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Edit Profile Info
      </h2>

      <form onSubmit={handleUpdateInfo} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            onChange={(event) => setFullname(event.target.value)}
            placeholder={user?.fullName || 'Anand Jha'}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Headline
          </label>
          <textarea
            row={4}
            onChange={(event) => setHeadline(event.target.value)}
            placeholder="e.g. MERN Stack Developer | Open Source Contributor | Cloud Engineer "
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Current Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Company
          </label>
          <input
            type="text"
            onChange={(event) => setCurrentcompany(event.target.value)}
            placeholder="e.g. TCS"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Current Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Location
          </label>
          <input
            type="text"
            onChange={(event) => setCurrentlocation(event.target.value)}
            placeholder="e.g. Patna, Bihar"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
}

export default Info;
