import { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productsData = await axios.get('/api/products');
    console.log(productsData.data.products);
    setProducts(productsData.data.products);
  };

  useEffect(() => {
    getProducts();
    console.log('products fetched');
  }, []);

  // console.log(products);

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
