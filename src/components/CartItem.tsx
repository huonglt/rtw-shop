import React, { useState, useRef } from 'react';
import '../css/components.css';
import { formatNumber, validateQty } from '../util';

/**
 * Prop type of CartItem component
 */
type Props = {
  id: number;
  name: string;
  price: number;
  qty: number;
  removeProductFromCart: (id: number) => void;
  updateCartItemQty: (id: number, qty: number) => void;
};

/**
 * UI component for each item in the cart
 */
const CartItem = (props: Props) => {
  const { id, name, price, qty, removeProductFromCart, updateCartItemQty } =
    props;
  const removeHandler = () => removeProductFromCart(id);
  const [itemQty, setItemQty] = useState<string | number>(qty);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemQty(value);
  };

  const handleBlurAndEnter = () => {
    if (!inputRef.current) {
      return;
    }
    const value = inputRef.current.value;
    // qty must be from 1 to 1000
    const isValidQty = validateQty(value);
    if (isValidQty) {
      updateCartItemQty(id, Number(value));
    } else {
      updateCartItemQty(id, 1);
      setItemQty(1);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlurAndEnter();
  };

  const handleFocus = () => {
    inputRef.current?.select();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // handle Enter key
    if (e.keyCode === 13) {
      handleBlurAndEnter();
    }
  };
  return (
    <div className="cart-item">
      <input
        type="text"
        className="cart-qty"
        value={itemQty}
        onChange={handleQtyChange}
        onBlur={handleBlur}
        ref={inputRef}
        onFocus={handleFocus}
        onKeyUp={handleKeyUp}
        data-testid={`item-${id}-qty`}
      />
      <div className="cart-name" data-testid={`item-${id}-name`}>
        {name}
      </div>
      <div className="cart-price" data-testid={`item-${id}-price`}>
        ${formatNumber(price)}
      </div>
      <div
        className="cart-remove"
        data-testid={`item-${id}-remove`}
        onClick={removeHandler}
      >
        Remove
      </div>
    </div>
  );
};

export default CartItem;
