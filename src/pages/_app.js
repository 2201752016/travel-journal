import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Layout from '../components/Layout';
import ThemeProvider from '../components/ThemeProvider';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const userIsAdmin = await fakeAuthCheck();
      setIsAdmin(userIsAdmin);
    };

    checkAdminStatus();
  }, [router]);

  const isDashboard = router.pathname.startsWith('/dashboarded');

  return (
    <Provider store={store}>
      <ThemeProvider>
        {isDashboard && isAdmin ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </Provider>
  );
}

const fakeAuthCheck = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export default MyApp;
