import { connectToDatabase, deleteDocument } from '../../../lib/db';

async function handler(req, res) {
  // Delete category
  if (req.method === 'DELETE') {
    const selectedCategory = req.query.categoryName;
    console.log('id is: ', selectedCategory);

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      await deleteDocument(client, 'category', selectedCategory);
      client.close();
    } catch (error) {
      res.status(500).json({ message: error });
    }
    res.status(200).json({ message: 'Successfuly deleted' });
  }
}

export default handler;
