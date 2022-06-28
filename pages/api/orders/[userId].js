import { connectToDatabase, getSpecificListOfDocuments } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'GET') {
    const userId = req.query.userId;

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      const result = await getSpecificListOfDocuments(client, 'orders', userId);
      console.log('result: ', result);
      client.close();
      res.status(200).json({ orders: result });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default handler;
