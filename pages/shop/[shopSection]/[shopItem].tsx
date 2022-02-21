import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../../components/Header/Header";
import styles from "../../../styles/ShopItems.module.scss";

const ShopItem: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image Board</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
          Second Level Item
      </main>
    </>
  );
};

export default ShopItem;
