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
    // Handle Lender login logic
    console.log("Lender login successful");
    // Navigate to lender account page or dashboard after successful login
    navigate('/lender-account');
  };

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
