import React, { useRef, useState } from "react";

const Verify = () => {
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

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: finalOtp }),
      });

      const data = await res.json();
      if (data.success) {
        alert("OTP Verified!");
        // redirect logic here
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0077B5]/10 to-[#0A66C2]/10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A66C2]">Verify OTP</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 sm:w-12 h-12 sm:h-14 text-xl sm:text-2xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2] transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            title='verify otp'
            className="bg-[#0A66C2] cursor-pointer text-white py-3 rounded-lg text-lg font-semibold transition duration-200"
          >
            Confirm OTP
          </button>
        </form>

        <h3 className="text-center text-sm text-gray-500 mt-6">
          Valid for only 5 minutes
          
        </h3>
      </div>
    </div>
  );
};

export default Verify;
