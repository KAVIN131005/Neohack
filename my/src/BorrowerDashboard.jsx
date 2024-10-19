import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const BorrowerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    if (validate()) {
      try {
        const response = await axios.get("http://localhost:3001/borrowers");
        

        const user = response.data.find(
          (b) => b.email === email && b.password === password
        );

        if (user) {
          toast.success("Login successful");
          setEmail("");
          setPassword("");
          navigate('/borrower-account'); // Navigate to borrower account page
        } else {
          toast.error("Invalid email or password.");
        }
      } catch (error) {
        toast.error("Error during authentication:", error);
        setErrorMessage("Failed to login. Please try again later.");
      }
    }
  };

  const validate = () => {
    if (email === '' || password === '') {
      toast.warning('Please enter both email and password.');
      return false;
    }
    return true;
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Borrower Login</h2>
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
        <button type="submit" className="login-btn">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Don't have an account? 
          <a href="#1" onClick={() => navigate("/register")}> Register</a>
        </p>
      </form>
    </div>
  );
};

export default BorrowerLogin;
