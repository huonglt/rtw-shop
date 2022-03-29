import {
  addProductToCartAction,
  productsLoadedAction,
  removeProductFromCartAction
} from '../../actions';
import reducer, { initialState } from '../index';
import { mockProducts, mockProduct1, mockProduct2 } from '../../test/mock/data';

describe('reducer', () => {
  it('PRODUCTS_LOADED action will set products for the state', () => {
    const action = productsLoadedAction(mockProducts);

    const newState = reducer(initialState, action);

    const expectedState: App.AppState = {
      ...initialState,
      products: mockProducts
    };
    expect(newState).toEqual(expectedState);
  });

  it('ADD_PRODUCT_TO_CART will add product to cart and remove product from product list', () => {
    const prevState: App.AppState = {
      ...initialState,
      products: mockProducts
    };

    const action = addProductToCartAction(1);
    const newState = reducer(prevState, action);

    /**
     * product 1 is removed from products
     * product 1 is added to cart with initial qty of 1
     */
    const expectedState: App.AppState = {
      ...prevState,
      products: [mockProduct2],
      cart: [{ ...mockProduct1, qty: 1 }]
    };

    expect(newState).toEqual(expectedState);
  });

  it('REMOVE_PRODUCT_FROM_CART will remove product from cart and add product back to product list', () => {
    const prevState: App.AppState = {
      products: [mockProduct2],
      cart: [
        {
          ...mockProduct1,
          qty: 1
        }
      ],
      sales: null
    };
    const action = removeProductFromCartAction(1);
    const newState = reducer(prevState, action);

    // product 1 added back to product list without prop qty
    const expectedState: App.AppState = {
      products: [mockProduct2, mockProduct1],
      cart: [],
      sales: null
    };
    expect(newState).toEqual(expectedState);
  });

  /**
   * TODO: similar tests for SET_QTY_CART_ITEM, SALES_SUCCESS, and RETURN_TO_SHOP actions
   */
});
