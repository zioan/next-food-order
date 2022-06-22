import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function MyOrders() {
  const { data: session, status } = useSession();
  const [userOrders, setUserOrders] = useState([]);

  const customerId = session?.id;

  async function getUserOrders() {
    const userOrders = await axios.get(`/api/orders/${customerId}`);
    setUserOrders(userOrders.data);
    console.log(userOrders.data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <h2>my orders</h2>
      {userOrders.length > 0 && (
        <>
          {userOrders.map((order) => {
            return (
              <div key={order._id}>
                <p>here is order</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default MyOrders;
