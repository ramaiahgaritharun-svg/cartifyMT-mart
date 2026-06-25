import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // decode role safely
  let role = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* BRAND */}
      <h2 onClick={() => navigate("/products")}>
        CartifyMT 🛒
      </h2>

      {/* LINKS */}
      <div className="nav-links">

        {/* PUBLIC */}
        <p onClick={() => navigate("/products")}>Home</p>

        {/* USER LINKS */}
        {token && (
          <>
            <p onClick={() => navigate("/cart")}>Cart</p>
            <p onClick={() => navigate("/orders")}>My Orders</p>
          </>
        )}

        {/* ADMIN LINKS */}
        {role === "admin" && (
          <>
            <p onClick={() => navigate("/admin")}>Admin Dashboard</p>
            <p onClick={() => navigate("/admin/products")}>Manage Products</p>
            <p onClick={() => navigate("/admin/orders")}>Manage Orders</p>
          </>
        )}

      </div>

      {/* AUTH BUTTON */}
      <div>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;