import React, { useState, useEffect } from 'react';
import './AvailableLoan.css'; // Add necessary styles

const AvailableLoan = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [filters, setFilters] = useState({
    riskLevel: '',
    businessType: '',
    loanAmount: '',
    upiId: '' // State to store UPI ID
  });
  const [lenderProfile, setLenderProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    totalInvestments: 0,
    repaymentAmount: 0
  });
  const [repaymentDetails, setRepaymentDetails] = useState({ amount: '' });

  useEffect(() => {
    const fetchLoansAndProfile = async () => {
      try {
        // Fetch available loans for investment
        const loanResponse = await fetch('http://localhost:5000/api/lender/available-loans', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const loansData = await loanResponse.json();
        setLoans(loansData);
        setFilteredLoans(loansData);

        // Fetch lender profile
        const profileResponse = await fetch('http://localhost:5000/api/lender/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const profileData = await profileResponse.json();
        setLenderProfile(profileData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchLoansAndProfile();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setLenderProfile({ ...lenderProfile, [name]: value });
  };

  const handleSearch = () => {
    const filtered = loans.filter((loan) => {
      const meetsRiskLevel = filters.riskLevel ? loan.riskLevel === filters.riskLevel : true;
      const meetsBusinessType = filters.businessType ? loan.businessType === filters.businessType : true;
      const meetsLoanAmount = filters.loanAmount ? loan.loanAmount <= parseInt(filters.loanAmount) : true;

      return meetsRiskLevel && meetsBusinessType && meetsLoanAmount;
    });

    setFilteredLoans(filtered);
  };

  const handleInvest = async (loanId) => {
    try {
      await fetch(`http://localhost:5000/api/lender/invest/${loanId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Investment successful!');
    } catch (error) {
      console.error("Error investing in loan", error);
    }
  };

  const handleRepaymentSetup = async (loanId) => {
    try {
      const { amount } = repaymentDetails;
      await fetch('http://localhost:5000/api/lender/repayment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loanId, amount })
      });
      alert('Repayment setup successfully!');

      // Redirect to Razorpay website after setting up repayment
      window.location.href = 'https://razorpay.com/'; // Replace with the actual URL you want to redirect to
    } catch (error) {
      console.error("Error setting up repayment", error);
    }
  };

  // Function to handle repayment redirection
  const handleRepaymentRedirect = () => {
    window.location.href = 'https://razorpay.com/';
  };

  return (
    <div className="available-loans-page">
      <h2>Available Loans for Investment</h2>

      <section className="lender-profile">
        <h3>Lender Profile</h3>

        {/* Input fields for the profile */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={lenderProfile.name}
            onChange={handleProfileChange}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={lenderProfile.email}
            onChange={handleProfileChange}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={lenderProfile.phoneNumber}
            onChange={handleProfileChange}
            placeholder="Enter your phone number"
          />
        </label>

        <label>
          Total Investments:
          <input
            type="number"
            name="totalInvestments"
            value={lenderProfile.totalInvestments}
            onChange={handleProfileChange}
            placeholder="Enter total investments"
          />
        </label>

        <label>
          Repayment Amount:
          <input
            type="number"
            name="repaymentAmount"
            value={lenderProfile.repaymentAmount}
            onChange={handleProfileChange}
            placeholder="Enter repayment amount"
          />
        </label>

        <button className="save-profile-btn">Save Profile</button>
      </section>

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

        <label>
          UPI ID:
          <textarea
            name="upiId"
            value={filters.upiId}
            onChange={handleFilterChange}
            placeholder="Enter your UPI ID"
            rows="2"
          />
        </label>

        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

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

            <button className="invest-btn" onClick={() => handleInvest(loan._id)}>
              Invest Now
            </button>

            <button className="set-repayment-btn" onClick={() => handleRepaymentSetup(loan._id)}>
              Set Repayment
            </button>
          </div>
        )) : (
          <>
            <p>No loans available for your filter criteria.</p>
            <button className="repayment-btn" onClick={handleRepaymentRedirect}>
              Repayment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AvailableLoan;