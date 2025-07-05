import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import PublicNavbar from "../Components/NavbarV1/PublicNavbar";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/auth.slice.js";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      alert("Please enter all 6 digits.");
      return;
    }

    console.log("Verifying OTP:", finalOtp);
    const toastId = toast.loading("Please wait, Verifing otp...");
    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/verify`,
        { otp: finalOtp },
        { withCredentials: true }
      );
      const { data } = res;
      if (data?.success) {
        toast.success(data?.message || "Otp verified", {
          id: toastId,
        });
        dispatch(setUser(data?.user));
        navigate("/feed");
      } else {
        toast.error(data?.message || "Otp verification failed", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error in handleSubmit in Verify.jsx ---->>", error);
      toast.error(error.response?.data?.message || "Something went wrong !", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className=" flex items-center justify-center bg-gradient-to-br bg-white px-4 ">
        <div className="w-full max-w-lg mt-32 bg-white/90 backdrop-blur-xl border border-[#0A66C2]/10 shadow-2xl rounded-3xl  sm:p-10 relative">
          {/* Border Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-tr  opacity-20 rounded-3xl blur-2xl z-0"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
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

            {/* OTP Input */}
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

              {/* Submit Button */}
              <button
                type="submit"
                title="Verify OTP"
                className="bg-[#0A66C2] hover:bg-[#6968bd] cursor-pointer text-white py-3 rounded-xl text-lg font-semibold shadow-md transition duration-200"
              >
                Verify & Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
