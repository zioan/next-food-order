import { useState } from 'react';
import Image from 'next/image';

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append('file', image);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body,
    });
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
        <button
          className={image ? 'btn ml-2' : 'btn-disabled ml-2'}
          type='submit'
          onClick={uploadToServer}
        >
          Upload image
        </button>
      </div>
    </div>
  );
}
