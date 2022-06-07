import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import classes from './auth-form.module.css';
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
      //log user in

      // 'signIn' is built in NextAuth function
      // no method must be mentioned, is handled automaticaly
      // this 'result' will never be rejected
      // 'result' returns an object
      // if there is an error, error key will contain the error message
      // if error is null, the authentication is successful
      const result = await signIn('credentials', {
        redirect: false, // not allow NextAuth to redirect to an error page if an error occurs
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log('logged in: ', result); // object

      // auth successfuly
      // cookies are set automatically
      // tokens are generated and used automatically
      if (!result.error) {
        //set some auth state, redirect, etc
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
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
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
