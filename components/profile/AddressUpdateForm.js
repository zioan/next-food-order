import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

function AddressUpdateForm() {
  const { data: session, status } = useSession();
  const [name, setName] = useState(session.user.name);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');

  console.log(session);

  async function updateUserAddress(e) {
    e.preventDefault();
    if (
      !name ||
      name.trim() === '' ||
      !street ||
      street.trim() === '' ||
      !houseNumber ||
      houseNumber.trim() === '' ||
      !zip ||
      zip.trim() === '' ||
      !city ||
      city.trim() === ''
    )
      return;

    const address = `${street} ${houseNumber}, ${zip} ${city}`;

    try {
      await axios
        .patch('/api/user/update-address', {
          name: name,
          address: address,
        })
        .then(() => {
          console.log('Address updated!');
          signOut();
          // setName('');
          // setNumber('');
          // setSelectedCategory('');
          // setDescription('');
          // setPrice('');
          // getProducts();
          // notificationHandler();
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {session && (
        <p>
          {' '}
          <span className=' font-bold'>Name: </span> {session.name}
        </p>
      )}
      {session && (
        <p>
          <span className=' font-bold'>Current delivery address: </span>
          {session.address}
        </p>
      )}

      <p className=' text-xl font-bold text-center text-red-600 my-6'>
        After updating your data you are redirected to login page!
      </p>
      <form
        className=' flex flex-col gap-8 w-[320px] mx-auto'
        onSubmit={updateUserAddress}
      >
        {/* Name */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='name'>
            <span className='label-text'>Your name</span>
            <span className='label-text-alt'>*as on your door bell</span>
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

        {/* Street */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='street'>
            <span className='label-text'>Street name</span>
            {/* <span className='label-text-alt'>* product order reference</span> */}
          </label>
          <input
            id='street'
            type='text'
            placeholder='Enter your street name'
            className='input input-bordered w-full max-w-xs'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        {/* House Number */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='number'>
            <span className='label-text'>House number</span>
            <span className='label-text-alt'>* door number</span>
          </label>

          <input
            id='number'
            type='text'
            placeholder='Enter your house number'
            className='input input-bordered w-full max-w-xs'
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          />
        </div>

        {/* Zip code */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='code'>
            <span className='label-text'>Zip code</span>
            {/* <span className='label-text-alt'>* visible to clients</span> */}
          </label>
          <input
            id='code'
            type='text'
            placeholder='Enter your Zip code'
            className='input input-bordered w-full max-w-xs'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>

        {/* City */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='city'>
            <span className='label-text'>City</span>
            {/* <span className='label-text-alt'>* visible to clients</span> */}
          </label>
          <input
            id='city'
            placeholder='Enter your city'
            className='input input-bordered w-full max-w-xs'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className='tooltip' data-tip='all fields are required'>
          <button className=' btn' type='submit'>
            Update Address
          </button>
        </div>
      </form>
    </>
  );
}

export default AddressUpdateForm;
