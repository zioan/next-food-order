import {
  connectToDatabase,
  getSpecificListOfDocuments,
  getAllDocuments,
  insertDocument,
  insertArray,
  updateDocument,
} from '../../../lib/db';

async function handler(req, res) {
  const userId = req.query.userId;

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
  } catch (error) {
    res.status(500).json({ message: error });
  }
  res.status(200).json({ message: 'Orders successfully fetched' });
}

export default handler;
