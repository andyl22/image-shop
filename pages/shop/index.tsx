import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import PathNav from "../../components/PathNav/PathNav";
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
        <title>SHOP</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        <h1>Shop By Category</h1>
        {mappedNames}
      </main>
    </>
  );
};

export default Shop;
