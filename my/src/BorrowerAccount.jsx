// src/components/BorrowerAccount.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BorrowerAccount.css';

const BorrowerAccount = () => {
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loanDetails, setLoanDetails] = useState({});
  const [financialStatement, setFinancialStatement] = useState({});

  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/borrower/account', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
        setNotifications(response.data.notifications);
        setPaymentHistory(response.data.paymentHistory);
        setLoanDetails(response.data.loanDetails);
        setFinancialStatement(response.data.financialStatement);
      } catch (error) {
        console.error("There was an error fetching the user data!", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLoanApplicationClick = () => {
    navigate('/loan-application');
  };

  return (
    <div className="account-page">
      <h1>Borrower Account Overview</h1>

      {/* Personal Information Section */}
      <div className="section">
        <h2>Personal Information</h2>
        <div className="info-group">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Account Type:</strong> Borrower</p>
        </div>
      </div>

      {/* Business Information Section */}
      <div className="section">
        <h2>Business Information</h2>
        <div className="info-group">
          <p><strong>Business Name:</strong> {userData.businessName}</p>
          <p><strong>Business Type:</strong> {userData.businessType}</p>
          <p><strong>Business Address:</strong> {userData.businessAddress}</p>
        </div>
      </div>

      {/* Loan Information Section */}
      <div className="section loan-info">
        <h2>Loan Information</h2>
        <div className="info-group">
          <p><strong>Loan Amount:</strong> ${loanDetails.loanAmount}</p>
          <p><strong>Loan Purpose:</strong> {loanDetails.loanPurpose}</p>
          <p><strong>Interest Rate:</strong> {loanDetails.interestRate}%</p>
          <p><strong>Loan Term:</strong> {loanDetails.loanTerm} months</p>
        </div>
      </div>

      {/* Financial Statement Section */}
      <div className="section financial-info">
        <h2>Financial Statement</h2>
        <div className="info-group">
          <p><strong>Annual Revenue:</strong> ${financialStatement.annualRevenue}</p>
          <p><strong>Net Profit:</strong> ${financialStatement.netProfit}</p>
          <p><strong>Assets:</strong> ${financialStatement.assets}</p>
          <p><strong>Liabilities:</strong> ${financialStatement.liabilities}</p>
          <p><strong>Credit Score:</strong> {userData.creditScore}</p>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="section payment-history">
        <h2>Payment History</h2>
        <ul>
          {paymentHistory.map((history, index) => (
            <li key={index}>
              <strong>Date:</strong> {history.date} - <strong>Amount:</strong> ${history.amount}
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="section notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      {/* Reminders Section */}
      <div className="section reminders">
        <h2>Reminders</h2>
        <ul>
          {userData.reminders && userData.reminders.map((reminder, index) => (
            <li key={index}>{reminder}</li>
          ))}
        </ul>
      </div>

      {/* Loan Application Button */}
      <button className="loan-apply-btn" onClick={handleLoanApplicationClick}>
        Apply for a Loan
      </button>
    </div>
  );
};

export default BorrowerAccount;
