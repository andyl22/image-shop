import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../../components/Header/Header";
import styles from "../../../styles/ShopSection.module.scss";
import {
  getAllHeaderLinkParams,
  getShopSectionData,
} from "../../../TestData/Sections";

export async function getStaticPaths() {
  const paths = getAllHeaderLinkParams();
  return {
    paths,
    fallback: false,
  };
}

interface Params {
  params : {
    shopSection: string
  }
}

export async function getStaticProps({ params }: Params) {
  console.log(params)
  const sectionData = getShopSectionData(params);
  return {
    props: {
      sectionData,
    },
  };
}

interface Props {
  sectionData: {
    itemList: [{ linkName: string; linkURL: string }];
    sectionName: string;
  };
}

const Section = (props: Props) => {
  const { sectionData } = props;
  const formattedName = sectionData.sectionName
    .split(/(?=[A-Z])/g)
    .join(" ")
    .toUpperCase();

  const mappedItems = sectionData.itemList.map((item) => {
    return (
      <Link href={item.linkURL} key={item.linkURL}>
        <a>{item.linkName}</a>
      </Link>
    );
  });

  return (
    <>
      <Head>
        <title>{formattedName}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1>{formattedName}</h1>
        {mappedItems}
      </main>
    </>
  );
};

export default Section;
