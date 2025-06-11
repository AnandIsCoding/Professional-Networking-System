import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import GoogleLoginComponent from "../utils/GoogleLoginComponent";

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center md:fixed">
      {/* Left Content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full px-6 md:px-24 py-4 flex flex-col justify-center gap-4">
        <div className="leading-0">
          {" "}
          <h1 className="text-[7vw] md:text-[3vw] font-semibold leading-tight">
            With you every step of
          </h1>
          <h1 className="text-[7vw] md:text-[3vw] font-semibold leading-tight">
            your career
          </h1>
        </div>

    {/* Signup with google button */}
        <GoogleLoginComponent/>

      {/* Signup with email button */}
        <button onClick={()=>navigate('/signup')} className="flex w-[280px] ml-[7.5vw] md:ml-[9.5vw] items-center cursor-pointer justify-center gap-3 px-6 py-2 bg-white border border-gray-300 rounded-md text-black font-medium text-base hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.045l7.445 4.963a1 1 0 001.11 0L20 8.045V18H4z" />
          </svg>
          Sign in with Email
        </button>

        <p className="text-sm text-center text-gray-600 px-4 mt-4">
          By clicking <span className="font-medium">Continue</span> to join or
          sign in, you agree to LinkedIn’s&nbsp;
          <a href="#" className="text-blue-600 hover:underline">
            User Agreement
          </a>
          ,&nbsp;
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          , and&nbsp;
          <a href="#" className="text-blue-600 hover:underline">
            Cookie Policy
          </a>
          .
        </p>

        <p className="text-sm text-center text-gray-600 px-4 mt-4">
          New to LinkedIn?{" "}
          <NavLink to='/signup' className="text-blue-600 hover:underline">
            Join now
          </NavLink>{" "}
        </p>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 md:p-10">
        <img
          src="./LandingPageSvgImage.svg"
          alt="Landing Page"
          className="w-full h-full object-contain bg-white"
        />
      </div>
     
    </div>
  );
}

export default LandingPage;
