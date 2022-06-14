import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import CategoryContext from '../../../context/CategoryContext';
import ProductContext from '../../../context/ProductContext';
import NotificationContext from '../../../context/NotificationContext';
import Notification from '../../ui/Notification';

function CreateProduct() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const { showNotification, notificationHandler } =
    useContext(NotificationContext);

  const { getProducts } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);

  async function createNewProduct(e) {
    e.preventDefault();
    if (!name || !number || !selectedCategory || !description || !price) return;

    try {
      await axios
        .post('/api/products', {
          name: name,
          number: number,
          category: selectedCategory,
          description: description,
          price: price,
        })
        .then(() => {
          setName('');
          setNumber('');
          setSelectedCategory('');
          setDescription('');
          setPrice('');
          getProducts();
          notificationHandler();
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className=' text-center text-xl mb-6 underline'>
        Create New Product
      </h2>
      <form
        className=' flex flex-col gap-8 w-[320px] mx-auto'
        onSubmit={createNewProduct}
      >
        {/* Name */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='name'>
            <span className='label-text'>Product Name</span>
            {/* <span className='label-text-alt'>Alt label</span> */}
          </label>
          <input
            id='name'
            type='text'
            placeholder='Enter product name'
            className='input input-bordered w-full max-w-xs'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Unique number */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='number'>
            <span className='label-text'>Product Number</span>
            <span className='label-text-alt'>* product order reference</span>
          </label>
          <input
            id='number'
            type='text'
            placeholder='Enter a unique product number'
            className='input input-bordered w-full max-w-xs'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='category'>
            <span className='label-text'>Product Category</span>
            <span className='label-text-alt'>* sorting products</span>
          </label>

          <select
            className='select select-bordered w-full max-w-xs'
            id='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=''>Select a category</option>

            {categories.map((category) => {
              return <option key={category._id}>{category.name}</option>;
            })}
          </select>
        </div>

        {/* Description */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='description'>
            <span className='label-text'>Product Description</span>
            <span className='label-text-alt'>* visible to clients</span>
          </label>
          <textarea
            id='description'
            placeholder='Enter product description'
            className='textarea textarea-bordered w-full max-w-xs'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='price'>
            <span className='label-text'>Product Price</span>
            {/* <span className='label-text-alt'>* visible to clients</span> */}
          </label>
          <input
            id='price'
            placeholder='Enter product price'
            className='input input-bordered w-full max-w-xs'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className='tooltip' data-tip='all fields are required'>
          <button className=' btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
      {showNotification && (
        <Notification title='Product created successfully!' />
      )}
    </>
  );
}

export default CreateProduct;
