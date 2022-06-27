import { useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import OrderContext from '../context/OrderContext';
import OrderTemplate from '../components/courier/OrderTemplate';

// This is courier page

function Orders() {
  const { data: session, status } = useSession();
  const { orders } = useContext(OrderContext);
  const [ordersForDelivery, setOrdersForDelivery] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const courierId = session?.id;
  console.log(courierId);

  function sortOrdersByStatusAndCourierAsignment() {
    // Get courier orders for delivery
    const forDelivery = orders.filter(
      (order) =>
        order.courierId === courierId && order.status === 'ready for delivery'
    );
    setOrdersForDelivery(forDelivery);

    // Get delivered courier orders
    const delivered = orders.filter(
      (order) => order.courierId === courierId && order.status === 'delivered'
    );
    setDeliveredOrders(delivered);
  }

  useEffect(() => {
    sortOrdersByStatusAndCourierAsignment();
  }, []);

  console.log(ordersForDelivery);

  return (
    <>
      {/* For delivery */}
      {ordersForDelivery.length > 0 &&
        ordersForDelivery.map((order) => {
          return <OrderTemplate key={order._id} order={order} />;
        })}

      {/* Delivered orders */}
      {deliveredOrders.length > 0 &&
        deliveredOrders.map((order) => {
          return <p key={order._id}>{order.courierName}</p>;
        })}
    </>
  );
}

export default Orders;
