import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token.isCourier = user.isCourier;
        token.isCustomer = user.isCustomer;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.email = token.email;
        session.isAdmin = token.isAdmin;
        session.isCourier = token.isCourier;
        session.isCustomer = token.isCustomer;
      }
      return session;
    },
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

        return user;
      },
    }),
  ],
});
