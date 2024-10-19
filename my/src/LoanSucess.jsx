// LoanSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LoanSuccess = () => {
  return (
    <div className="success-page">
      <h2>Loan Application Submitted Successfully!</h2>
      <p>Thank you for applying. Our team will review your loan application and get back to you soon.</p>
      <Link to="/" className="home-link">Go back to Home</Link>
    </div>
  );
};

export default LoanSuccess;
