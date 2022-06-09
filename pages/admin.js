import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CreateProduct from '../components/admin/CreateProduct';
import CreateCategory from '../components/admin/CreateCategory';

function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace('/');
      }
    });
  }, [router]);

  return (
    <>
      <h2>admin page</h2>
      <CreateCategory />
      <CreateProduct />
    </>
  );
}

export default AdminPage;
