import Head from 'next/head';
import Image from 'next/image';
import Products from '../components/home/Products';

export default function Home() {
  return (
    <div className=''>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Products />
    </div>
  );
}
