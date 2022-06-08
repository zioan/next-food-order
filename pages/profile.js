import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/UserProfile';

function ProfilePage() {
  return <UserProfile />;
}

//server-side page guards
// allows access to a page (component) if user is authenticated
// without loading the initial page (no more short flash on loading)
export async function getServerSideProps(context) {
  //check cookie if user is authenticated
  // if no authenticated user, session will be null
  // else it will be an object with session data
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        // notFound: true //404 page
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
