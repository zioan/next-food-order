import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import OrderComponent from './OrderComponent';
import OrderContext from '../../../context/OrderContext';

function Orders() {
  const {
    orders,
    getAllOrders,
    pendingOrders,
    completedOrders,
    deliveredOrders,
  } = useContext(OrderContext);

  const [activeTab, setActiveTab] = useState('tab1');

  // useEffect(() => {
  //   getAllOrders();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllOrders();
    }, 10000);
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
