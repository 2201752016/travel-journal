import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/globals.css';
import Layout from '../components/Layout';
import ThemeProvider from '../components/ThemeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
