import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";

const Shop: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>First Level!</main>
    </>
  );
};

export default Shop;
