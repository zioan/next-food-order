import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import OrderContext from '../../../context/OrderContext';

function DeliveryAddress() {
  const {
    createAuthenticatedCustomerData,
    createGuestCustomerData,
    allowOrderHandler,
    allowOrder,
  } = useContext(OrderContext);
  const { data: session, status } = useSession();
  const [customerStatus, setCustomerStatus] = useState('');

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');

  // Check if authenticated user && user name and address
  useEffect(() => {
    if (status === 'unauthenticated') {
      setCustomerStatus('unauthenticated');
    } else if (
      status === 'authenticated' &&
      (session.name === '' || session.address === '')
    ) {
      setCustomerStatus('customerWithoutNameAndAddress');
    } else {
      setCustomerStatus('customerCanOrder');
      allowOrderHandler(true);
    }
  }, []);

  useEffect(() => {
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
    ) {
      allowOrderHandler(false);
      return;
    }

    const guestName = name;
    const address = `${street} ${houseNumber}, ${zip} ${city}`;
    allowOrderHandler(true);

    createGuestCustomerData(guestName, address);
  }, [name, street, houseNumber, zip, city]);

  async function waitForSession() {
    const handler = await session?.name;
    if (handler) {
      createAuthenticatedCustomerData();
    }
  }

  useEffect(() => {
    waitForSession();
  }, [session]);

  return (
    <>
      {/* Authenticated customer with personal details updated */}
      {customerStatus === 'customerCanOrder' && (
        <h2 className=' text-center my-4 font-bold'>DeliveryAddress</h2>
      )}

      {/* Not authenticated customer must provide name and address on order */}
      {customerStatus === 'unauthenticated' && (
        <div className=' flex flex-col items-center'>
          <div
            className='tooltip'
            data-tip='Registered users can order faster!'
          >
            <Link href='/auth'>
              <a className='btn btn-accent my-4'>Login or Register here</a>
            </Link>
          </div>
          <div className='divider'>OR</div>

          {/* Unregistered customer name and address */}
          <form
            className=' flex flex-col gap-8 w-[320px] mx-auto'
            // onSubmit={updateUserAddress}
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

            {/* <div className='tooltip' data-tip='all fields are required'>
              <button className=' btn' type='submit'>
                Update Address
              </button>
            </div> */}
          </form>
        </div>
      )}

      {/* Authenticated customer with NO personal details */}
      {customerStatus === 'customerWithoutNameAndAddress' && (
        <p className=' text-red-600 font-bold'>
          Please update your name and address before placing an order!
        </p>
      )}

      {customerStatus === 'customerCanOrder' && (
        <>
          <p>
            <span className=' font-bold'>Delivery to: </span>
            {session.name}
          </p>
          <p>
            <span className=' font-bold'>Address: </span>
            {session.address}
          </p>
        </>
      )}
    </>
  );
}

export default DeliveryAddress;
