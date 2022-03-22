import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/Register/RegisterForm";
import styles from "../../styles/Login.module.scss";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register for a new account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <RegisterForm />
      </main>
    </>
  );
};

export default Register;
