import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UploadForm from '../components/admin/UploadForm';
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
    <section className=' mt-4'>
      <UploadForm />
      <CreateCategory />
      <CreateProduct />
    </section>
  );
}

export default AdminPage;
