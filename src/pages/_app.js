import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Layout from '../components/Layout';
import ThemeProvider from '../components/ThemeProvider';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboarded');

  return (
    <Provider store={store}>
      <ThemeProvider>
        {isDashboard ? (
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

export default MyApp;
