import { SessionProvider } from 'next-auth/react';
import { CategoryProvider } from '../context/CategoryContext';
import { ProductProvider } from '../context/ProductContext';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { NotificationProvider } from '../context/NotificationContext';
import { OrderProvider } from '../context/OrderContext';
import { CourierProvider } from '../context/CourierContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CategoryProvider>
        <ProductProvider>
          <OrderProvider>
            <NotificationProvider>
              <CourierProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CourierProvider>
            </NotificationProvider>
          </OrderProvider>
        </ProductProvider>
      </CategoryProvider>
    </SessionProvider>
  );
}

export default MyApp;
