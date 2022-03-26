import React, { useReducer, useEffect, useState, useRef } from 'react';
import Shop from './Shop';
import SalesSummary from './SalesSummary';
import '../css/app.css';
import reducer, { initialState } from '../reducers';
import { useApi } from '../hooks/useApi';
import { getProducts, postSales } from '../apis';
import {
  addProductToCartAction,
  productsLoadedAction,
  removeProductFromCartAction,
  returnToShopAction,
  salesSuccessAction,
  setQtyCartItemAction
} from '../actions';
import Loader from './Loader';
import Retry from './Retry';

const App = () => {
  const {
    isLoading,
    isError,
    data: products,
    loadData: loadProducts
  } = useApi(getProducts);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [showSaleSummary, setShowSaleSummary] = useState(false);
  const [saleRequestFailed, setSaleRequestFailed] = useState<boolean | null>(
    null
  );

  /**
   * loadProducts when component mounted, and when click go back from Sales Summary page
   * loadProducts function will not be changed in the context of this demo app
   */
  useEffect(() => {
    if (!showSaleSummary) {
      loadProducts();
    }
  }, [loadProducts, showSaleSummary]);

  /**
   * When products loaded, dispatch productsLoadedAction
   * Check for products not null to avoid productsLoadedAction dispatched in first render
   */
  useEffect(() => {
    if (products != null) {
      dispatch(productsLoadedAction(products));
    }
  }, [products]);

  /**
   * When add product to cart, dispatch action addProductToCartAction with product id
   * @param {Number} id - product id
   */
  const addProductToCart = (id: number) => {
    dispatch(addProductToCartAction(id));
  };

  /**
   * When remove product from cart, dispatch action removeProductFromCartAction with product id
   * @param {Number} id - product id
   */
  const removeProductFromCart = (id: number) => {
    dispatch(removeProductFromCartAction(id));
  };

  /**
   * When update qty of cart item, dispatch setQtyCartItemAction with product id, and qty
   * @param {Number} id - product id
   * @param {Number} qty - qty to buy
   */
  const updateCartItemQty = (id: number, qty: number) => {
    dispatch(setQtyCartItemAction(id, qty));
  };

  /**
   * Handle when click Pay button
   * Construct payload to submit a sale request
   * If sales request success, go to sales summary component
   * If sales request fail, stay on the main component with an error message shown. User can retry by click Pay button again
   */
  const submitSales = async () => {
    const salePayload = state.cart.map((item) => ({
      product_id: item.id,
      quantity: item.qty
    }));
    const sales = await postSales(salePayload);
    if (sales instanceof Error) {
      // sales request fail. show message to inform user and allow retry
      setSaleRequestFailed(true);
    } else {
      dispatch(salesSuccessAction(sales));
      setSaleRequestFailed(false);
      setShowSaleSummary(true);
    }
  };

  /**
   * Return to product list page to continue shopping
   * dispatch setShowSaleSummary to reset the current state
   */
  const backtoShop = () => {
    dispatch(returnToShopAction());
    setShowSaleSummary(false);
  };

  return (
    <div className="App">
      {isLoading && <Loader />}
      {isError && <Retry retry={loadProducts} />}
      {showSaleSummary && (
        <SalesSummary backtoShop={backtoShop} sales={state.sales} />
      )}
      {!showSaleSummary && products && (
        <Shop
          products={state.products}
          cart={state.cart}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
          updateCartItemQty={updateCartItemQty}
          submitSales={submitSales}
          saleRequestFailed={!!saleRequestFailed}
        />
      )}
    </div>
  );
};

export default App;
