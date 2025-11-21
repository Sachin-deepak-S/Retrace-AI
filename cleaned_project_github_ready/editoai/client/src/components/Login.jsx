import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load saved data when page opens
  useEffect(() => {
    const saved = localStorage.getItem("loginForm");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Save data whenever user types
  useEffect(() => {
    localStorage.setItem("loginForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token);
        // Clear form and local storage on success
        setFormData({ email: "", password: "" });
        localStorage.removeItem("loginForm");
        // Redirect to dashboard or home
        navigate("/dashboard"); // Assuming /dashboard exists; adjust if needed
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="text-content">
          <h1>Log In</h1>
          <h3>
            Welcome back to ReTrace AI. Secure access to your personalized insights.
          </h3>
          <ul>
            <li>✓ Personalized insights built for you</li>
            <li>✓ Smarter authentication, safer access</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="form-card">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />


            <button type="submit" className="submit-btn">
              Log In
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <p className="signup-text">
            Don't have an account? <Link to="/">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
