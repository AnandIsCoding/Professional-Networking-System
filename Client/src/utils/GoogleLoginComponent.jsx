import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../Redux/Slices/auth.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function GoogleLoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/google`,
        { token },
        { withCredentials: true }
      );
      const { data } = res;
      if (data.success) {
        dispatch(setUser(data?.user));
        toast.success(data.message || "User registered successfully");
        navigate("/feed");
      } else {
        toast.error(data.message || "User registration failed");
      }
    } catch (error) {
      console.error(
        "Error in handleGoogleSuccess in GoogleLoginComponent.jsx ---->>",
        error
      );
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full  flex justify-center my-4 rounded-lg ">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        width="280"
      />
    </div>
  );
}

export default GoogleLoginComponent;
