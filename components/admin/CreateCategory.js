import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function CreateProduct() {
  const inputNameRef = useRef();

  async function createNewCategory(e) {
    e.preventDefault();

    try {
      await axios.post('/api/category', {
        name: inputNameRef.current.value,
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
        onSubmit={createNewCategory}
      >
        {/* Name */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='name'>
            <span className='label-text'>Category Name</span>
            {/* <span className='label-text-alt'>Alt label</span> */}
          </label>
          <input
            id='name'
            type='text'
            placeholder='Enter category name'
            className='input input-bordered w-full max-w-xs'
            ref={inputNameRef}
          />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default CreateProduct;
