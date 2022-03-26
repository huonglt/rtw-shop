export const PRODUCTS_LOADED = 'PRODUCTS_LOADED';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const SET_QTY_CART_ITEM = 'SET_QTY_CART_ITEM';
export const SALES_SUCCESS = 'SALES_SUCCESS';
export const RETURN_TO_SHOP = 'RETURN_TO_SHOP';

export const productsLoadedAction = (products: App.Product[]) => ({
  type: PRODUCTS_LOADED,
  products
});

export const removeProductFromCartAction = (id: number) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  id
});
export const addProductToCartAction = (id: number) => ({
  type: ADD_PRODUCT_TO_CART,
  id
});
export const setQtyCartItemAction = (id: number, qty: number) => ({
  type: SET_QTY_CART_ITEM,
  id,
  qty
});
export const salesSuccessAction = (payload: App.SaleResponsePayload) => ({
  type: SALES_SUCCESS,
  payload
});
export const returnToShopAction = () => ({ type: RETURN_TO_SHOP });
