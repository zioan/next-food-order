import { useState } from 'react';

import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';

function Product() {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div>
      <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>Products</h2>
      <div className='flex justify-center mb-10'>
        <button
          className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab1')}
        >
          Create Product
        </button>
        <button
          className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab2')}
        >
          Update Product
        </button>
        <button
          className={activeTab === 'tab3' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab3')}
        >
          Delete Product
        </button>
      </div>

      <hr className=' mb-10' />

      {activeTab === 'tab1' && <CreateProduct />}
      {activeTab === 'tab2' && <UpdateProduct />}
      {activeTab === 'tab3' && <DeleteProduct />}
    </div>
  );
}

export default Product;
