import { useEffect } from 'react';
import InputField from './ui/InputField';

function CreateProduct() {
  let testValue;

  useEffect(() => {
    console.log(testValue);
  }, [testValue]);

  return (
    <>
      <h2>Create Product</h2>
      <form className=' flex flex-col gap-8 '>
        <div className='form-control'>
          <label className='input-group input-group-sm'>
            <span>Title</span>
            <input
              type='text'
              placeholder='Product Title'
              className='input input-bordered input-sm w-full'
            />
          </label>
        </div>
        <div className='form-control flex-1'>
          <label className='input-group input-group-sm w-full'>
            <span>Number</span>
            <input
              type='text'
              placeholder='Product Unique Number'
              className='input input-bordered input-sm'
            />
          </label>
        </div>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
        />

        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>ProductName</span>
            <span className='label-text-alt'>Alt label</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <hr />
        <InputField
          lebel='test label'
          type='text'
          placeholder='Test label placeholder'
          inputValue=
        />
      </form>
    </>
  );
}

export default CreateProduct;
