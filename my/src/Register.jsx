// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
const Register = () => {
  const [role, setRole] = useState('lender');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous messages
    setSuccessMessage('');

    if (validate()) {
      try {
        // Check if the user already exists
        const response = await axios.get(`http://localhost:3001/${role}s`);
        const existingUsers = response.data;

        const exists = existingUsers.some(u => u.email === email);
        if (exists) {
          setErrorMessage("User already exists");
          toast.warning("User Already Exists")
          return;
        }

        // Register new user
        await axios.post(`http://localhost:3001/${role}s`, {
          email: email,
          password: password
        });

        toast.success('Registration Successful')
        navigate(`/${role}-login`);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to login page after a short delay

      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMessage('Registration failed. Please try again later.');
      }
    }
  };

  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      setErrorMessage("Please enter the email.");
    }
    if (password === '' || password === null) {
      result = false;
      setErrorMessage("Please enter the password.");
    }
    if (confirmPassword === '' || confirmPassword === null) {
      result = false;
      setErrorMessage("Please confirm the password.");
    }
    if (password !== confirmPassword) {
      result = false;
      setErrorMessage("Passwords do not match.");
    }
    if (role === "") {
      return false;
    }
    return result;
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="role-selection">
          <label>
            <input
              type="radio"
              value="lender"
              checked={role === 'lender'}
              onChange={() => setRole('lender')}
            />
            Lender
          </label>
          <label>
            <input
              type="radio"
              value="borrower"
              checked={role === 'borrower'}
              onChange={() => setRole('borrower')}
            />
            Borrower
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
        </div>
        <button type="submit" className="login-btn">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
