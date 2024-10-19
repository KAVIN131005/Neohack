// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to P2P Lending Platform</h1>
      <div className="button-group">
        <button onClick={() => navigate('/lender-login')} className="home-btn">Lender Login</button>
        <button onClick={() => navigate('/borrower-login')} className="home-btn">Borrower Login</button>
        <button onClick={() => navigate('/admin-login')} className="home-btn">Admin Login</button>
      </div>
    </div>
  );
};

export default Home;