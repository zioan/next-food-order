import React from 'react';

const Footer = () => {
  const footerYear = new Date().getFullYear();

  return (
    <footer className=' p-6 mt-6 text-center border-t-2'>
      <p>
        Copyright &copy; {footerYear}. Made by{' '}
        <a className=' underline' href='https://ioanzaharia.com' target='blank'>
          Ioan Zaharia
        </a>
      </p>
    </footer>
  );
};

export default Footer;
