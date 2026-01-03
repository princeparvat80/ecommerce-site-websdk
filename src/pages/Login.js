import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { auth, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      login(email);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  if (auth.isAuthenticated) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Already Logged In</h2>
        <p>You are logged in as <strong>{auth.email}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login with your Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
        <br /><br />
        <button type="submit" className="add-to-cart-button">Login</button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
