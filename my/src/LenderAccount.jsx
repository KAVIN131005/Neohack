// src/components/LenderAccount.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LenderAccount.css'; // Include appropriate styling



const LenderAccount = () => {
  const [userData, setUserData] = useState({});
  const [availableLoans, setAvailableLoans] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]); // State for payment history
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [reminders, setReminders] = useState([]); // State for reminders
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch lender account data and available loans
    const fetchUserData = async () => {
      try {
        // Fetch lender account details
        const accountResponse = await axios.get('http://localhost:5000/api/lender/account', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(accountResponse.data);

        // Fetch available loans for investment
        const loansResponse = await axios.get('http://localhost:5000/api/loans/available', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAvailableLoans(loansResponse.data);

        // Fetch payment history
        const paymentResponse = await axios.get('http://localhost:5000/api/lender/payment-history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPaymentHistory(paymentResponse.data);

        // Fetch notifications
        const notificationResponse = await axios.get('http://localhost:5000/api/lender/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(notificationResponse.data);

        // Fetch reminders
        const remindersResponse = await axios.get('http://localhost:5000/api/lender/reminders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReminders(remindersResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInvest = (loanId, loanAmountRemaining) => {
    // Razorpay payment integration logic here
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Razorpay key
      amount: loanAmountRemaining * 100, // Razorpay accepts amounts in paisa (1 INR = 100 paisa)
      currency: 'INR',
      name: 'Peer-to-Peer Lending',
      description: `Investing in Loan ID: ${loanId}`,
      handler: function (response) {
        // Handle successful payment and backend logic
        console.log(response);
        alert('Investment successful');
      },
      prefill: {
        name: userData.name, // Displaying name used during login
        email: userData.email, // Displaying email used during login
        contact: userData.phoneNumber, // Assuming phoneNumber is part of lender profile
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Navigate to available loans
  const handleAvailableLoansClick = () => {
    navigate('/available-loans'); // Navigate to the AvailableLoans page
  };

  return (
    <div className="account-page">
      <h2>Lender Account</h2>
      <section className="account-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phoneNumber}</p>
        <p><strong>Account Type:</strong> Lender</p>
        <p><strong>Total Investments:</strong> ${userData.totalInvestments || 0}</p>
        <p><strong>Available Balance:</strong> ${userData.availableBalance || 0}</p>
      </section>

      <section className="available-loans">
        <button className="available-loans-btn" onClick={handleAvailableLoansClick}>
          View Available Loans
        </button>
        <div className="loans-list">
          {availableLoans.map((loan, index) => (
            <div key={index} className="loan-card">
              <h4>Loan #{loan.id}</h4>
              <p><strong>Business Name:</strong> {loan.businessName}</p>
              <p><strong>Business Type:</strong> {loan.businessType}</p>
              <p><strong>Loan Purpose:</strong> {loan.loanPurpose}</p>
              <p><strong>Loan Amount:</strong> ${loan.loanAmount}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p><strong>Repayment Terms:</strong> {loan.loanTerm} months</p>
              <p><strong>Risk Level:</strong> {loan.riskLevel}</p>
              <p><strong>Credit Score:</strong> {loan.borrowerCreditScore}</p>
              <p><strong>Total Amount Raised:</strong> ${loan.amountRaised}</p>
              <p><strong>Amount Remaining:</strong> ${loan.loanAmount - loan.amountRaised}</p>
              <button
                className="invest-btn"
                onClick={() => handleInvest(loan.id, loan.loanAmount - loan.amountRaised)}
              >
                Invest in Loan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment History Section */}
      <section className="payment-history">
        <h3>Payment History</h3>
        <ul>
          {paymentHistory.length > 0 ? (
            paymentHistory.map((payment, index) => (
              <li key={index}>
                <p><strong>Date:</strong> {payment.date}</p>
                <p><strong>Amount:</strong> ${payment.amount}</p>
                <p><strong>Status:</strong> {payment.status}</p>
              </li>
            ))
          ) : (
            <p>No payment history available.</p>
          )}
        </ul>
      </section>

      {/* Notifications Section */}
      <section className="notifications">
        <h3>Notifications</h3>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index}>
                <p>{notification.message}</p>
              </li>
            ))
          ) : (
            <p>No new notifications.</p>
          )}
        </ul>
      </section>

      {/* Reminders Section */}
      <section className="reminders">
        <h3>Reminders</h3>
        <ul>
          {reminders.length > 0 ? (
            reminders.map((reminder, index) => (
              <li key={index}>
                <p>{reminder.message}</p>
              </li>
            ))
          ) : (
            <p>No reminders set.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default LenderAccount;
