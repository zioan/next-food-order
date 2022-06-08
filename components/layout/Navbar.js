import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineClose } from 'react-icons/ai';

function Navbar() {
  const [togglerNav, setTogglerNav] = useState(false);
  const { session, status } = useSession();

  const clickHandler = () => {
    setTogglerNav(!togglerNav);
  };

  function logOutHandler() {
    signOut();
  }

  return (
    <nav className=' h-auto md:h-24 p-2 shadow-xl'>
      <div className=' max-w-6xl  flex justify-between md:items-center mx-auto mt-8 '>
        <Link href='/'>logo</Link>
        <div
          className={
            togglerNav ? 'flex flex-col gap-4 md:inline' : 'hidden md:inline'
          }
        >
          <Link href='/'>
            <a className='nav-link'>Home</a>
          </Link>
          <Link href='/about'>
            <a className='nav-link'>About</a>
          </Link>
          {session && (
            <Link href='/auth'>
              <a className='nav-link'>Auth</a>
            </Link>
          )}

          {status === 'unauthenticated' && (
            <Link href='/auth'>
              <a className='nav-link'>Login</a>
            </Link>
          )}

          {status === 'authenticated' && (
            <Link href='/profile'>
              <a className='nav-link'>Profile</a>
            </Link>
          )}

          {status === 'authenticated' && (
            <button onClick={logOutHandler}>Logout</button>
          )}
        </div>
        <button
          className=' inline md:hidden self-start nav-link'
          onClick={clickHandler}
        >
          {togglerNav ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
