import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import LoginForm from "../components/Login/LoginForm";
import styles from "../styles/Login.module.scss";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
