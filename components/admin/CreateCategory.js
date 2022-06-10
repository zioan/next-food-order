import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UploadForm from '../../components/admin/UploadForm';

function CreateProduct() {
  const [categoryName, setCategoryName] = useState('');
  const [imageName, setImageName] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // After 3 seconds hide success message
    const timeId = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showSuccessMessage]);

  async function createNewCategory(e) {
    e.preventDefault();
    if (!categoryName || !imageName) return;

    try {
      await axios
        .post('/api/category', {
          name: categoryName,
          imageName: imageName,
        })
        .then(() => {
          //reset everything in CreateCategory and UploadForm
          setImageName('');
          setIsImageUploaded(false);
          setCategoryName('');
          setShowSuccessMessage(true);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // get image filename from UploadForm
  function imageNameHandler(imgName) {
    setImageName(imgName);
  }

  // check if image is uploaded (true/false) in UploadForm
  function isImageUploadedHandler(status) {
    setIsImageUploaded(status);
  }

  return (
    <>
      <h2>Create Product</h2>
      <UploadForm
        imageNameHandler={imageNameHandler}
        isImageUploadedHandler={isImageUploadedHandler}
      />
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <label className='label' htmlFor='name'>
          {/* <span className='label-text'>Category Name</span> */}
          <span className='label-text-alt'>* first uplod image </span>
        </label>
        <div
          className='tooltip'
          data-tip={
            isImageUploaded && categoryName
              ? 'save new category'
              : 'first upload image & enter name'
          }
        >
          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
      </form>
      <hr className=' mt-2 bm-2' />
      {showSuccessMessage && <p className=' text-red-500'>Category created!</p>}
    </>
  );
}

export default CreateProduct;
