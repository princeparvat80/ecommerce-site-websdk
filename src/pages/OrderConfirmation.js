import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Function to handle feedback submission
    const handleSubmit = () => {
        if (feedback.trim() === '') {
            alert('Please write some feedback before submitting.');
            return;
        }

        sessionStorage.setItem('userFeedback', feedback);
        setSubmitted(true);
    };

    return (
        <div className="confirmation-container">
            <h1>Thank You for Shopping with Us! 🎉</h1>
            <p>Your order has been placed successfully.</p>

            {/* Feedback Section */}
            <div className="feedback-section">
                <h3>Give Us Your Feedback</h3>
                {submitted ? (
                    <p className="thank-you-message">Thank you for your feedback! 😊</p>
                ) : (
                    <>
                        <textarea
                            className="feedback-input"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback here..."
                            maxLength="600"
                        />
                        <button onClick={handleSubmit} className="submit-feedback-button">Submit</button>
                    </>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="confirmation-actions">
                <Link to="/" className="product-button">Go to Product Page</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
