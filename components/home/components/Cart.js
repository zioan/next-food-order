import { useContext, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import OrderContext from '../../../context/OrderContext';

function Cart({ item }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const { removeFromOrder } = useContext(OrderContext);

  function removeFromCartHandler(item) {
    removeFromOrder(item);
  }
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className=''>
          <p className=' font-bold underline'>{item.name}</p>
          <p>{item.description}</p>
        </div>
        <div className='flex items-center gap-2'>
          {/* Quantity selector */}
          <div className=' flex gap-2 mx-2 font-bold'>
            <button
              className=' font-bold'
              disabled={itemQuantity === 1}
              onClick={() => setItemQuantity(itemQuantity - 1)}
            >
              -
            </button>
            <p className='quantity'>{itemQuantity}</p>
            <button
              onClick={() => setItemQuantity(itemQuantity + 1)}
              className=' font-bold'
            >
              +
            </button>
          </div>

          {/* Remove button */}
          <BsTrash
            size={20}
            className=' cursor-pointer'
            onClick={() => removeFromCartHandler(item)}
          />
        </div>
      </div>
      <hr className=' my-2' />
    </>
  );
}

export default Cart;
