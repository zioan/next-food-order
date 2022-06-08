import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  //client-side redirect
  // if user is already logged in, redirect to another page
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        // window.location.href = '/'
        console.log(session);
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
