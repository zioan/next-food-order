import { useState } from 'react';
import Image from 'next/image';

// upload image form
export default function PrivatePage({
  imageNameHandler, //send image name to parent component
  isImageUploadedHandler, //check if image is uploaded and send boolean to parent c.
}) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      // console.log('file is: ', i.name);
      imageNameHandler(i.name);

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    if (!createObjectURL) return;

    const body = new FormData();
    // console.log("file", image)
    body.append('file', image);

    try {
      await fetch('/api/image/upload', {
        method: 'POST',
        body,
      });

      isImageUploadedHandler(true);
    } catch (error) {
      console.log(error);
      isImageUploadedHandler(false);
    }
  };

  return (
    <div>
      <div>
        <div className=' max-w-[200px]'>
          {createObjectURL && (
            <Image
              src={createObjectURL}
              alt='uploaded image'
              width='100%'
              height='100%'
              layout='responsive'
              objectFit='contain'
            />
          )}
        </div>
        <h4>Select Image</h4>
        <input type='file' name='myImage' onChange={uploadToClient} />
        <div
          className='tooltip'
          data-tip={image ? 'click to upload' : 'select an image first'}
        >
          <button className='btn ml-2' type='submit' onClick={uploadToServer}>
            Upload image
          </button>
        </div>
      </div>
    </div>
  );
}
