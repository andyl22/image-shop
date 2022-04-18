import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";
import styles from "../../styles/Orders.module.scss";

const Orders: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Order History</h1>
      </main>
    </>
  );
};

export default Orders;
