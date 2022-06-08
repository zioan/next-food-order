import { getSession } from 'next-auth/react';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

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

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const isCurrentPasswordValid = await verifyPassword(
    oldPassword,
    currentPassword
  );

  if (!isCurrentPasswordValid) {
    res
      .status(422)
      .json({ message: 'Your old password is invalid, try again!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
