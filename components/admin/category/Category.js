import { useState } from 'react';
import CreateCategory from './CreateCategory';
import DeleteCategory from './DeleteCategory';

// Admin category panel
function Category() {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div>
      <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>Category</h2>
      <div className='flex justify-center mb-10'>
        <button
          className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab1')}
        >
          Create Category
        </button>
        <button
          className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab2')}
        >
          Delete Category
        </button>
      </div>

      <hr className=' mb-10' />

      {activeTab === 'tab1' && <CreateCategory />}
      {activeTab === 'tab2' && <DeleteCategory />}
    </div>
  );
}

export default Category;
