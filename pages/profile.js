import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import UserProfile from '../components/profile/UserProfile';

function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace('/');
      }
    });
  }, [router]);

  return <UserProfile />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         // notFound: true //404 page
//         destination: '/auth',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default ProfilePage;
