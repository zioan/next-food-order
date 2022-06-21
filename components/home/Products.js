import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ProductContext from '../../context/ProductContext';
import CategoryContext from '../../context/CategoryContext';
import { BsCart3 } from 'react-icons/bs';
import OrderContext from '../../context/OrderContext';
import Cart from './components/Cart';
import DeliveryAddress from './components/DeliveryAddress';
import toDecimal from '../../lib/toDecimal';
import NotificationContext from '../../context/NotificationContext';
import Notification from '../ui/Notification';

function Products() {
  const { data: session, status } = useSession();
  const { categories } = useContext(CategoryContext);
  const { products } = useContext(ProductContext);
  const {
    orderList,
    totalOrderPreview,
    addToOrder,
    addItemsToFinalOrderList,
    placeOrder,
    allowOrder,
    clearOrderList,
  } = useContext(OrderContext);

  const { showNotification, notificationHandler } =
    useContext(NotificationContext);

  function addToCartHandler(item) {
    addToOrder(item);
  }

  function addItemToFinalOrder(item) {
    addItemsToFinalOrderList(item);
  }

  // console.log(session);
  return (
    <section className=' mt-6 flex flex-col lg:flex-row-reverse gap:6 lg:gap-20 p-2 lg:p-0 '>
      <div>
        <div className=' flex flex-col items-center'>
          <div className='min-w-[400px] mt-6'>
            <Image
              src={'/images/order.png'}
              alt='order'
              width='200px'
              height='90px'
              layout='responsive'
              objectFit='contain'
              priority='true'
            />
          </div>
          <p className=' text-xl font-bold'>Mo. - Fr. 10:00 - 22:00</p>
          <p className=' text-xl font-bold mb-4'>Sa. - Su. 11:00 - 23:00</p>
        </div>

        {/* Cart component */}
        {orderList.length > 0 && (
          <div className=' p-4 min-w-[400px] max-w-[400px] custom-shadow rounded-lg mt-6'>
            {orderList &&
              orderList.map((item) => {
                return (
                  <Cart
                    key={item._id}
                    item={item}
                    addItemToFinalOrder={addItemToFinalOrder}
                  />
                );
              })}

            {/* Total order */}
            {totalOrderPreview && (
              <p className=' font-bold text-right'>
                {' '}
                Total: &euro;{toDecimal(totalOrderPreview)}
              </p>
            )}

            {/* Customer address */}
            <DeliveryAddress />

            <div className=' flex flex-col items-center mt-4'>
              <button
                className={allowOrder ? 'btn' : 'btn btn-disabled'}
                onClick={() => {
                  placeOrder();
                  notificationHandler();
                  clearOrderList();
                }}
              >
                Send Order
              </button>
            </div>

            {/* Show notification */}
            {showNotification && (
              <Notification title='Thank you for your order!' />
            )}

            {/* Chef image at the bottom of cart component */}
            <div className='min-w-[400px] mt-6'>
              <Image
                src={'/images/Chef1.png'}
                alt='chef'
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='contain'
                priority='true'
              />
            </div>
          </div>
        )}
      </div>

      {/* Products */}
      <div className=' flex-1 '>
        {/* categories map */}
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

              {/* render products based on category */}
              <ul className='flex flex-col gap-4'>
                {products.map((product) => {
                  return (
                    <li key={product._id} className=' l'>
                      {product.category === category.name && (
                        <div className='flex items-center justify-between custom-shadow rounded-lg px-6 py-2 '>
                          <div className='flex gap-4'>
                            <h3 className=' font-bold'>{product.name}</h3>
                            <p>{product.description}</p>
                          </div>
                          <div className='flex gap-4'>
                            <p>{product.category}</p>
                            <p className=' font-bold'>
                              &euro; {toDecimal(product.price)}
                            </p>
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
