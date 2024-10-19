import React from 'react';
import './About.css'; // Optional: Import a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Peer-to-Peer Lending Platform</h1>
      <p>
        Our Peer-to-Peer Lending Platform is designed to empower small business owners by providing accessible funding opportunities to help them grow and thrive. We connect borrowers who need capital with lenders looking to invest in promising ventures, fostering financial inclusion and community development.
      </p>
      <h2>Our Mission</h2>
      <p>
        We aim to create a seamless and efficient lending process that allows small businesses to access the capital they need while offering attractive investment opportunities for lenders. Our platform promotes economic growth by supporting entrepreneurs and enabling them to realize their business potential.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>User-friendly authentication and registration process for both borrowers and lenders.</li>
        <li>Comprehensive loan application process with document uploads and real-time status notifications.</li>
        <li>A wide range of lending opportunities with detailed information on each loan.</li>
        <li>Integrated credit scoring and risk assessment to evaluate borrower creditworthiness.</li>
        <li>Investment management tools for lenders to track and manage their portfolios.</li>
        <li>Repayment tracking features for borrowers and lenders to monitor loan repayments.</li>
        <li>Dispute resolution mechanisms to address any issues that may arise.</li>
        <li>Reporting and analytics tools for users to gain insights into their financial performance.</li>
      </ul>
      <h2>Get Involved</h2>
      <p>
        Whether you are a small business owner seeking funding or an investor looking to support innovative businesses, we invite you to join our community. Together, we can drive growth, create opportunities, and foster financial inclusion for all.
      </p>
      <h2>Contact Us</h2>
      <p>
        For more information or inquiries, please reach out to us at: <a href="mailto:support@lendingplatform.com">support@lendingplatform.com</a>
      </p>
    </div>
  );
};

export default About;
