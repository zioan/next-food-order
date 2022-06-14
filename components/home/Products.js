import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import ProductContext from '../../context/ProductContext';
import CategoryContext from '../../context/CategoryContext';

function Products() {
  const { categories } = useContext(CategoryContext);
  const { products } = useContext(ProductContext);

  const drinksProducts = products.filter(
    (product) => product.category === 'Drinks'
  );

  return (
    <section className=' mt-6'>
      {categories.map((category) => {
        return (
          <div className='mb-6' key={category._id}>
            <div className=' w-[200px] h-auto mx-auto'>
              <Image
                src={`/uploads/${category.image}`}
                alt={category.name}
                width={100}
                height={100}
                layout='responsive'
                objectFit='contain'
                priority={true}
              />
            </div>
            {/* <h3>{category.name}</h3> */}
            <ul className='flex flex-col gap-4'>
              {products.map((product) => {
                return (
                  <li key={product._id}>
                    {product.category === category.name && (
                      <div className='flex items-center justify-between cursor-pointer border-2'>
                        <div className='flex gap-4'>
                          <h3 className=' font-bold'>{product.name}</h3>
                          <p>{product.description}</p>
                        </div>
                        <div className='flex gap-4'>
                          <p>{product.category}</p>
                          <p className=' font-bold'>&euro; {product.price}</p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

export default Products;
