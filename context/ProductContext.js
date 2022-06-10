import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productsData = await axios.get('/api/products');
    // console.log(productsData.data.products);
    setProducts(productsData.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
