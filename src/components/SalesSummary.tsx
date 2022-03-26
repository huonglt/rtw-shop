import React from 'react';
import { formatNumber } from '../util';
import '../css/components.css';
import PaymentSummary from './PaymentSummary';
import SummaryItem from './SummaryItem';

/**
 * Prop type of SalesSummary component
 */
type Props = {
  sales: App.SalesSummary | null;
  backtoShop: () => void;
};

/**
 * Component to show Sales Summary
 */
const SalesSummary = (props: Props) => {
  const { sales, backtoShop } = props;

  return (
    <div className="summary-container">
      <div className="summary-products">
        <div className="summary-header">SALE SUMMARY</div>
        {sales &&
          sales.soldItems.map((item) => (
            <SummaryItem {...item} key={item.id} />
          ))}
        {sales && (
          <div className="summary-total">
            <span className="summary-text-bold">
              TOTAL
              <span className="summary-text-small">
                {sales.soldItems.length} Items
              </span>
            </span>
            <div className="summary-total-cost">
              ${formatNumber(sales.totalCost)}
            </div>
          </div>
        )}
      </div>

      <div className="summary-payment">
        <PaymentSummary backtoShop={backtoShop} />
      </div>
    </div>
  );
};

export default SalesSummary;
