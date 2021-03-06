import {
  connectToDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../lib/db';

async function handler(req, res) {
  // Get all categories
  if (req.method === 'GET') {
    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }
    const categories = await getAllDocuments(client, 'category');
    client.close();

    return res.status(200).json({ categories: categories });
  }

  // Create new category
  if (req.method === 'POST') {
    const category = {
      name: req.body.name,
      image: req.body.imageName,
    };

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      const result = await insertDocument(client, 'category', category);
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Category added!' });
  }
}

export default handler;
