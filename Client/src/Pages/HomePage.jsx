// src/Pages/HomePage.jsx
import React from "react";

import Footer from "../Components/Footer";
import PublicNavbar from "../Components/NavbarV1/PublicNavbar";
import LandingPage from "./LandingPage";

const HomePage = () => {
  return (
    <>
      <PublicNavbar />
      <LandingPage />
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
