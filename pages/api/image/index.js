// import {
//   connectToDatabase,
//   getAllDocuments,
//   insertDocument,
// } from '../../../lib/db';

// export default async function handler(req, res) {

//   if (req.method === 'GET') {
//     let client;

//     try {
//       client = await connectToDatabase();
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: 'Connecting to the database failed!' });
//     }
//     const products = await getAllDocuments(client, 'products');
//     console.log(products);

//     return res.status(200).json({ products: products });
//   }
// }
