import React, { useState } from "react";
import { FaEnvelope, FaLock, FaInfoCircle } from "react-icons/fa";
import "./LoginRegister.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/Axios"; // Adjust the path if needed

const LoginRegister: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // Changed to email
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation logic
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    try {
      // Use axiosInstance to make an API call to verify credentials
      const response = await axiosInstance.post("/teacher/login", {
        email, // Changed to email
        password,
      });

      // Assuming the backend returns a 200 status for a successful login
      if (response.status === 200) {
        // Clear fields
        setEmail(""); // Clear email field
        setPassword("");

        // Navigate to the home page
        navigate("/home");
      }
    } catch (error: any) {
      // Handle errors from the backend
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <div className="login-register-page">
      <div className="wrapper">
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>LOGIN FORM</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Changed to email
                required
              />
              <div className="icon">
                <FaEnvelope />
              </div>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="icon">
                <FaLock />
              </div>
            </div>

            <div className="remember-forgot">
              <a href="#">Forgot password</a>
            </div>

            <button type="submit">Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>
              <FaInfoCircle /> Only Teachers can Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
