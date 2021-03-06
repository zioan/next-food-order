import { useContext, useState } from 'react';
import CourierContext from '../../../context/CourierContext';
import axios from 'axios';
import OrderContext from '../../../context/OrderContext';

// change order status and asign a courier for delivery
function ProcessOrder({ order }) {
  const [selectedCourier, setSelectedCourier] = useState();
  const { courierList } = useContext(CourierContext);
  const { getAllOrders } = useContext(OrderContext);

  async function updateOrderStatusHandler() {
    if (!selectedCourier) return;

    const courier = courierList.find(
      (courier) => courier.name === selectedCourier
    );
    const data = {
      courierName: courier.name,
      courierId: courier._id,
      status: 'ready for delivery',
    };
    const response = await axios
      .patch(`/api/orders/update-status/${order._id}`, data)
      .then(() => getAllOrders());
  }

  return (
    <>
      {order.status === 'pending' && (
        <div className=' flex flex-col gap-2 mt-2'>
          <select
            className='select select-bordered w-full max-w-xs'
            id='courier'
            value={selectedCourier}
            onChange={(e) => setSelectedCourier(e.target.value)}
          >
            <option value=''>Select Courier</option>

            {courierList.length > 0 &&
              courierList.map((courier) => {
                return <option key={courier._id}>{courier.name}</option>;
              })}
          </select>
          <div
            className='tooltip tooltip-bottom'
            data-tip='select a courier first'
          >
            <button className=' btn' onClick={updateOrderStatusHandler}>
              For Delivery
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProcessOrder;
