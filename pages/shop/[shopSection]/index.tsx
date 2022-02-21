import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../../components/Header/Header";
import { getAllHeaderLinkParams, getShopSectionData } from "../../../TestData/HeaderLinks";

export async function getStaticPaths() {
  const paths = getAllHeaderLinkParams();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const sectionData = getShopSectionData(params);
  return {
    props: {
      sectionData
    }
  }
}

const Shop: NextPage = (props) => {
  const { sectionData } = props;
  return (
    <>
      <Head>
        <title>{sectionData.sectionName}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>Second Level!</main>
    </>
  );
};

export default Shop;
