import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@stripe/stripe-js';
import Header from '../components/Header/Header';
import AuthGuard from '../components/AuthGuard/AuthGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthGuard>
        <Header />
        <Component {...pageProps} />
      </AuthGuard>
    </Provider>
  );
}

export default MyApp;
