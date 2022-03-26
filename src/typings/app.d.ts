declare namespace App {
  export interface Product {
    id: number;
    name: string;
    price: number;
    picture: string;
    sku: string;
  }

  export type CartItem = {
    id: number;
    name: string;
    price: number;
    qty: number;
    picture: string;
    sku: string;
  };

  export interface SaleItem {
    id: number;
    qty: number;
  }

  export interface SummaryItem {
    id: number;
    name: string;
    price: number;
    qty: number;
  }

  export interface SalesSummary {
    totalCost: number;
    soldItems: SummaryItem[];
  }
}
