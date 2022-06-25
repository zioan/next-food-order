import { useState } from 'react';
import Product from '../product/Product';
import Category from '../category/Category';
import Orders from '../orders/Orders';
import Couriers from '../couriers/Couriers';

function TabDashboard() {
  const [activeTab, setActiveTab] = useState('tab3');

  return (
    <>
      <div className=' flex flex-col md:flex-row border-2 border-base-200 m-2 w-auto min-h-[calc(100vh-130px)] '>
        <div className='  border-b-2 md:border-b-0 md:border-r-2 border-base-200'>
          <ul className='flex flex-col gap-2'>
            <li
              onClick={() => setActiveTab('tab3')}
              className={activeTab === 'tab3' ? 'tab active-tab' : 'tab'}
            >
              Orders
            </li>
            <li
              onClick={() => setActiveTab('tab4')}
              className={activeTab === 'tab4' ? 'tab active-tab' : 'tab'}
            >
              Couriers
            </li>
            <li
              onClick={() => setActiveTab('tab1')}
              className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
            >
              Products
            </li>
            <li
              onClick={() => setActiveTab('tab2')}
              className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
            >
              Categories
            </li>
          </ul>
        </div>
        <div className='p-4 w-full'>
          {activeTab === 'tab1' && <Product />}
          {activeTab === 'tab2' && <Category />}
          {activeTab === 'tab3' && <Orders />}
          {activeTab === 'tab4' && <Couriers />}
        </div>
      </div>
    </>
  );
}

export default TabDashboard;
