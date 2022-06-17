import {
  connectToDatabase,
  getAllDocuments,
  insertDocument,
  insertArray,
  updateDocument,
} from '../../../lib/db';

async function handler(req, res) {
  // Get all orders
  if (req.method === 'GET') {
    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }
    const orders = await getAllDocuments(client, 'orders');
    console.log(orders);

    return res.status(200).json({ orders: orders });
  }

  // Create new order
  if (req.method === 'POST') {
    const order = req.body.order;
    const userId = req.body.userId;
    const status = req.body.status;
    const totalPrice = req.body.totalPrice;
    const totalItems = req.body.totalItems;

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      const result = await insertDocument(client, 'orders', {
        userId,
        status,
        totalPrice,
        totalItems,
        order,
      });
      console.log('result: ', result);
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Product added!' });
  }

  // Update order
  if (req.method === 'PATCH') {
    const order = req.body.order;
    console.log('updated order: ', order);

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      const result = await updateDocument(client, 'orders', order._id, order);
      console.log('result: ', result);
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Order placed!' });
  }
}

export default handler;
