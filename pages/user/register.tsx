import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";
import FormRegister from "../../components/FormRegister/FormRegister";
import styles from "../../styles/Register.module.scss";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register for a new account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <FormRegister />
      </main>
    </>
  );
};

export default Register;
