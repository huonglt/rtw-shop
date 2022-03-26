import React from 'react';
import Product from './Product';
import '../css/components.css';

/**
 * Prop type of Products component
 */
type Props = {
  products: App.Product[];
  selectProduct: (id: number) => void;
};

/**
 * Product List
 */
const Products = (props: Props) => {
  const { products, selectProduct } = props;

  return (
    <div className="products-container">
      <div className="title-products">Products</div>
      <div className="product-container">
        <div className="title-product">Product</div>
        <div className="title-price">Retail Price</div>
      </div>
      {Array.isArray(products) &&
        products.map((product) => (
          <Product
            {...product}
            selectProduct={selectProduct}
            key={product.id}
          />
        ))}
      <div className="product-button-container">
        <button className="product-new-button">Create New Product</button>
      </div>
    </div>
  );
};

export default Products;
