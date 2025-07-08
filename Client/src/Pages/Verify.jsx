import axios from "axios";
import React, { useEffect,useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PublicNavbar from "../Components/NavbarV1/PublicNavbar";
import { setUser } from "../Redux/Slices/auth.slice.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300); // 5 minutes = 300s
  const [verified, setVerified] = useState(false);
  const inputsRef = useRef([]);

  // Countdown timer ⏳
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-paste OTP 📋
  useEffect(() => {
    const handlePaste = (e) => {
      const pasted = e.clipboardData.getData("text").trim();
      if (/^\d{6}$/.test(pasted)) {
        setOtp(pasted.split(""));
        inputsRef.current[5]?.focus();
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(300); // reset timer
      toast.success("Please enter your email again.");
      navigate("/signup");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    const toastId = toast.loading("Verifying OTP...");
    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/verify`,
        { otp: finalOtp },
        { withCredentials: true }
      );

      const { data } = res;
      if (data?.success) {
        toast.success(data?.message || "OTP verified!", { id: toastId });
        dispatch(setUser(data?.user));
        setVerified(true);
        setTimeout(() => navigate("/feed"), 1500);
      } else {
        toast.error(data?.message || "OTP verification failed", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Verify.jsx -> handleSubmit error", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  // Format timer as MM:SS
  const formatTimer = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <>
      <PublicNavbar />
      <div className="flex items-center justify-center bg-gradient-to-br bg-white px-4  min-h-screen">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl border border-[#0A66C2]/10 shadow-2xl rounded-3xl  sm:p-10 relative">
          {/* Gradient Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-tr bg-white opacity-20 rounded-3xl blur-2xl z-0"></div>

          <div className="relative z-10">
            {verified ? (
              <div className="flex flex-col items-center text-center space-y-4 animate-fadeIn">
                <FaCheckCircle className="text-green-500 text-6xl" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  OTP Verified Successfully
                </h2>
                <p className="text-gray-500">Redirecting to your feed...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-[#0A66C2] drop-shadow-sm">
                    Email Verification
                  </h1>
                  <p className="mt-3 text-gray-600 text-base leading-relaxed">
                    We’ve sent a{" "}
                    <span className="font-semibold text-[#0A66C2]">
                      6-digit code
                    </span>{" "}
                    to your email address. Please enter it below to verify your
                    identity and complete registration.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-2xl sm:text-3xl text-center border-2 border-gray-300 rounded-xl shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-all"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0A66C2] hover:bg-[#004182] cursor-pointer text-white py-3 rounded-xl text-lg font-semibold shadow-md transition duration-200"
                  >
                    Verify & Continue
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 space-y-1">
                  <p>
                    Code is valid for{" "}
                    <span className="text-gray-700 font-medium">5 minutes</span>
                    .
                  </p>
                  {timer > 0 ? (
                    <p>
                      Resend code in{" "}
                      <span className="font-semibold text-[#0A66C2]">
                        {formatTimer(timer)}
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResend}
                      className="text-[#0A66C2] font-semibold hover:underline"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
