import React, { useState } from 'react';

const CreditScoring = () => {
    const [formData, setFormData] = useState({
        creditScore: 700, // Starting score
        income: '',
        debt: '',
        loanAmount: '',
        repaymentHistory: '', // Number of missed or delayed repayments
        loanTerm: '', // Loan term in months
        interestRate: '', // Interest rate in percentage
        result: '',
        riskLevel: '',
        interest: '' // To store calculated interest
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to calculate Simple Interest
    const calculateSimpleInterest = (P, N, R) => {
        return (P * N * R) / 100;
    };

    const calculateCreditScoreAndInterest = () => {
        const { income, debt, loanAmount, repaymentHistory, loanTerm, interestRate } = formData;

        // Base score
        let score = 700;

        // Adjust score based on loan amount compared to income (larger loans might increase risk)
        if (loanAmount / income > 0.6) {
            score -= 50; // Large loan-to-income ratio
        }

        // Adjust score based on repayment history (fewer missed payments = better score)
        if (repaymentHistory > 0) {
            score -= 100 * repaymentHistory; // Each missed/late payment decreases score
        }

        // Debt-to-income ratio
        if (debt / income > 0.5) {
            score -= 50; // High debt relative to income
        }

        // Calculate Simple Interest
        const interest = calculateSimpleInterest(loanAmount, loanTerm, interestRate);

        // Determine risk level based on updated credit score
        let riskLevel = '';
        if (score >= 750) {
            riskLevel = 'Low Risk';
        } else if (score >= 650) {
            riskLevel = 'Medium Risk';
        } else {
            riskLevel = 'High Risk';
        }

        // Update formData with the calculated score, interest, and risk level
        setFormData({
            ...formData,
            creditScore: score,
            result: `Your estimated credit score is: ${score}`,
            riskLevel: `Risk Level: ${riskLevel}`,
            interest: `Simple Interest on loan: ₹${interest.toFixed(2)}`
        });
    };

    return (
        <div className="credit-scoring">
            <h2>Credit Scoring, Interest, and Risk Assessment</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Loan Amount (₹):</label>
                    <input 
                        type="number" 
                        name="loanAmount" 
                        value={formData.loanAmount} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Loan Term (Months):</label>
                    <input 
                        type="number" 
                        name="loanTerm" 
                        value={formData.loanTerm} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Interest Rate (%):</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="interestRate" 
                        value={formData.interestRate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Repayment History (Missed/Late Payments):</label>
                    <input 
                        type="number" 
                        name="repaymentHistory" 
                        value={formData.repaymentHistory} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="button" onClick={calculateCreditScoreAndInterest}>Calculate Score and Interest</button>
            </form>
            <div className="results">
                <p>{formData.result}</p>
                <p>{formData.riskLevel}</p>
                <p>{formData.interest}</p>
            </div>
        </div>
    );
};

export default CreditScoring;
