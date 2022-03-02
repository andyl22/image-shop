import Head from "next/head";
import ItemCardWithPrice from "../../../../components/ItemCard/ItemCardWithPrice";
import Header from "../../../../components/Header/Header";
import styles from "../../../../styles/SubSection.module.scss";
import {
  getAllSections,
  setSectionItems,
} from "../../../../TestData/SectionItems";

export async function getStaticPaths() {
  const paths = getAllSections();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const sectionData = setSectionItems(params);
  return {
    props: {
      sectionData,
    },
  };
}

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
      <ItemCardWithPrice
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

      <main className={styles.main}>{mappedSectionData}</main>
    </>
  );
};

export default SubSection;
