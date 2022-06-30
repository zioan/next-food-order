import { useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../../context/ProductContext';
import NotificationContext from '../../../context/NotificationContext';
import Notification from '../../ui/Notification';

function DeleteCategory() {
  const { products, getProducts } = useContext(ProductContext);
  const { showNotification, notificationHandler } =
    useContext(NotificationContext);

  const deleteHandler = async (name) => {
    if (window.confirm(`Are you sure you want to delete selected product?`)) {
      await axios.delete(`/api/products/${name}`).then(() => {
        getProducts();
        notificationHandler();
      });
    }
  };

  return (
    <>
      <h2 className=' mb-8 underline text-xl text-center'>
        Click a product to delete
      </h2>
      <ul className='flex flex-wrap gap-4'>
        {products.map((product) => {
          return (
            <li
              key={product._id}
              onClick={() => deleteHandler(product.name)}
              className='flex flex-col  items-center cursor-pointer border-2 p-2 hover:bg-slate-100'
            >
              <p>{product.name}</p>
            </li>
          );
        })}
      </ul>
      {showNotification && (
        <Notification title='Product deleted successfully!' />
      )}
    </>
  );
}

export default DeleteCategory;
