import React from 'react';
import '../css/components.css';
import { formatNumber } from '../util/index';

/**
 * Prop type of SummaryItem component
 */
type Props = {
  qty: number;
  name: string;
  price: number;
};

/**
 * Component for a sold item in the sales summary
 */
const SummaryItem = (props: Props) => {
  const { qty, name, price } = props;
  return (
    <div className="summary-item-container">
      <div>{qty}</div>
      <div className="summary-item-name">{name}</div>
      <div>${formatNumber(price)}</div>
    </div>
  );
};

export default SummaryItem;
