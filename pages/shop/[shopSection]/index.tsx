import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/ShopSection.module.scss";
import Footer from "../../../components/Footer/Footer";
import {
  getAllHeaderLinkParams,
  getShopSectionData,
} from "../../../TestData/Sections";
import PathNav from "../../../components/PathNav/PathNav";

export async function getStaticPaths() {
  const paths = getAllHeaderLinkParams();
  return {
    paths,
    fallback: false,
  };
}

interface Params {
  params: {
    shopSection: string;
  };
}

export async function getStaticProps({ params }: Params) {
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

      <main className={styles.main}>
        <PathNav />
        <h1>{formattedName}</h1>
        {mappedItems}
      </main>
      <Footer />
    </>
  );
};

export default Section;
