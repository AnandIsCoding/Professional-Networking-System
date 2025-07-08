import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../Redux/Slices/modal.slice.js";
import authReducer from "../Redux/Slices/auth.slice.js";
import notificationReducer from "../Redux/Slices/notification.slice.js";

const appStore = configureStore({
  reducer: {
    modal: modalReducer,
    user: authReducer,
    notification: notificationReducer,
  },
});

export default appStore;
