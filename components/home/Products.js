import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import ProductContext from '../../context/ProductContext';
import CategoryContext from '../../context/CategoryContext';
import { BsCart3 } from 'react-icons/bs';
import OrderContext from '../../context/OrderContext';

function Products() {
  const { categories } = useContext(CategoryContext);
  const { products } = useContext(ProductContext);
  const { orderList, addToOrder, removeFromOrder } = useContext(OrderContext);

  function addToCartHandler(item) {
    addToOrder(item);
  }

  function removeFromCartHandler(item) {
    removeFromOrder(item);
  }
  return (
    <section className=' mt-6 flex flex-col lg:flex-row-reverse gap-6 p-2 lg:p-0 '>
      <div>
        {orderList.length > 0 && (
          <div className=' bg-red-600 border-4 min-w-[400px]'>
            {orderList &&
              orderList.map((item) => {
                return (
                  <div key={item._id}>
                    <p
                      className=' cursor-pointer'
                      onClick={() => removeFromOrder(item)}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className=' flex-1'>
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
                        <div className='flex items-center justify-between border-2'>
                          <div className='flex gap-4'>
                            <h3 className=' font-bold'>{product.name}</h3>
                            <p>{product.description}</p>
                          </div>
                          <div className='flex gap-4'>
                            <p>{product.category}</p>
                            <p className=' font-bold'>&euro; {product.price}</p>
                            <p>
                              <BsCart3
                                size={20}
                                className=' cursor-pointer'
                                onClick={() => addToCartHandler(product)}
                              />
                            </p>
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
      </div>
    </section>
  );
}

export default Products;
