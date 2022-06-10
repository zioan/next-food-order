import { SessionProvider } from 'next-auth/react';
import { CategoryProvider } from '../context/CategoryContext';
import { ProductProvider } from '../context/ProductContext';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CategoryProvider>
        <ProductProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductProvider>
      </CategoryProvider>
    </SessionProvider>
  );
}

export default MyApp;
