import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('none');

  const getCategories = async () => {
    const productsData = await axios.get('/api/category');
    console.log(productsData.data.categories);
    setCategories(productsData.data.categories);
  };

  useEffect(() => {
    getCategories();
    console.log('products fetched');
  }, []);

  const inputNameRef = useRef();
  const inputNumberRef = useRef();
  // const inputCategoryRef = useRef();
  const inputDescriptionRef = useRef();
  const inputPriceRef = useRef();

  async function createNewProduct(e) {
    e.preventDefault();

    try {
      await axios.post('/api/products', {
        name: inputNameRef.current.value,
        number: inputNumberRef.current.value,
        // category: inputCategoryRef.current.value,
        category: selectedCategory,
        description: inputDescriptionRef.current.value,
        price: inputPriceRef.current.value,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Create Product</h2>
      <form
        className=' flex flex-col gap-8 w-[320px] '
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
            ref={inputNameRef}
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
            ref={inputNumberRef}
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
            // ref={inputCategoryRef}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value='none'>Select a category</option>

            {categories.map((category) => {
              return (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              );
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
            ref={inputDescriptionRef}
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
            ref={inputPriceRef}
          />
        </div>

        <button
          className={selectedCategory === 'none' ? 'btn-disabled' : ' btn'}
          type='submit'
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
