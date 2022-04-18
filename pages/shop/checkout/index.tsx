import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../../components/Header/Header";
import StripePayment from "../../../components/Stripe/StripePayment";
import styles from "../../../styles/Checkout.module.scss";

const Checkout: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <StripePayment />
      </main>
    </>
  );
};

export default Checkout;
