import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { member } = useAuth();
  const location = useLocation();

  if (!member) {
    // remember where they were headed so we can send them back after login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
