import { createContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [finalOrderList, setFinalOrderList] = useState([]);
  const { data: session, status } = useSession();

  const [customerData, setCustomerData] = useState();
  const [guestCustomerData, setGuestCustomerData] = useState();

  if (session?.name && session?.address) {
    setCustomerData([{ name: session.name, address: session.address }]);
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

    console.log('final order: ', finalOrderList);
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
        totalPrice: orderTotalPrice,
        totalItems: totalItemInOrder,
        order: finalOrderList,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orderList,
        addToOrder,
        removeFromOrder,
        addItemsToFinalOrderList,
        removeItemFromFinalOrder,
        createGuestCustomerData, // ToDo connect customer address to order
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
