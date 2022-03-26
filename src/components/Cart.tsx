import React from 'react';

import '../css/components.css';
import { formatNumber } from '../util/index';
import CartItem from './CartItem';

/**
 * Prop type of Cart component
 */
type Props = {
  cart: App.CartItem[];
  removeProductFromCart: (id: number) => void;
  updateCartItemQty: (id: number, qty: number) => void;
  submitSales: () => void;
  saleRequestFailed: boolean;
};

/**
 * Component for the shopping cart
 */
const Cart = (props: Props) => {
  const {
    cart,
    removeProductFromCart,
    updateCartItemQty,
    submitSales,
    saleRequestFailed
  } = props;

  const total = cart.reduce(
    (prevTotal, item) => prevTotal + item.price * item.qty,
    0
  );

  const handlePay = () => {
    submitSales();
  };
  return (
    <div className="cart-container">
      {cart.length === 0 && (
        <div className="cart-no-item">Your cart is empty</div>
      )}
      {cart.length > 0 &&
        cart.map((cart) => (
          <CartItem
            {...cart}
            key={cart.id}
            removeProductFromCart={removeProductFromCart}
            updateCartItemQty={updateCartItemQty}
          />
        ))}
      {cart.length > 0 && (
        <div className="cart-bottom" onClick={handlePay}>
          <button className="cart-pay-button">
            <span>
              Pay <span className="cart-items-length">{cart.length} Items</span>
            </span>
            <span className="cart-total">${formatNumber(total)}</span>
          </button>
          {saleRequestFailed && (
            <div className="cart-sale-fail">
              An error occurred. Please try again
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
