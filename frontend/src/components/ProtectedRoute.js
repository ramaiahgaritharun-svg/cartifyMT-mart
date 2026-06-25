import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  // ❌ no token → login
  if (!token) {
    return <Navigate to="/login" />;
  }

  let userRole = null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userRole = payload.role || "customer";
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // 🔐 role mismatch → redirect safely
  if (role && userRole !== role) {
    return <Navigate to="/" />; // safer than /products
  }

  return children;
}

export default ProtectedRoute;