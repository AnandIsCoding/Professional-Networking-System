import React, { useEffect, useState } from "react";
import PublicNavbar from "./Components/NavbarV1/PublicNavbar";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Components/Footer";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import UserNavbar from "./Components/NavbarV1/UserNavbar";
import Feed from "./Pages/Feed";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthenticateNavigateFeed from "./utils/AuthenticateNavigateFeed";
import HomePage from "./Pages/HomePage";
import MyNetwork from "./Pages/MyNetwork";
import Resume from "./Pages/Resume";
import ScrollToTop from "./utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Pages/Message";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notification";
import PageTitleUpdater from "./utils/PageTitleUpdater";
import axios from "axios";
import { setUser } from "./Redux/Slices/auth.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/auth/profile`, {
        withCredentials: true,
      });
      const { data } = res; // return or use data as needed
      if (data.success) {
        dispatch(setUser(data?.user));
        if (location.pathname === "/" || location.pathname === "/signup") {
          navigate("/feed");
        }
      }
    } catch (error) {
      console.error("Error in fetchProfile in App.jsx --->>", error);
      console.error(
        "Error in ProfileHandler:",
        error.response?.data || error.message
      );
      return null;
    } finally {
      setIsCheckingAuth(false); // Done checking auth
    }
  };
  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      const isF12 = e.key === "F12";
      const isBlockedCombo =
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U");

      if (!isF12 && isBlockedCombo) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 bg-white flex justify-center items-center z-[9999]">
        <img
          src="/Loader.gif"
          alt="Loading..."
          className="w-[100px] h-[100px]"
        />
      </div>
    );
  }

  return (
    <div className="select-none">
      <PageTitleUpdater />
      <ScrollToTop />
      <Routes>
        {/* Initial auth-based redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/feed" replace /> : <HomePage />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/feed" replace /> : <Signup />
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mynetwork"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyNetwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Resume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/notifications`}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path={`/profile/:id`}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
