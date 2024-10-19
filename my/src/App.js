// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import LenderLogin from './LenderDashboard';
import BorrowerLogin from './BorrowerDashboard';
import AdminLogin from './SystemDashboard';
import Register from './Register';
import LenderAccount from './LenderAccount';
import BorrowerAccount from './BorrowerAccount';
import Header from './Header';
import LoanApplication from './LoanApplication'; // Import the LoanApplication component
import AvailableLoan from './AvailableLoan';
import About from './About';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lender-login" element={<LenderLogin />} />
          <Route path="/borrower-login" element={<BorrowerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lender-account" element={<LenderAccount />} />
          <Route path="/borrower-account" element={<BorrowerAccount />} />
          <Route path="/loan-application" element={<LoanApplication />} /> {/* New route for LoanApplication */}
          <Route path="/available-loans" element={<AvailableLoan />} /> {/* New route for AvailableLoan */}
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
