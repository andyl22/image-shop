import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../../components/Login/LoginForm';
import styles from '../../styles/Login.module.scss';

const Login: NextPage = () => (
  <>
    <Head>
      <title>Sign In</title>
      <meta name="description" content="The Image Shop" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <LoginForm />
    </main>
  </>
);

export default Login;
