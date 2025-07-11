import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import PrivacyPolicyModal from "../Components/modal/PrivacyPolicyModal";
import PublicNavbar from "../Components/NavbarV1/PublicNavbar";
import { setUser } from "../Redux/Slices/auth.slice";
import { setShowModal } from "../Redux/Slices/modal.slice";
import GoogleLoginComponent from "../utils/GoogleLoginComponent";
const baseUrl = import.meta.env.VITE_BASE_URL;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

// console.log(baseUrl);
function Signup() {
  const [isSignupMode, setIsSignupMode] = useState(true);
  const [showPassword, setShowPassowrd] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state?.modal?.showModal);
  const [formData, setFormdata] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const newErrors = { fullName: "", email: "", password: "" };

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters long";
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(formData.password.trim())) {
      newErrors.password =
        "Password must have at least 5 characters, one uppercase, one lowercase, one digit and one special character";
    }

    // If any error exists, update error state and stop
    if (newErrors.fullName || newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({ fullName: "", email: "", password: "" }); // Clear errors

    const toastId = toast.loading("Please wait, Registering...");
    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/register`,
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      const { data } = res;
      if (data?.success) {
        toast.success(data.message || "Otp sent to the email successfully", {
          id: toastId,
        });
        // dispatch(setUser(data.user));
        navigate("/verify");
      } else {
        toast.error(data.message || "User registration failed", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error in handleSignup in Signup.jsx ---->>", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const { data } = res;

      if (data.success) {
        toast.success(data.message || "Login successful!", { id: toastId });
        // update state or navigate here
        dispatch(setUser(data.user));
        navigate("/feed");
      } else {
        toast.error(data.message || "Login failed!", { id: toastId });
      }
    } catch (error) {
      console.error("Error in handleSignin in Signup.jsx ---->>", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className=" flex items-center justify-center   px-1 md:px-4 ">
        <form
          onSubmit={(event) =>
            isSignupMode ? handleSignup(event) : handleSignin(event)
          }
          className="backdrop-blur-md bg-white/70 shadow-0  rounded-xl w-full max-w-lg py-24 px-2 md:p-8 "
        >
          <h2 className="md:text-2xl font-semibold text-center text-gray-800 mb-6">
            Welcome to your professional journey —{" "}
            <span className="text-blue-600 text-xl">
              {isSignupMode ? "Register" : "SignIn"}
            </span>
          </h2>

          {/* name */}
          {isSignupMode && (
            <>
              <label className="font-medium" htmlFor="name">
                Full name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                id="name"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg border-1 text-blue-950 my-2"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm ml-1">{errors.fullName}</p>
              )}
            </>
          )}

          {/* email */}
          <label className="font-medium cursor-pointer " htmlFor="email">
            Email
          </label>
          <input
            name="email"
            value={formData.value}
            onChange={handleChange}
            type="email"
            id="email"
            required
            placeholder="Enter Email"
            className="w-full px-4 py-2 rounded-lg border-1 text-blue-950 my-2"
          />
          {errors.email && (
            <p className="text-red-600 text-sm ml-1">{errors.email}</p>
          )}

          {/* password */}
          <label className="font-medium cursor-pointer" htmlFor="password">
            Password
          </label>
          <div className="relative w-full my-2">
            <input
              name="password"
              value={formData.value}
              onChange={handleChange}
              type={!showPassword ? "password" : "text"}
              placeholder="Enter Password"
              className="w-full px-4 py-2 pr-10 rounded-lg border border-black text-blue-950"
              id="password"
              required
            />

            <span
              onClick={() => setShowPassowrd((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {!showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm ml-1">{errors.password}</p>
          )}

          {/* signup signin btn */}
          <button
            title={
              isSignupMode ? "Register to Devlinked" : "SignIn toDevlinked"
            }
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-md my-1 text-base font-medium py-2 cursor-pointer"
          >
            {isSignupMode ? "Register" : "SignIn"}
          </button>

          <button
            title="SIgnIn with Google"
            className="w-full  rounded-md my-1 text-base font-medium py-2 cursor-pointer"
          >
            <GoogleLoginComponent />
          </button>

          <p className="text-center mt-0">
            {" "}
            {isSignupMode ? "Already on Devlinked ?  " : "New To Devlinked ?  "}
            <span
              onClick={() => setIsSignupMode((prev) => !prev)}
              className="text-blue-700 cursor-pointer"
            >
              &nbsp;
              {isSignupMode ? "SignIn" : "SignUp"}
            </span>{" "}
          </p>
          <br></br>
          <p
            onClick={() => dispatch(setShowModal("privacyPolicy"))}
            className="text-sm cursor-pointer text-center text-gray-600 px-4 mt-4"
          >
            By clicking <span className="font-medium">Continue</span> to join or
            sign in, you agree to Devlinked’s&nbsp;
            <a className="text-blue-600 hover:underline">User Agreement</a>
            ,&nbsp;
            <a className="text-blue-600 hover:underline">Privacy Policy</a>,
            and&nbsp;
            <a className="text-blue-600 hover:underline">Cookie Policy</a>.
          </p>
        </form>
        {showModal === "privacyPolicy" && <PrivacyPolicyModal />}
      </div>
    </>
  );
}

export default Signup;
