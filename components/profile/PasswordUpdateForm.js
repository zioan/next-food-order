import { useRef } from 'react';
// import classes from './profile-form.module.css';

function PasswordUpdateForm(props) {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;
    const enteredOldPassword = oldPasswordRef.current.value;

    //validation ...

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form
      className=' flex flex-col gap-4 w-[320px] mx-auto items-center'
      onSubmit={submitHandler}
    >
      <div className='form-control w-full max-w-xs'>
        <label htmlFor='new-password' className='label'>
          New Password
        </label>
        <input
          type='password'
          id='new-password'
          className='input input-bordered w-full max-w-xs'
          required
          ref={newPasswordRef}
        />
      </div>
      <div className='form-control w-full max-w-xs'>
        <label htmlFor='old-password' className='label'>
          Old Password
        </label>
        <input
          type='password'
          id='old-password'
          className='input input-bordered w-full max-w-xs'
          required
          ref={oldPasswordRef}
        />
      </div>
      <div className=''>
        <button className='btn'>Change Password</button>
      </div>
    </form>
  );
}

export default PasswordUpdateForm;
