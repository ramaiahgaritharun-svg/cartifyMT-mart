import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div>
          <h3>CartifyMT 🛒</h3>
          <p>Best shopping experience for everyone</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">

          <p onClick={() => navigate("/products")}>
            Products
          </p>

          <p onClick={() => navigate("/cart")}>
            Cart
          </p>

          <p onClick={() => navigate("/orders")}>
            Orders
          </p>

        </div>

        {/* COPYRIGHT */}
        <div>
          <p>© 2026 Cartify. All rights reserved.</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;