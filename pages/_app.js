import { SessionProvider } from 'next-auth/react';
import { CategoryProvider } from '../context/CategoryContext';
import { ProductProvider } from '../context/ProductContext';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { NotificationProvider } from '../context/NotificationContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CategoryProvider>
        <ProductProvider>
          <NotificationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationProvider>
        </ProductProvider>
      </CategoryProvider>
    </SessionProvider>
  );
}

export default MyApp;
