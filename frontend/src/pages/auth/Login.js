import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setError("");

    api.post("login/", form)
      .then((res) => {
        const token = res.data.access;

        localStorage.setItem("token", token);

        // decode JWT
        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload.role;

        // ROLE BASED REDIRECT
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/products");
        }
      })
      .catch(() => {
        setError("Invalid username or password ❌");
      });
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p onClick={() => navigate("/register")} className="link">
          Create new account
        </p>

      </div>

    </div>
  );
}

export default Login;