import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import appStore from "./Redux/appStore.js";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper.jsx";
import { Toaster } from "react-hot-toast";

const clientID = import.meta.env.VITE_GOOGLE_AUTH_KEY;

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <GoogleOAuthProvider clientId={clientID}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <AppWrapper />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
