import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/auth.slice";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Experience() {
  const dispatch = useDispatch();
  const [experienceData, setExperienceData] = useState({
    designation: "",
    companyName: "",
    duration: "",
    location: "",
  });

  const handleChange = (e) => {
    setExperienceData({ ...experienceData, [e.target.name]: e.target.value });
  };

  const handleExperienceSubmit = async (event) => {
    event.preventDefault();

    const { designation, companyName, duration, location } = experienceData;

    // 🔍 Check if all fields are empty
    if (
      !designation.trim() &&
      !companyName.trim() &&
      !duration.trim() &&
      !location.trim()
    ) {
      return Swal.fire(
        "Empty Fields",
        "Please fill in at least one field to add experience.",
        "warning"
      );
    }

    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this experience?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmed.isConfirmed) return;

    try {
      const userPayload = {
        experience: [experienceData],
      };

      const formData = new FormData();
      formData.append("user", JSON.stringify(userPayload));

      const res = await axios.put(`${baseUrl}/user/auth/update`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        Swal.fire("Success", "Experience added successfully", "success");
        dispatch(setUser(res.data.user));
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add Experience
      </h2>

      <form onSubmit={handleExperienceSubmit} className="space-y-5">
        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            name="designation"
            type="text"
            value={experienceData.designation}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            name="companyName"
            type="text"
            value={experienceData.companyName}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            name="duration"
            type="text"
            value={experienceData.duration}
            onChange={handleChange}
            placeholder="e.g. Jan 2023 - Present"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            name="location"
            type="text"
            value={experienceData.location}
            onChange={handleChange}
            placeholder="e.g. Bengaluru"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Add Experience
          </button>
        </div>
      </form>
    </div>
  );
}

export default Experience;
