import { useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../../context/ProductContext';

function DeleteCategory() {
  const { products, getProducts } = useContext(ProductContext);

  const deleteHandler = async (name) => {
    if (window.confirm(`Are you sure you want to delete selected product?`)) {
      await axios.delete(`/api/products/${name}`).then(() => getProducts());
    }
  };

  return (
    <>
      <h2 className=' mb-6 underline text-xl'>Click a product to delete</h2>
      <ul className='flex gap-4'>
        {products.map((product) => {
          return (
            <li
              key={product._id}
              onClick={() => deleteHandler(product.name)}
              className='flex flex-col items-center cursor-pointer border-2'
            >
              <p>{product.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DeleteCategory;
