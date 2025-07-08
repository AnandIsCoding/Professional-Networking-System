// src/utils/AuthenticateNavigateFeed.jsx
import { Navigate } from "react-router-dom";

const AuthenticateNavigateFeed = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Navigate to="/feed" replace />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthenticateNavigateFeed;
