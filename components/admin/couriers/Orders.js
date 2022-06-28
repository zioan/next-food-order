import { useContext, useState, useEffect } from 'react';
import CourierContext from '../../../context/CourierContext';
import OrderContext from '../../../context/OrderContext';
import OrderItem from './util/OrderItem';
import toDecimal from '../../../lib/toDecimal';

function Orders() {
  const { orders } = useContext(OrderContext);
  const { courierList } = useContext(CourierContext);
  const [outForDeliveryOrdersCount, setOutForDeliveryOrdersCount] = useState(0);
  const [totalOutForDelivery, setTotalOutForDelivery] = useState(0);
  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);

  function sortOrdersByStatusAndCourierAsignment() {
    // Get orders for delivery
    const forDelivery = orders.filter(
      (order) => order.status === 'ready for delivery'
    );

    if (forDelivery.length > 0) {
      setOutForDeliveryOrdersCount(forDelivery.length);

      const total = forDelivery
        .map((item) => item.totalPrice)
        .reduce((prev, next) => prev + next);
      setTotalOutForDelivery(total);
    } else {
      setOutForDeliveryOrdersCount(0);
      setTotalOutForDelivery(0);
    }

    // Get delivered orders
    const delivered = orders.filter((order) => order.status === 'delivered');

    if (delivered.length > 0) {
      setDeliveredOrdersCount(delivered.length);
      const total = delivered
        .map((item) => item.totalPrice)
        .reduce((prev, next) => prev + next);
      setTotalDeliveredOrders(total);
    } else {
      setDeliveredOrdersCount(0);
      setTotalDeliveredOrders(0);
    }
  }

  useEffect(() => {
    sortOrdersByStatusAndCourierAsignment();
  }, [orders]);

  return (
    <div>
      <h2 className=' text-xl underline text-center mb-6'>
        Orders count and income
      </h2>
      <div className=' flex flex-col lg:flex-row gap-4 lg:justify-between'>
        <div>
          {courierList.length > 0 &&
            courierList.map((courier) => {
              return <OrderItem key={courier._id} courier={courier} />;
            })}
        </div>
        <div>
          <p>Orders out for delivery: {outForDeliveryOrdersCount}</p>
          <p>Total out for delivery: &euro;{toDecimal(totalOutForDelivery)}</p>
          <p>Orders delivered: {deliveredOrdersCount}</p>
          <p>
            Total from delivered orders: &euro;{toDecimal(totalDeliveredOrders)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Orders;
