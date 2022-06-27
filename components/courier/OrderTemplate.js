import { useContext } from 'react';
import toDecimal from '../../lib/toDecimal';
import axios from 'axios';
import OrderContext from '../../context/OrderContext';

function OrderTemplate({ order, session }) {
  const { getAllOrders } = useContext(OrderContext);
  function getReadableDate(date) {
    const readableDate = new Date(date).toLocaleDateString('en-EN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return readableDate;
  }

  function goToAddress() {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${order.customerAddress}&travelmode=driving`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  async function orderDelivered() {
    const data = {
      courierName: session?.name,
      courierId: session?.id,
      status: 'delivered',
    };
    const response = await axios
      .patch(`/api/orders/update-status/${order._id}`, data)
      .then(() => getAllOrders());
  }

  return (
    <>
      <div className=' flex gap-6  justify-center flex-wrap m-2'>
        <div key={order._id} className='custom-shadow w-[450px] p-4'>
          {/* Header with delivery details, price and status  */}
          <div className='flex justify-between'>
            <div>
              <p>
                <span className=' font-bold'>Ordered on: </span>
                {getReadableDate(order.orderDate)}
              </p>
              <span className=' font-bold'>Delivered to: </span>
              <p>{order.customerName}</p>
              <p>{order.customerAddress}</p>
            </div>
            <div className=' self-center'>
              <p className=' font-bold'>Status: {order.status}</p>
              <p className=' font-bold text-red-500'>
                Total: &euro;{toDecimal(order.totalPrice)}
              </p>
            </div>
          </div>

          <h2 className=' font-bold mt-4'>Products ordered:</h2>

          {/* Items ordered list */}
          <div>
            {order.order.map((item) => {
              return (
                <div key={item._id} className=''>
                  <p>
                    {item.name}
                    <span className='font-bold text-xl'> - </span>
                    {item.description}
                  </p>
                  <p>
                    Quantity: {item.quantityOrdered}
                    <span className='font-bold text-xl'> - </span>
                    Subtotal: &euro;
                    {toDecimal(item.totalPrice)}
                  </p>
                  <hr className=' my-2' />
                </div>
              );
            })}
          </div>
          <div className='flex justify-between'>
            {order.status === 'ready for delivery' && (
              <button className='btn btn-secondary' onClick={orderDelivered}>
                Mark as delivered
              </button>
            )}

            {order.status === 'ready for delivery' && (
              <button className='btn' onClick={goToAddress}>
                Go to address
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderTemplate;
