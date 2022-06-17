import { useRef } from 'react';
import classes from './profile-form.module.css';

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
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          required
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input
          type='password'
          id='old-password'
          required
          ref={oldPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default PasswordUpdateForm;