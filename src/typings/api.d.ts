declare namespace App {
  export interface SaleRequestPayload {
    product_id: number;
    quantity: number;
  }

  export interface SaleResponsePayload {
    total_cost: number;
    sold_items: [{ product_id: number; quantity: number; Price: number }];
  }
}
