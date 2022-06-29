import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

import { AiOutlineClose } from 'react-icons/ai';

function Navbar() {
  const [togglerNav, setTogglerNav] = useState(false);
  const { data: session, status } = useSession();

  const clickHandler = () => {
    setTogglerNav(!togglerNav);
  };

  function logOutHandler() {
    signOut();
  }

  return (
    <nav className=' h-auto md:h-auto shadow-xl p-6 md:p-2'>
      <div className=' max-w-6xl  flex justify-between md:items-center mx-auto '>
        <div>
          <Link href='/'>
            <a className={togglerNav ? 'hidden' : 'text-xl font-bold'}>
              Food Online
            </a>
          </Link>
        </div>
        <div
          className={
            togglerNav
              ? 'flex flex-col gap-4 md:inline ml-4'
              : 'hidden md:inline'
          }
        >
          <Link href='/'>
            <a
              className='nav-link2 text-center'
              onClick={() => setTogglerNav(false)}
            >
              Home
            </a>
          </Link>

          {status === 'unauthenticated' && (
            <Link href='/auth'>
              <a
                className='nav-link2 text-center'
                onClick={() => setTogglerNav(false)}
              >
                Login
              </a>
            </Link>
          )}

          {status === 'authenticated' && (
            <Link href='/profile'>
              <a
                className='nav-link2 text-center'
                onClick={() => setTogglerNav(false)}
              >
                Profile
              </a>
            </Link>
          )}

          {status === 'authenticated' && (
            <Link href='/myorders'>
              <a
                className='nav-link2 text-center'
                onClick={() => setTogglerNav(false)}
              >
                My Orders
              </a>
            </Link>
          )}

          {session?.isAdmin && (
            <Link href='/admin'>
              <a
                className='nav-link2 text-center'
                onClick={() => setTogglerNav(false)}
              >
                Admin Page
              </a>
            </Link>
          )}

          {session?.isCourier && (
            <Link href='/orders'>
              <a
                className='nav-link2 text-center'
                onClick={() => setTogglerNav(false)}
              >
                Orders
              </a>
            </Link>
          )}

          {status === 'authenticated' && (
            <a
              onClick={() => {
                logOutHandler();
                setTogglerNav(false);
              }}
              className='nav-link2 text-center'
            >
              Logout
            </a>
          )}
        </div>
        <button
          className=' inline md:hidden self-start '
          onClick={clickHandler}
        >
          {togglerNav ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
