import { useContext, useState, useEffect } from 'react';
import OrderComponent from './OrderComponent';
import OrderContext from '../../../context/OrderContext';
import CourierContext from '../../../context/CourierContext';

function Orders() {
  const {
    orders,
    getAllOrders,
    pendingOrders,
    getPendingOrders,
    completedOrders,
    getOrdersForDelivery,
    deliveredOrders,
    getDeliveredOrders,
  } = useContext(OrderContext);
  const { getCouriers } = useContext(CourierContext);

  const [activeTab, setActiveTab] = useState('tab1');

  useEffect(() => {
    getAllOrders();
    getCouriers();
  }, []);

  useEffect(() => {
    getPendingOrders();
    getOrdersForDelivery();
    getDeliveredOrders();
  }, [orders]);

  // get orders every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      getAllOrders();
      getPendingOrders();
      getOrdersForDelivery();
      getDeliveredOrders();
    }, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>Orders</h2>
        <div className='flex justify-center mb-10'>
          <button
            className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
            onClick={() => {
              setActiveTab('tab1');
            }}
          >
            Pending
          </button>
          <button
            className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
            onClick={() => setActiveTab('tab2')}
          >
            Ready for delivery
          </button>

          <button
            className={activeTab === 'tab3' ? 'tab active-tab' : ' tab'}
            onClick={() => setActiveTab('tab3')}
          >
            Delivered
          </button>
        </div>

        <hr className=' mb-10' />

        {activeTab === 'tab1' && <OrderComponent orders={pendingOrders} />}
        {activeTab === 'tab2' && <OrderComponent orders={completedOrders} />}
        {activeTab === 'tab3' && <OrderComponent orders={deliveredOrders} />}
      </div>
    </>
  );
}

export default Orders;
