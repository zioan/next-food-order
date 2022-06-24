import { useContext, useState } from 'react';
import CourierContext from '../../../context/CourierContext';

function ProcessOrder({ order }) {
  const [selectedCourier, setSelectedCourier] = useState();
  const { courierList } = useContext(CourierContext);
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
          <button className=' btn'>For Delivery</button>
        </div>
      )}
    </>
  );
}

export default ProcessOrder;
