import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="admin-sidebar">

      <h2>Admin Panel 🧠</h2>

      <button onClick={() => navigate("/admin")}>
        Dashboard
      </button>

      <button onClick={() => navigate("/admin/products")}>
        Products
      </button>

      <button onClick={() => navigate("/admin/orders")}>
        Orders
      </button>

      <button onClick={() => navigate("/admin/users")}>
        Users
      </button>

      <button onClick={() => navigate("/admin/analytics")}>
        Analytics
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminSidebar;