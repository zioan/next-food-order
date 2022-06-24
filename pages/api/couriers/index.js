import { connectToDatabase, getCouriersList } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'GET') {
    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    let couriers;
    try {
      couriers = await getCouriersList(client, 'users');
      client.close();
    } catch (error) {
      console.log(error);
    }
    console.log(couriers);

    return res.status(200).json({ couriers: couriers });
  }
}

export default handler;
