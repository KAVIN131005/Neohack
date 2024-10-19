// src/components/LenderLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const LenderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (validate()) {
      try {
        // Fetch the users from the mock API
        const response = await axios.get("http://localhost:3001/lenders");
        const user = response.data.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          // Login successful, reset form and navigate
          setEmail("");
          setPassword("");
          toast.success("Login successful!"); // Provide success feedback
          navigate("/"); // Redirect to the home page or dashboard
        } else {
          toast.error("Invalid email or password."); // Display error message
        }
      } catch (error) {
        toast.error("Error during authentication:", error);
        setErrorMessage("Failed to login. Please try again later."); // Display error message
      }
    }
  };

  const validate = () => {
    if (email === '' || password === '') {
      toast.warning('Please enter both email and password.'); // Display validation message
      return false;
    }
    return true;
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Lender Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn" onClick={()=>navigate("/lender-account")}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <p>
          Don't have an account? 
          <a href="#1" onClick={() => navigate("/register")}> Register</a>
        </p>
      </form>
    </div>
  );
};

export default LenderLogin;
