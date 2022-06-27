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

  const [activeTab, setActiveTab] = useState('tab1');

  const courierId = session?.id;

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
  }, [orders]);

  return (
    <>
      <div className='flex justify-center mb-10 mt-6'>
        <button
          className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab1')}
        >
          Orders for delivery
        </button>
        <button
          className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab2')}
        >
          Delivered orders
        </button>
      </div>

      {/* Title must update based on order status */}

      {/* <h2 className=' font-bold text-2xl text-center mt-6 mb-10'>
        {order.status === 'ready for delivery' && 'Orders for delivery'}
        {order.status === 'delivered' && 'Delivered Orders'}
      </h2> */}

      {/* For delivery */}
      {ordersForDelivery.length > 0 &&
        activeTab === 'tab1' &&
        ordersForDelivery.map((order) => {
          return (
            <OrderTemplate key={order._id} order={order} session={session} />
          );
        })}

      {/* Delivered orders */}
      {deliveredOrders.length > 0 &&
        activeTab === 'tab2' &&
        deliveredOrders.map((order) => {
          return (
            <OrderTemplate key={order._id} order={order} session={session} />
          );
        })}
    </>
  );
}

export default Orders;
