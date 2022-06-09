import {
  connectToDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../lib/db';

async function handler(req, res) {
  // Get all products
  if (req.method === 'GET') {
    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }
    const products = await getAllDocuments(client, 'products');
    console.log(products);

    return res.status(200).json({ products: products });
  }

  // Create new product
  if (req.method === 'POST') {
    const product = {
      name: req.body.name,
      number: req.body.number,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
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
      const result = await insertDocument(client, 'products', product);
      console.log('result: ', result);
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Product added!' });
  }
}

export default handler;
