import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import CategoryContext from '../../../context/CategoryContext';
import NotificationContext from '../../../context/NotificationContext';
import ProductContext from '../../../context/ProductContext';
import Notification from '../../ui/Notification';
import toDecimal from '../../../lib/toDecimal';

function UpdateProduct() {
  const { products, getProducts } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { showNotification, notificationHandler } =
    useContext(NotificationContext);
  const [selectedProduct, setSelectedProduct] = useState();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const selectDataHandler = (product) => {
    setSelectedProduct(product);
    setId(product._id);
    setName(product.name);
    setNumber(product.number);
    setSelectedCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    const product = {
      _id: id,
      name: name,
      number: number,
      category: selectedCategory,
      description: description,
      price: price,
    };

    try {
      await axios.patch('/api/products', { product: product }).then(() => {
        getProducts();
        setSelectedProduct();
        notificationHandler();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className=' mb-8 underline text-xl text-center'>
        Click a product to update
      </h2>
      <ul className='flex flex-col gap-4'>
        {products.map((product) => {
          return (
            <li
              key={product._id}
              onClick={() => selectDataHandler(product)}
              className='flex items-center justify-between cursor-pointer border-2 p-2 hover:bg-slate-100'
            >
              <div className='flex gap-4'>
                <h3 className=' font-bold'>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className='flex gap-4'>
                <p>{product.category}</p>
                <p className=' font-bold'>&euro; {toDecimal(product.price)}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {/*  */}
      {selectedProduct && (
        <form
          className=' flex flex-col gap-8 w-[320px] mx-auto mt-6'
          onSubmit={updateHandler}
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
              Update Product
            </button>
          </div>
        </form>
      )}

      {showNotification && (
        <Notification title='Product updated successfully!' />
      )}
    </>
  );
}

export default UpdateProduct;
