declare namespace App {
  export interface AppState {
    products: Product[];
    cart: CartItem[];
    sales: null | SalesSummary;
  }
}
