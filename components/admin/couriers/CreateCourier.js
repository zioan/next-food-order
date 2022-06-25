import { useRef, useContext } from 'react';
import NotificationContext from '../../../context/NotificationContext';
import Notification from '../../ui/Notification';

async function createUser(email, password, isCourier) {
  const response = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, isCourier }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function CreateCourier() {
  const { showNotification, notificationHandler } =
    useContext(NotificationContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const isCourier = true;

    //optional add validation

    //register new user
    try {
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        isCourier
      ).then(() => {
        notificationHandler();
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className=' text-center text-xl underline mb-6'>
        Create new courier
      </h2>
      <h3 className=' text-center text-red-500 font-bold mb-6'>
        Courier must log in and update his name and address
        <br />
        after account is created!
      </h3>
      <form
        onSubmit={submitHandler}
        className=' flex flex-col gap-4 w-[320px] mx-auto'
      >
        <div className='form-control w-full max-w-xs'>
          <label htmlFor='email' className='label'>
            Courier Email
          </label>
          <input
            type='email'
            id='email'
            required
            className='input input-bordered w-full max-w-xs'
            ref={emailInputRef}
          />
        </div>
        <div className='form-control w-full max-w-xs'>
          <label htmlFor='password' className='label'>
            Courier Password
          </label>
          <input
            type='password'
            id='password'
            required
            className='input input-bordered w-full max-w-xs'
            ref={passwordInputRef}
          />
        </div>
        <div className=''>
          <button type='submit' className='btn'>
            Create Courier
          </button>
        </div>
      </form>
      {showNotification && (
        <Notification title='Courier account created successfully!' />
      )}
    </>
  );
}

export default CreateCourier;
