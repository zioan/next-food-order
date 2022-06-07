import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();

          // by default NextAuth redirect to another page if an error is throw
          // this can be handled in signId built in function
          // see auth-form.js "redirect: false"
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in! Password incorrect!');
        }

        client.close();

        //This return means to NextAuth that the authorization succeeded
        // return an object that will be included in JSON Web Token
        return { email: user.email, password: user.password };
      },
    }),
  ],
});
