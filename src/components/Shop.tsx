import React from 'react';
import Products from './Products';
import Cart from './Cart';
import '../css/components.css';

/**
 * Prop type of Shop component
 */
type Props = {
  products: App.Product[];
  cart: App.CartItem[];
  addProductToCart: (id: number) => void;
  removeProductFromCart: (id: number) => void;
  updateCartItemQty: (id: number, qty: number) => void;
  submitSales: () => void;
  saleRequestFailed: boolean;
};

/**
 * Component for the shop
 */
const Shop = (props: Props) => {
  const {
    products,
    cart,
    addProductToCart,
    removeProductFromCart,
    updateCartItemQty,
    submitSales,
    saleRequestFailed
  } = props;

  return (
    <div className="shop-container">
      <div className="shop-products">
        {products && (
          <Products products={products} selectProduct={addProductToCart} />
        )}
      </div>
      <div className="shop-cart">
        {cart && (
          <Cart
            cart={cart}
            removeProductFromCart={removeProductFromCart}
            updateCartItemQty={updateCartItemQty}
            submitSales={submitSales}
            saleRequestFailed={saleRequestFailed}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;
