import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);

  function addToOrder(item) {
    if (orderList.includes(item)) return;

    setOrderList((prevState) => [...prevState, item]);
    console.log(orderList);
  }

  function removeFromOrder(item) {
    const remainingItems = orderList.filter(
      (product) => product._id !== item._id
    );
    setOrderList(remainingItems);
  }

  return (
    <OrderContext.Provider
      value={{
        orderList,
        addToOrder,
        removeFromOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
