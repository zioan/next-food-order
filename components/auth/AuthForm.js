import { useState, useRef, useContext } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Notification from '../ui/Notification';
import NotificationContext from '../../context/NotificationContext';

async function createUser(email, password) {
  const response = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
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

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordVerifyInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const router = useRouter();

  const { showNotification, notificationHandler } =
    useContext(NotificationContext);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  // Regular Login / Register
  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredVerifiedPassword = passwordVerifyInputRef?.current?.value;

    //validation
    if (!isLogin && enteredPassword !== enteredVerifiedPassword) {
      setPasswordIsValid(false);
      notificationHandler();
      return;
    }

    if (!isLogin && enteredPassword === enteredVerifiedPassword) {
      setPasswordIsValid(true);
    }

    if (isLogin) {
      const result = await signIn('credentials', {
        // redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace('/'); //redirect after authentication is successfully
      }
    } else {
      //register new user
      try {
        const result = await createUser(enteredEmail, enteredPassword).then(
          () => {
            signIn('credentials', {
              // redirect: false,
              email: enteredEmail,
              password: enteredPassword,
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Demo accounts logic
  const testAccountCustomerLogin = async () => {
    const email = 'customer@test.com';
    const password = 'customer123123';
    try {
      await signIn('credentials', {
        // redirect: false,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const testAccountCourierLogin = async () => {
    const email = 'courier1@test.com';
    const password = 'courier1123123';
    try {
      await signIn('credentials', {
        // redirect: false,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const testAccountAdminLogin = async () => {
    const email = 'admin@test.com';
    const password = 'admin123123';
    try {
      await signIn('credentials', {
        // redirect: false,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className='flex flex-col items-center '>
      {/* Demo accounts login */}
      <div className=' my-6 text-lg leading-8'>
        {/* Admin */}
        <p>
          Click{' '}
          <span
            className=' underline font-bold cursor-pointer'
            onClick={testAccountAdminLogin}
          >
            Here
          </span>{' '}
          for Admin demo account
        </p>

        {/* Customer */}
        <p>
          Click{' '}
          <span
            className=' underline font-bold cursor-pointer'
            onClick={testAccountCustomerLogin}
          >
            Here
          </span>{' '}
          for Customer demo account
        </p>

        {/* Courier */}
        <p>
          Click{' '}
          <span
            className=' underline font-bold cursor-pointer'
            onClick={testAccountCourierLogin}
          >
            Here
          </span>{' '}
          for Courier demo account
        </p>
      </div>

      {/* Authentication form */}
      <form
        onSubmit={submitHandler}
        className=' flex flex-col gap-4 w-[320px] mx-auto items-center custom-shadow p-6'
      >
        <h1 className='text-xl font-bold '>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <div className='form-control w-full max-w-xs'>
          <label htmlFor='email' className='label'>
            Your Email
          </label>
          <input
            type='email'
            id='email'
            required
            ref={emailInputRef}
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='form-control w-full max-w-xs'>
          <label htmlFor='password' className='label'>
            Your Password
          </label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
            className='input input-bordered w-full max-w-xs'
          />
        </div>

        {!isLogin && (
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='password' className='label'>
              Verify Password
            </label>
            <input
              type='password'
              id='password'
              required
              ref={passwordVerifyInputRef}
              className='input input-bordered w-full max-w-xs'
            />
          </div>
        )}
        {!passwordIsValid && showNotification && (
          <Notification title='Password not match!' />
        )}
        <div className=' mt-2 flex flex-col items-center gap-4'>
          <button className='btn'>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type='button'
            className='underline'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
