// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';

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
    setErrorMessage('');
    setSuccessMessage('');

    if (password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          email,
          password,
          role,
        });
        
        if (response.data.success) {
          setSuccessMessage("Registration successful!");
          // Redirect based on role
          if (role === 'lender') {
            navigate('/lender-account');
          } else if (role === 'borrower') {
            navigate('/borrower-account');
          } else {
            navigate('/admin-account');
          }
        } else {
          setErrorMessage("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("There was an error registering!", error);
        setErrorMessage("Error registering. Please check your input.");
      }
    } else {
      setErrorMessage("Passwords don't match!");
    }
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
