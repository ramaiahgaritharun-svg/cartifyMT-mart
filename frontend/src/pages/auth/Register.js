import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    setError("");

    const payload = {
      ...form,
      role: "customer", // default role
    };

    api.post("register/", payload)
      .then(() => {
        alert("Registration successful 🚀");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError("Registration failed ❌ Try again");
      });
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Register</h2>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={handleRegister}>
          Create Account
        </button>

        <p
          className="link"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>
  );
}

export default Register;