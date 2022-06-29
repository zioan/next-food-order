import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

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

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //optional add validation

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log('logged in: ', result); // object

      if (!result.error) {
        router.replace('/'); //redirect after authentication is successfully
      }
    } else {
      //register new user
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className='flex flex-col items-center '>
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
