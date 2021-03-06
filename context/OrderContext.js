import { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const [orderList, setOrderList] = useState([]);
  const [finalOrderList, setFinalOrderList] = useState([]);
  const { data: session, status } = useSession();

  const [customerData, setCustomerData] = useState();
  const [guestCustomerData, setGuestCustomerData] = useState();
  const [allowOrder, setAllowOrder] = useState(false);

  const [totalOrderPreview, setTotalOrderPreview] = useState();

  async function getAllOrders() {
    const orders = await axios.get(`/api/orders`);
    setOrders(orders.data.orders);

    getPendingOrders();
    getOrdersForDelivery();
    getDeliveredOrders();
  }

  function getPendingOrders() {
    const pending = orders.filter((item) => item.status === 'pending');
    setPendingOrders(pending);
  }

  function getOrdersForDelivery() {
    const forDelivery = orders.filter(
      (item) => item.status === 'ready for delivery'
    );
    setCompletedOrders(forDelivery);
  }

  function getDeliveredOrders() {
    const delivered = orders.filter((item) => item.status === 'delivered');
    setDeliveredOrders(delivered);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  // calculate order total price (for frontend)
  useEffect(() => {
    if (finalOrderList.length === 0) {
      setTotalOrderPreview(0);
    } else if (finalOrderList.length === 1) {
      setTotalOrderPreview(finalOrderList[0].totalPrice);
    } else {
      const total = finalOrderList
        .map((item) => item.totalPrice)
        .reduce((prev, next) => prev + next);
      setTotalOrderPreview(total);
    }
  }, [finalOrderList]);

  function allowOrderHandler(status) {
    setAllowOrder(status);
  }

  function createAuthenticatedCustomerData() {
    setCustomerData([{ name: session.name, address: session.address }]);
    setAllowOrder(true);
  }

  function createGuestCustomerData(name, address) {
    setGuestCustomerData([{ name: name, address: address }]);
  }

  function addToOrder(item) {
    if (orderList.includes(item)) return;

    setOrderList((prevState) => [...prevState, item]);
  }

  function removeFromOrder(item) {
    const remainingItems = orderList.filter(
      (product) => product._id !== item._id
    );
    setOrderList(remainingItems);
  }

  function addItemsToFinalOrderList(item) {
    // remove item if duplicate item in list
    const newOrderList = finalOrderList.filter(
      (product) => product._id !== item._id
    );

    // add product to list
    setFinalOrderList([...newOrderList, item]);
  }

  function removeItemFromFinalOrder(item) {
    const newOrderList = finalOrderList.filter(
      (product) => product._id !== item._id
    );
    setFinalOrderList([...newOrderList]);
  }

  function placeOrder() {
    const userId = session?.id ? session.id : 'Not authenticated';

    const orderTotalPrice = finalOrderList
      .map((item) => item.totalPrice)
      .reduce((prev, next) => prev + next);

    const totalItemInOrder = finalOrderList
      .map((item) => item.quantityOrdered)
      .reduce((prev, next) => prev + next);

    try {
      axios.post('/api/orders', {
        userId: userId,
        status: 'pending',
        orderDate: new Date(),
        customerName: customerData
          ? customerData[0].name
          : guestCustomerData[0].name,
        customerAddress: customerData
          ? customerData[0].address
          : guestCustomerData[0].address,
        totalPrice: orderTotalPrice,
        totalItems: totalItemInOrder,
        order: finalOrderList,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // clear entire order state in 3 second after order submited
  function clearOrderList() {
    setTimeout(() => {
      setOrderList([]);
      setTotalOrderPreview();
      setFinalOrderList([]);
      getAllOrders();
    }, 3000);
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        getAllOrders,
        getPendingOrders,
        pendingOrders,
        getOrdersForDelivery,
        completedOrders,
        getDeliveredOrders,
        deliveredOrders,
        orderList,
        totalOrderPreview,
        addToOrder,
        removeFromOrder,
        addItemsToFinalOrderList,
        removeItemFromFinalOrder,
        createAuthenticatedCustomerData,
        createGuestCustomerData,
        allowOrderHandler,
        allowOrder,
        placeOrder,
        clearOrderList,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
