import { connectToDatabase, updateOrderStatus } from '../../../../lib/db';

async function handler(req, res) {
  if (req.method === 'PATCH') {
    const orderId = req.query.orderId;
    const data = req.body;
    console.log('data is: ', data);

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      const result = await updateOrderStatus(client, 'orders', orderId, data);
      console.log('result: ', result);
      client.close();
      res.status(200).json({ orders: result });
    } catch (error) {
      res.status(500).json({ result: result });
    }
  }
}

export default handler;
