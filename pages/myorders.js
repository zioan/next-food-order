import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toDecimal from '../lib/toDecimal';

function MyOrders() {
  const { data: session, status } = useSession();
  const [userOrders, setUserOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace('/');
      }
    });
  }, [router]);

  const customerId = session?.id;

  async function getUserOrders() {
    const userOrders = await axios.get(`/api/orders/${customerId}`);
    setUserOrders(userOrders.data.orders);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  function getReadableDate(date) {
    const readableDate = new Date(date).toLocaleDateString('en-EN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return readableDate;
  }

  return (
    <>
      <h2 className=' font-bold text-2xl text-center mt-6 mb-10'>My orders</h2>
      <div className=' flex gap-6  justify-center flex-wrap m-2'>
        {userOrders.length > 0 &&
          userOrders.map((order) => {
            return (
              <div key={order._id} className='custom-shadow w-[450px] p-4'>
                {/* Header with delivery details, price and status  */}
                <div className='flex justify-between'>
                  <div>
                    <p>
                      <span className=' font-bold'>Ordered on: </span>
                      {getReadableDate(order.orderDate)}
                    </p>
                    <span className=' font-bold'>Delivered to: </span>
                    <p>{order.customerName}</p>
                    <p>{order.customerAddress}</p>
                  </div>
                  <div className=' self-center'>
                    <p className=' font-bold'>Status: {order.status}</p>
                    <p className=' font-bold'>
                      Total: &euro;{toDecimal(order.totalPrice)}
                    </p>
                  </div>
                </div>

                <h2 className=' font-bold mt-4'>Products ordered:</h2>

                {/* Items ordered list */}
                <div>
                  {order.order.map((item) => {
                    return (
                      <div key={item._id} className=''>
                        <p>
                          {item.name}
                          <span className='font-bold text-xl'> - </span>
                          {item.description}
                        </p>
                        <p>
                          Quantity: {item.quantityOrdered}
                          <span className='font-bold text-xl'> - </span>
                          Subtotal: &euro;
                          {toDecimal(item.totalPrice)}
                        </p>
                        <hr className=' my-2' />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default MyOrders;
