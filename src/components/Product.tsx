import React from 'react';
import '../css/components.css';
import { formatNumber } from '../util';

/**
 * Prop type of Product component
 */
type Props = {
  id: number;
  name: string;
  price: number;
  picture: string;
  selectProduct: (id: number) => void;
};

/**
 * Component to show a product to sell
 */
const Product = (props: Props) => {
  const { id, name, price, picture, selectProduct } = props;
  const clickHandler = () => selectProduct(id);

  return (
    <div onClick={clickHandler} className="product-container">
      <img src={picture} alt="" className="product-picture" />
      <div className="product-details">
        <div className="product-name">{name}</div>
        <div>{id}</div>
      </div>
      <div className="product-price">${formatNumber(price)}</div>
    </div>
  );
};

export default Product;
