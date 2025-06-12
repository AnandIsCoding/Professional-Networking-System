import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Footer from "../Components/Footer";
import GoogleLoginComponent from "../utils/GoogleLoginComponent";
import PublicNavbar from "../Components/NavbarV1/PublicNavbar";

function Signup() {
  const [isSignupMode, setIsSignupMode] = useState(true);
  const [showPassword, setShowPassowrd] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("Sign Up............");
  };
  const handleSignin = async (event) => {
    event.preventDefault();
    console.log("Sign In............");
  };

 

  return (
    <>
    <PublicNavbar/>
      <div className=" flex items-center justify-center   px-1 md:px-4 py-8">
    
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
            <label className="font-medium cursor-pointer" htmlFor="name">
              Full name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg border-1 text-blue-950 my-2"
            />
          </>
        )}
       

        {/* email */}
        <label className="font-medium cursor-pointer " htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter Email"
          className="w-full px-4 py-2 rounded-lg border-1 text-blue-950 my-2"
        />

        {/* password */}
        <label className="font-medium cursor-pointer" htmlFor="password">
          Password
        </label>
        <div className="relative w-full my-2">
          <input
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

        {/* signup signin btn */}
        <button title={isSignupMode ? 'Register to LinkedIn' : 'SignIn to LinkedIn'} className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-md my-1 text-base font-medium py-2 cursor-pointer">
          {isSignupMode ? "Register" : "SignIn"}
        </button>

        <button title='SIgnIn with Google' className="w-full  rounded-md my-1 text-base font-medium py-2 cursor-pointer">
             <GoogleLoginComponent/>
        </button>

     

        <p className="text-center mt-0">
          {" "}
          {isSignupMode ? "Already on LinkedIn ?  " : "New To linkedIn ?  "}
          <span
            onClick={() => setIsSignupMode((prev) => !prev)}
            className="text-blue-700 cursor-pointer"
          >
            &nbsp;
            {isSignupMode ? "SignIn" : "SignUp"}
          </span>{" "}
        </p>
      </form>
    </div>
    </>
  );
}

export default Signup;
