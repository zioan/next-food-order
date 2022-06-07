import React from 'react';
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div>
            <h3>SOCIAL</h3>

            <a
              href='https://www.linkedin.com/in/ioan-zaharia-917a341a0/'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedinIn
                size={20}
                style={{ color: '#d3d3d3', marginRight: '10px' }}
              />
            </a>
            <a
              href='https://twitter.com/IoanZaharia86'
              target='_blank'
              rel='noreferrer'
            >
              <FaTwitter
                size={20}
                style={{ color: '#d3d3d3', marginRight: '10px' }}
              />
            </a>
          </div>
        </div>
        <div className='line'></div>
        <p className='copyright'>
          &copy;Copyright {year}. Made by{' '}
          <a href='https://www.ioanzaharia.com/'>Ioan Zaharia</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
