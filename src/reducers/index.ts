import {
  PRODUCTS_LOADED,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_QTY_CART_ITEM,
  SALES_SUCCESS,
  RETURN_TO_SHOP,
  ProductsLoadedAction,
  AddProductToCartAction,
  RemoveProductFromCartAction,
  SetQtyCartItemAction,
  SalesSuccessAction
} from '../actions';

export const initialState: App.AppState = {
  products: [],
  cart: [],
  sales: null
};

const reducer = (state: App.AppState, action: App.AnyAction): App.AppState => {
  const { products, cart } = state;
  switch (action.type) {
    case PRODUCTS_LOADED: {
      return { ...state, products: (action as ProductsLoadedAction).products };
    }
    case ADD_PRODUCT_TO_CART: {
      const { id } = action as AddProductToCartAction;
      const product = products.find((product) => product.id === id);
      if (product) {
        const newCart = [...cart, { ...product, qty: 1 }];
        const newProducts = products.filter((product) => product.id !== id);
        return { ...state, products: newProducts, cart: newCart };
      }
      return state;
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const { id } = action as RemoveProductFromCartAction;
      const product = cart.find((product) => product.id === id);
      if (product) {
        const { id, name, sku, picture, price } = product;

        const newCart = cart.filter((product) => product.id !== id);
        const newProducts = [...products, { id, name, sku, picture, price }];

        return { ...state, products: newProducts, cart: newCart };
      }
      return state;
    }

    case SET_QTY_CART_ITEM: {
      const { id, qty } = action as SetQtyCartItemAction;
      const index = cart.findIndex((product) => product.id === id);

      const newCart = [...cart];
      newCart[index].qty = qty;
      return { ...state, cart: newCart };
    }
    case SALES_SUCCESS: {
      const { total_cost: totalCost, sold_items } = (
        action as SalesSuccessAction
      ).payload;

      const soldItems = sold_items.map((item) => {
        const product = state.cart.find(
          (product) => product.id === item.product_id
        );
        if (product) {
          return { ...product, qty: item.quantity };
        }
        // mark the item not found with max safe integer & item not found
        return {
          id: item.product_id,
          name: 'Item not found',
          qty: Number.MAX_SAFE_INTEGER,
          price: Number.MAX_SAFE_INTEGER
        };
      });
      return { ...state, sales: { totalCost, soldItems } };
    }
    case RETURN_TO_SHOP: {
      return initialState;
    }
    default:
      break;
  }
  return state;
};

export default reducer;
