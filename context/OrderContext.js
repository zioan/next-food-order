import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [finalOrderList, setFinalOrderList] = useState([]);

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
    if (finalOrderList.length === 0) {
      setFinalOrderList([item]);
      console.log('final order: ', finalOrderList);
    } else {
      for (let j = 0; j < finalOrderList.length; j++) {
        if (finalOrderList[j]._id === item._id) {
          // finalOrderList[j] = item;
          console.log('already in: ', item);
          console.log('final order: ', finalOrderList);
          return;
        } else {
          console.log('not already in');
          setFinalOrderList((prevState) => [...prevState, item]);
          console.log('final order: ', finalOrderList);
        }
      }
    }

    console.log('final order: ', finalOrderList);
  }

  return (
    <OrderContext.Provider
      value={{
        orderList,
        addToOrder,
        removeFromOrder,
        addItemsToFinalOrderList,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
