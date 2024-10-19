import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BorrowerAccount.css';

const BorrowerAccount = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    creditScore: ''
  });

  const [loanDetails, setLoanDetails] = useState({
    loanAmount: '',
    loanPurpose: '',
    interestRate: '',
    loanTerm: ''
  });

  const [financialStatement, setFinancialStatement] = useState({
    annualRevenue: '',
    netProfit: '',
    assets: '',
    liabilities: ''
  });

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications
  const [showReminders, setShowReminders] = useState(false); // State for reminders

  const navigate = useNavigate(); // Initialize navigate for redirection

  // Function to handle input changes for user data
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle input changes for loan details
  const handleLoanDetailsChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle input changes for financial statements
  const handleFinancialStatementChange = (e) => {
    const { name, value } = e.target;
    setFinancialStatement((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to toggle the visibility of notifications
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications); // Toggle the state
    alert('Notifications will be shown here'); // Example action, replace with future notification modal/alert
  };

  // Function to toggle the visibility of reminders
  const handleReminderClick = () => {
    setShowReminders(!showReminders); // Toggle the state
    alert('Reminders will be shown here'); // Example action, replace with future reminder modal/alert
  };
  const handleLoanApplicationClick = () => {
    navigate('/loan-application');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform API call to submit the form data, for example:
    try {
      const response = await axios.post('http://localhost:5000/api/borrower/account', {
        userData,
        loanDetails,
        financialStatement
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  return (
    <div className="account-page">
      <h2>Borrower Account Overview</h2>

      {/* Personal Information Section */}
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Personal Information</h3>
          <div className="info-group">
            <label>
              Name:
              <input type="text" name="name" value={userData.name} onChange={handleUserDataChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={userData.email} onChange={handleUserDataChange} />
            </label>
          </div>
        </div>

        {/* Business Information Section */}
        <div className="section">
          <h3>Business Information</h3>
          <div className="info-group">
            <label>
              Business Name:
              <input type="text" name="businessName" value={userData.businessName} onChange={handleUserDataChange} />
            </label>
            <label>
              Business Type:
              <input type="text" name="businessType" value={userData.businessType} onChange={handleUserDataChange} />
            </label>
            <label>
              Business Address:
              <input type="text" name="businessAddress" value={userData.businessAddress} onChange={handleUserDataChange} />
            </label>
          </div>
        </div>

        {/* Loan Information Section */}
        <div className="section loan-info">
          <h3>Loan Information</h3>
          <div className="info-group">
            <label>
              Loan Amount:
              <input type="number" name="loanAmount" value={loanDetails.loanAmount} onChange={handleLoanDetailsChange} />
            </label>
            <label>
              Loan Purpose:
              <input type="text" name="loanPurpose" value={loanDetails.loanPurpose} onChange={handleLoanDetailsChange} />
            </label>
            <label>
              Interest Rate:
              <input type="number" step="0.01" name="interestRate" value={loanDetails.interestRate} onChange={handleLoanDetailsChange} />
            </label>
            <label>
              Loan Term (months):
              <input type="number" name="loanTerm" value={loanDetails.loanTerm} onChange={handleLoanDetailsChange} />
            </label>
          </div>
        </div>

        {/* Financial Statement Section */}
        <div className="section financial-info">
          <h3>Financial Statement</h3>
          <div className="info-group">
            <label>
              Annual Revenue:
              <input type="number" name="annualRevenue" value={financialStatement.annualRevenue} onChange={handleFinancialStatementChange} />
            </label>
            <label>
              Net Profit:
              <input type="number" name="netProfit" value={financialStatement.netProfit} onChange={handleFinancialStatementChange} />
            </label>
            <label>
              Assets:
              <input type="number" name="assets" value={financialStatement.assets} onChange={handleFinancialStatementChange} />
            </label>
            <label>
              Liabilities:
              <input type="number" name="liabilities" value={financialStatement.liabilities} onChange={handleFinancialStatementChange} />
            </label>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="section payment-history">
          <h3>Payment History</h3>
          <ul>
            {paymentHistory.length > 0 ? (
              paymentHistory.map((history, index) => (
                <li key={index}>
                  <strong>Date:</strong> {history.date} - <strong>Amount:</strong> ${history.amount}
                </li>
              ))
            ) : (
              <li>No payment history available.</li>
            )}
          </ul>
        </div>

        {/* Notification Button */}
        <div className="section notifications">
          <h3>Notifications</h3>
          <button type="button" onClick={handleNotificationClick} className="notification-btn">
            Show Notifications
          </button>
        </div>

        {/* Reminder Button */}
        <div className="section reminders">
          <h3>Reminders</h3>
          <button type="button" onClick={handleReminderClick} className="reminder-btn">
            Show Reminders
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="loan-apply-btn" onClick={handleLoanApplicationClick}>
          Apply for a loan
        </button>
      </form>
    </div>
  );
};

export default BorrowerAccount;