import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import styles from "../../styles/Shop.module.scss";
import { formatToKebabCase } from "../../utilities/StringFormat";

import { getShopSectionNames } from "../../TestData/Sections";

const Shop: NextPage = () => {
  const sectionNames = getShopSectionNames();

  const mappedNames = sectionNames.map((item) => (
    <Link key={item} href={`/shop/${formatToKebabCase(item)}`}>
      <a>{item}</a>
    </Link>
  ));
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>{mappedNames}</main>
    </>
  );
};

export default Shop;
