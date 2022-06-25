import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import CourierContext from '../../../context/CourierContext';
import axios from 'axios';

function ProcessOrder({ order }) {
  const [selectedCourier, setSelectedCourier] = useState();
  const { courierList } = useContext(CourierContext);
  const { data: session, status } = useSession();

  async function updateOrderStatusHandler() {
    const data = {
      // Courier detail must be fixed
      courierName: selectedCourier.name,
      courierId: selectedCourier._id,
      status: 'ready for delivery',
    };
    const response = await axios.patch(
      `/api/orders/update-status/${order._id}`,
      data
    );
    console.log(response.data);
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
          <button className=' btn' onClick={updateOrderStatusHandler}>
            For Delivery
          </button>
        </div>
      )}
    </>
  );
}

export default ProcessOrder;
