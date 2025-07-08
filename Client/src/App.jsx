import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Footer from "./Components/Footer";
import PublicNavbar from "./Components/NavbarV1/PublicNavbar";
import UserNavbar from "./Components/NavbarV1/UserNavbar";
import Activities from "./Pages/Activities";
import Error from "./Pages/Error";
import Feed from "./Pages/Feed";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import Message from "./Pages/Message";
import MyNetwork from "./Pages/MyNetwork";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/Profile";
import Resume from "./Pages/Resume";
import Signup from "./Pages/Signup";
import SingleActivity from "./Pages/SingleActivity";
import Verify from "./Pages/Verify";
import { setUser } from "./Redux/Slices/auth.slice";
import { setNotificationCount } from "./Redux/Slices/notification.slice";
import AuthenticateNavigateFeed from "./utils/AuthenticateNavigateFeed";
import PageTitleUpdater from "./utils/PageTitleUpdater";
import ProtectedRoute from "./utils/ProtectedRoute";
import ScrollToTop from "./utils/ScrollToTop";

const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.user);
  const user = useSelector((state) => state.user.user);
  const notificationCount = useSelector((state) => state.notification.count);
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

  const fetchActiveNotifications = async () => {
    try {
      const res = await axios.get(`${baseUrl}/notification/active`, {
        withCredentials: true,
      });
      const { data } = res;
      if (data?.success) {
        // console.log(data?.count)
        dispatch(setNotificationCount(data?.count));
      } else {
        console.log("Something went wrong in fetching notifications count");
        console.log(res);
      }
    } catch (error) {
      console.log(
        error?.response?.data?.message ||
          "Something went wrong in fetching active notifications count ---->> ",
        error
      );
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
    fetchActiveNotifications();
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
          path="/verify"
          element={
            isAuthenticated ? <Navigate to="/feed" replace /> : <Verify />
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

        <Route
          path={`/profile/:id/activities`}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Activities />
            </ProtectedRoute>
          }
        />

        <Route
          path={`/post/:id`}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SingleActivity />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
