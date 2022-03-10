import Head from "next/head";
import ShopItemCard from "../../../../components/ItemCard/ShopItemCard";
import Header from "../../../../components/Header/Header";
import styles from "../../../../styles/SubSection.module.scss";
import {
  getAllSections,
  setSectionItems,
} from "../../../../TestData/SectionItems";
import Footer from "../../../../components/Footer/Footer";

export const getStaticPaths = async () => {
  const paths = getAllSections();
  return {
    paths,
    fallback: false,
  };
};

interface Params {
  params: {
    shopSection: string;
    subSection: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const sectionData = setSectionItems(params);
  return {
    props: {
      sectionData,
    },
  };
};

interface SubSectionContent {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface SectionData {
  subSectionName: string;
  subSectionContent: SubSectionContent[];
}

interface Props {
  sectionData: SectionData;
}

const SubSection = (props: Props) => {
  const { sectionData } = props;

  const mappedSectionData = sectionData.subSectionContent.map((item) => {
    const { name, image, id, description, price } = item;
    return (
      <ShopItemCard
        imageURL={image}
        name={name}
        link={id.toString()}
        description={description}
        price={price}
        key={id}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        {mappedSectionData}
      </main>
      <Footer />
    </>
  );
};

export default SubSection;
