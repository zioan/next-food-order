import { useState, useContext, useEffect } from 'react';
import OrderContext from '../../../../context/OrderContext';
import toDecimal from '../../../../lib/toDecimal';

function OrderItem({ courier }) {
  const { orders } = useContext(OrderContext);
  const [ordersCountForDelivery, setOrdersCountForDelivery] = useState(0);
  const [ordersTotalForDelivery, setOrdersTotalForDelivery] = useState(0);
  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
  const [deliveredOrdersTotal, setDeliveredOrdersTotal] = useState(0);

  const courierId = courier._id;

  function sortOrdersByStatusAndCourierAsignment() {
    // Get courier orders for delivery
    const forDelivery = orders.filter(
      (order) =>
        order.courierId === courierId && order.status === 'ready for delivery'
    );

    if (forDelivery.length > 0) {
      setOrdersCountForDelivery(forDelivery.length);

      const total = forDelivery
        .map((item) => item.totalPrice)
        .reduce((prev, next) => prev + next);

      setOrdersTotalForDelivery(total);
    } else {
      setOrdersCountForDelivery(0);
      setOrdersTotalForDelivery(0);
    }

    // Get delivered courier orders
    const delivered = orders.filter(
      (order) => order.courierId === courierId && order.status === 'delivered'
    );

    if (delivered.length > 0) {
      setDeliveredOrdersCount(delivered.length);

      const totalDelivered = delivered
        .map((item) => item.totalPrice)
        .reduce((prev, next) => prev + next);

      setDeliveredOrdersTotal(totalDelivered);
    } else {
      setDeliveredOrdersCount(0);
      setDeliveredOrdersTotal(0);
    }
  }

  useEffect(() => {
    sortOrdersByStatusAndCourierAsignment();
  }, [orders]);

  return (
    <>
      <div>
        <h2 className='font-bold text-xl underline'>{courier.name}</h2>
        <div className=' flex gap-10'>
          <div>
            <p>Out for delivery orders: {ordersCountForDelivery}</p>
            <p>Total: &euro;{toDecimal(ordersTotalForDelivery)}</p>
          </div>
          <div>
            <p>Delivered orders: {deliveredOrdersCount}</p>
            <p>Total delivered: &euro;{toDecimal(deliveredOrdersTotal)}</p>
          </div>
        </div>
        <hr className=' my-4' />
      </div>
    </>
  );
}

export default OrderItem;
