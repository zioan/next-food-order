import { createContext, useState } from 'react';
import axios from 'axios';

const CourierContext = createContext();

export const CourierProvider = ({ children }) => {
  const [courierList, setCourierList] = useState([]);

  async function getCouriers() {
    const couriers = await axios.get('/api/couriers');
    setCourierList(couriers.data.couriers);
    console.log('Couriers: ', couriers.data.couriers);
  }

  return (
    <CourierContext.Provider
      value={{
        courierList,
        getCouriers,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};

export default CourierContext;
