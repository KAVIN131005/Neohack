import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanApplication.css'; // Add necessary styles here

const LoanApplication = () => {
  const [userData, setUserData] = useState({});
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [collateralDetails, setCollateralDetails] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [documents, setDocuments] = useState(null); // For storing selected documents

  useEffect(() => {
    // Fetch borrower account data to pre-fill form
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/borrower/account', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching borrower data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDocumentUpload = (e) => {
    setDocuments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect loan application data
    const formData = new FormData();
    formData.append('loanAmount', loanAmount);
    formData.append('loanPurpose', loanPurpose);
    formData.append('loanTerm', loanTerm);
    formData.append('annualIncome', annualIncome);
    formData.append('employmentStatus', employmentStatus);
    formData.append('collateralDetails', collateralDetails);
    formData.append('borrowerId', userData._id); // Assuming user has an ID

    // Append each document
    if (documents) {
      for (let i = 0; i < documents.length; i++) {
        formData.append('documents', documents[i]);
      }
    }

    try {
      // Submit loan application along with documents
      await axios.post('http://localhost:5000/api/borrower/loan-application', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      alert("Loan application and documents submitted successfully!");
    } catch (error) {
      console.error("Error submitting loan application", error);
    }
  };

  return (
    <div className="loan-application-page">
      <h2>Loan Application Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="section">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <label>
            Phone Number:
            <input
              type="tel"
              required
              placeholder="Enter your phone number"
            />
          </label>
        </section>

        {/* Loan Information */}
        <section className="section">
          <h3>Loan Information</h3>
          <label>
            Loan Amount:
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              required
            />
          </label>

          <label>
            Loan Purpose:
            <textarea
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              placeholder="Specify the purpose of the loan"
              required
            />
          </label>

          <label>
            Loan Term (months):
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term in months"
              required
            />
          </label>
        </section>

        {/* Financial Details */}
        <section className="section">
          <h3>Financial Information</h3>
          <label>
            Annual Income:
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="Enter your annual income"
              required
            />
          </label>

          <label>
            Employment Status:
            <select
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              required
            >
              <option value="">Select employment status</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
            </select>
          </label>
        </section>

        {/* Collateral Information (if applicable) */}
        <section className="section">
          <h3>Collateral Information (optional)</h3>
          <label>
            Collateral Details (e.g., house, car):
            <textarea
              value={collateralDetails}
              onChange={(e) => setCollateralDetails(e.target.value)}
              placeholder="Describe any assets you can offer as collateral"
            />
          </label>
        </section>

        {/* Document Upload */}
        <section className="section">
          <h3>Document Upload</h3>
          <label>
            Upload Documents (e.g., Proof of Income, ID, etc.):<br></br>
            <input
              type="file"
              multiple
              onChange={handleDocumentUpload}
              required
            />
          </label>
        </section>

        {/* Agreement */}
        <section className="section agreement-section">
          <label>
            <input
              type="checkbox"
              checked={agreement}
              onChange={() => setAgreement(!agreement)}
              required
            />
            I agree to the terms and conditions.
          </label>
        </section>

        <button type="submit" className="submit-btn">Submit Loan Application</button>
      </form>
    </div>
  );
};

export default LoanApplication;
