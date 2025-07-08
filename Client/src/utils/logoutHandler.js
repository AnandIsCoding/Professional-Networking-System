import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { setUser } from "../Redux/Slices/auth.slice";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useLogoutHandler = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.delete(`${baseUrl}/user/auth/logout`, {
        withCredentials: true,
      });

      const { success, message } = res?.data;

      if (success) {
        Swal.fire(
          "Logged Out",
          message || "Successfully logged out.",
          "success"
        );
        dispatch(setUser(null));
        // Optionally redirect
        // window.location.href = "/login";
      } else {
        Swal.fire("Logout Failed", message || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire("Error", "Logout failed. Please try again.", "error");
    }
  };

  return logoutHandler;
};
