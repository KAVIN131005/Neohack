// src/components/AvailableLoan.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvailableLoan.css'; // Add necessary styles

const AvailableLoan = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [filters, setFilters] = useState({
    riskLevel: '',
    businessType: '',
    loanAmount: ''
  });
  const [lenderProfile, setLenderProfile] = useState({}); // State for lender profile

  useEffect(() => {
    // Fetch available loans and lender profile
    const fetchLoansAndProfile = async () => {
      try {
        const loanResponse = await axios.get('http://localhost:5000/api/lender/available-loans', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`// Assuming token is stored in localStorage
          }
        });
        setLoans(loanResponse.data);
        setFilteredLoans(loanResponse.data);

        // Fetch lender profile
        const profileResponse = await axios.get('http://localhost:5000/api/lender/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLenderProfile(profileResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchLoansAndProfile();
  }, []);

  // Handle filters and update filtered loans
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Function to filter loans when search button is clicked
  const handleSearch = () => {
    const filtered = loans.filter((loan) => {
      const meetsRiskLevel = filters.riskLevel ? loan.riskLevel === filters.riskLevel : true;
      const meetsBusinessType = filters.businessType ? loan.businessType === filters.businessType : true;
      const meetsLoanAmount = filters.loanAmount ? loan.loanAmount <= parseInt(filters.loanAmount) : true;

      return meetsRiskLevel && meetsBusinessType && meetsLoanAmount;
    });

    setFilteredLoans(filtered);
  };

  // Handle investment
  const handleInvest = async (loanId) => {
    try {
      await axios.post(`http://localhost:5000/api/lender/invest/${loanId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Investment successful!');
    } catch (error) {
      console.error("Error investing in loan", error);
    }
  };

  // Function to set up repayment via Razorpay
  const handleRepaymentSetup = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: lenderProfile.repaymentAmount * 100,
      currency: 'INR',
      name: 'Peer-to-Peer Lending',
      description: 'Setting up repayment',
      handler: function (response) {
        console.log(response);
        alert('Repayment setup successful');
      },
      prefill: {
        name: lenderProfile.name,
        email: lenderProfile.email,
        contact: lenderProfile.phoneNumber,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="available-loans-page">
      <h2>Available Loans for Investment</h2>

      {/* Lender Profile Information */}
      <section className="lender-profile">
        <h3>Lender Profile</h3>
        <p><strong>Name:</strong> {lenderProfile.name}</p>
        <p><strong>Email:</strong> {lenderProfile.email}</p>
        <p><strong>Phone:</strong> {lenderProfile.phoneNumber}</p>
        <p><strong>Total Investments:</strong> ${lenderProfile.totalInvestments || 0}</p>
        <p><strong>Repayment Amount:</strong> ${lenderProfile.repaymentAmount || 0}</p>
        <button className="repayment-btn" onClick={handleRepaymentSetup}>
          Setup Repayment
        </button>
      </section>

      {/* Filters */}
      <div className="filter-section">
        <label>
          Risk Level:
          <select name="riskLevel" value={filters.riskLevel} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Business Type:
          <select name="businessType" value={filters.businessType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Services">Services</option>
          </select>
        </label>

        <label>
          Loan Amount (Max):
          <input
            type="number"
            name="loanAmount"
            value={filters.loanAmount}
            onChange={handleFilterChange}
            placeholder="Enter max loan amount"
          />
        </label>

        
      </div>

      {/* Loan Listings */}
      <div className="loan-listings">
        {filteredLoans.length > 0 ? filteredLoans.map((loan) => (
          <div key={loan._id} className="loan-card">
            <h3>{loan.businessName}</h3>
            <p><strong>Business Type:</strong> {loan.businessType}</p>
            <p><strong>Loan Amount:</strong> ${loan.loanAmount}</p>
            <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
            <p><strong>Loan Term:</strong> {loan.loanTerm} months</p>
            <p><strong>Risk Level:</strong> {loan.riskLevel}</p>
            <p><strong>Total Raised:</strong> ${loan.totalRaised}</p>
            <p><strong>Amount Remaining:</strong> ${loan.loanAmount - loan.totalRaised}</p>

            {/* Button to invest */}
            <button className="invest-btn" onClick={() => handleInvest(loan._id)}>
              Invest Now
            </button>
          </div>
        )) : (
          <p>No loans available for your filter criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableLoan;