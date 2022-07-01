import { useContext, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import OrderContext from '../../../context/OrderContext';

function Cart({ item, addItemToFinalOrder }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const { removeFromOrder, removeItemFromFinalOrder } =
    useContext(OrderContext);

  function removeFromCartHandler(item) {
    setItemQuantity(1);
    removeFromOrder(item);
    removeItemFromFinalOrder(item);
  }

  useEffect(() => {
    const returnedItem = {
      _id: item._id,
      name: item.name,
      quantityOrdered: itemQuantity,
      description: item.description,
      category: item.category,
      price: item.price,
      totalPrice: itemQuantity * item.price,
    };
    addItemToFinalOrder(returnedItem);
    return () => returnedItem;
  }, [item, itemQuantity]);

  return (
    <div>
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
    </div>
  );
}

export default Cart;
