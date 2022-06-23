import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [allOrders, setAllOrders] = useState([]);

  async function getAllOrders() {
    const orders = await axios.get(`/api/orders`);
    setAllOrders(orders.data.orders);
    console.log(orders.data.orders);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <h2>Order</h2>
    </>
  );
}

export default Orders;
