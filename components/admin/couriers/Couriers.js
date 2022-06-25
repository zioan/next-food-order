import { useState } from 'react';
import CreateCourier from './CreateCourier';

function Couriers() {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <>
      <div>
        <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>Couriers</h2>
        <div className='flex justify-center mb-10'>
          <button
            className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
            onClick={() => {
              setActiveTab('tab1');
            }}
          >
            Orders
          </button>
          <button
            className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
            onClick={() => setActiveTab('tab2')}
          >
            Add new courier
          </button>
        </div>

        <hr className=' mb-10' />

        {activeTab === 'tab1' && <p>View courier orders</p>}
        {activeTab === 'tab2' && <CreateCourier />}
      </div>
    </>
  );
}

export default Couriers;
