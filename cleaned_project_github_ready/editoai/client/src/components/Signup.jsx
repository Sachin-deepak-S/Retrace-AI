import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // ✅ Load saved data when page opens
  useEffect(() => {
    const saved = localStorage.getItem("signupForm");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // ✅ Save data whenever user types
  useEffect(() => {
    localStorage.setItem("signupForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!recaptchaToken) {
      setMessage("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
const response = await fetch("http://localhost:5000/api/auth/signup", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Verification email sent! Check your inbox.");

        // ✅ Clear form and local storage on success
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.removeItem("signupForm");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="text-content">
          <h1>ReTrace AI</h1>
          <h3>
            Verify your identity once, protect your insights forever.
            Together, let’s uncover the real story behind every image.
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
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

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
            <small className="password-hint">
              Must contain 8+ characters, 1 number, and 1 uppercase letter.
            </small>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {/* ✅ Terms link above submit */}
            <p className="terms">
              By creating an account, you agree to our{" "}
              <Link to="/terms">Terms & Conditions</Link>.
            </p>

            {/* reCAPTCHA v2 Checkbox */}
            <div style={{ margin: "1rem 0", display: "flex", justifyContent: "center" }}>
              <ReCAPTCHA
                sitekey="6Ld5yeIrAAAAAGq5ks_LxwqTg_-w3zVX-_F3qaW3"
                onChange={handleRecaptchaChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <p className="login-text">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
