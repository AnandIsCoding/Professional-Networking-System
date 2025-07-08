import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setUser } from "../../Redux/Slices/auth.slice";
import { setShowModal } from "../../Redux/Slices/modal.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function About() {
  const [allSkills, setAllSkills] = useState([]);
  const [singleSkill, setSingleSkill] = useState("");
  const [about, setAbout] = useState("");
  const [resumeFile, setResumeFile] = useState("");
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    const trimmedSkill = singleSkill.trim();
    const isValidKey =
      (e.key === "Enter" || e.key === " " || e.code === "Space") &&
      trimmedSkill.length > 0;

    if (!isValidKey) return;

    e.preventDefault();
    if (!allSkills.includes(trimmedSkill)) {
      setAllSkills((prev) => [...prev, trimmedSkill]);
    }
    setSingleSkill("");
  };

  const handleRemove = (index) => {
    setAllSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        Swal.fire(
          "Unsupported File",
          "Only PDF files are allowed for resume upload.",
          "error"
        );
        return;
      }
      setResumeFile(file);
      console.log(resumeFile);
      // ✅ Generate preview URL and show modal
      const fileURL = URL.createObjectURL(file);

      Swal.fire({
        title: "Resume Preview",
        html: `<iframe src="${fileURL}" width="100%" height="500px" style="border:none;"></iframe>`,
        showCancelButton: true,
        confirmButtonText: "Looks Good",
        cancelButtonText: "Choose Another",
        allowOutsideClick: false,
        willClose: () => {
          URL.revokeObjectURL(fileURL);
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setResumeFile(file); // ✅ set only when confirmed
        } else {
          setResumeFile(null);
        }
      });
    }
  };

  const handleEditAbout = async (event) => {
    event.preventDefault();

    if (!about.trim() && !allSkills.length && !resumeFile) {
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

    if (result.isConfirmed) {
      const userData = {};

      if (about.trim()) {
        userData.about = about;
      }

      const formData = new FormData();
      if (allSkills.length > 0) {
        allSkills.forEach((skill) => {
          formData.append("user[skills][]", skill);
        });
      }
      formData.append("user", JSON.stringify(userData)); // ⬅️ wrap everything inside "user"

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      try {
        const res = await axios.put(`${baseUrl}/user/auth/update`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { data } = res;

        if (data?.success) {
          Swal.fire("Updated!", `Profile has been updated.`, "success");
          dispatch(setUser(res?.data?.user));
          setShowModal(null);
        } else {
          Swal.fire("Error", "Something went wrong while updating.", "error");
          setShowModal(null);
        }
      } catch (err) {
        console.error("Update failed", err);
        Swal.fire("Error", "Something went wrong while updating.", "error");
        setShowModal(null);
      }
    } else {
      console.log("User cancelled the action.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto md:p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit About Section
      </h2>

      <form onSubmit={handleEditAbout} className="space-y-3">
        {/* About You */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About You
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="7"
            placeholder="Write something about yourself..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Skills Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <input
            type="text"
            value={singleSkill}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSingleSkill(e.target.value)}
            placeholder="Press Enter or Space to add"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-3">
          {allSkills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full shadow transition-all animate-fade-in"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
            Upload Resume
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="w-full cursor-pointer border rounded-md px-3 py-2 shadow-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {resumeFile && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {resumeFile.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Update About
          </button>
        </div>
      </form>
    </div>
  );
}

export default About;
