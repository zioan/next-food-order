import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Category from '../components/admin/category/Category';
import Product from '../components/admin/product/Product';
import TabDashboard from '../components/admin/ui/TabDashboard';

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
    <section className=' mt-4 '>
      <TabDashboard />
      {/* <Category />
      <Product /> */}
    </section>
  );
}

export default AdminPage;
