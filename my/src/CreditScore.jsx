import React, { useState } from 'react';

const CreditScoring = () => {
    const [formData, setFormData] = useState({
        creditScore: '',
        income: '',
        debt: '',
        paymentHistory: '',
        result: '',
        riskLevel: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateCreditScore = () => {
        const { income, debt, paymentHistory } = formData;

        // Simple scoring logic (this should be replaced with a more robust system)
        let score = 700; // Starting score
        if (paymentHistory < 2) score -= 100; // Poor payment history
        if (debt / income > 0.5) score -= 50; // High debt-to-income ratio

        let riskLevel = '';
        if (score >= 750) riskLevel = 'Low Risk';
        else if (score >= 650) riskLevel = 'Medium Risk';
        else riskLevel = 'High Risk';

        setFormData({
            ...formData,
            creditScore: score,
            result: `Your estimated credit score is: ${score}`,
            riskLevel: `Risk Level: ${riskLevel}`
        });
    };

    return (
        <div className="credit-scoring">
            <h2>Credit Scoring and Risk Assessment</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Annual Income:</label>
                    <input 
                        type="number" 
                        name="income" 
                        value={formData.income} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Outstanding Debt:</label>
                    <input 
                        type="number" 
                        name="debt" 
                        value={formData.debt} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Payment History (Years):</label>
                    <input 
                        type="number" 
                        name="paymentHistory" 
                        value={formData.paymentHistory} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="button" onClick={calculateCreditScore}>Calculate Score</button>
            </form>
            <div className="results">
                <p>{formData.result}</p>
                <p>{formData.riskLevel}</p>
            </div>
        </div>
    );
};

export default CreditScoring;
