import React from 'react';
import '../css/components.css';

/**
 * Prop type of PaymentSummary component
 */
type Props = {
  backtoShop: () => void;
};

/**
 * Component to show sales summary after a sale request success
 */
const PaymentSummary = (props: Props) => {
  const { backtoShop } = props;

  return (
    <div className="payment-container">
      <div className="payment-header">Payment Received</div>
      <div className="print-container">
        <button className="print-receipt-button">Print Receipt</button>
        <button className="gift-receipt-button">Gift Receipt</button>
      </div>
      <div className="payment-email-container">
        <input placeholder="Email address" className="payment-email-input" />
        <button className="payment-email-button">Email Receipt</button>
      </div>
      <div className="payment-button-container">
        <button onClick={backtoShop} className="payment-done-button">
          Done (ESC)
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
