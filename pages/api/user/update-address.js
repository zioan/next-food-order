import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const name = req.body.name;
  const address = req.body.address;

  //************* */
  // protected router
  const session = await getSession({ req: req });
  console.log(session); // read information stored in token about the user

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }
  //************* */

  console.log('session: ', session);
  console.log('session-user-data: ', session.user);

  const userEmail = session.user.email; //read data stored in token

  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        name: name,
        address: address,
      },
    }
  );

  client.close();
  res.status(200).json({ message: 'Address updated!' });
}

export default handler;
