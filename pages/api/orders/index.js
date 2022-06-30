import {
  connectToDatabase,
  getAllDocuments,
  insertDocument,
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

    let orders;
    try {
      orders = await getAllDocuments(client, 'orders');
      client.close();
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json({ orders: orders });
  }

  // Create new order
  if (req.method === 'POST') {
    const order = req.body.order;
    const userId = req.body.userId;
    const status = req.body.status;
    const orderDate = req.body.orderDate;
    const customerName = req.body.customerName;
    const customerAddress = req.body.customerAddress;
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
        orderDate,
        customerName,
        customerAddress,
        totalPrice,
        totalItems,
        order,
      });
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Product added!' });
  }

  // Update order
  if (req.method === 'PATCH') {
    const order = req.body.order;

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
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Order placed!' });
  }
}

export default handler;
