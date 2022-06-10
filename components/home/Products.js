import { useState, useEffect, useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import axios from 'axios';

function Products() {
  const { products } = useContext(ProductContext);

  return (
    <>
      <h2>Products</h2>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <h3>{product.name}</h3>
          </div>
        );
      })}
    </>
  );
}

export default Products;
