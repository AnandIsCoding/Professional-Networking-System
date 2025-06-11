import { GoogleLogin } from "@react-oauth/google";
import React from "react";

function GoogleLoginComponent() {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
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
