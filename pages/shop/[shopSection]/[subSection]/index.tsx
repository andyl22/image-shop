import Head from "next/head";
import Image from "next/image";
import Header from "../../../../components/Header/Header";
import styles from "../../../../styles/ShopItems.module.scss";
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
    return (
      <div key={item.id} className={styles.itemContainer}>
        <h2>{item.name}</h2>
        <Image
          src={item.image}
          alt={item.name}
          layout="responsive"
          height={300}
          width={300}
        />
        <div className={styles.itemInfo}>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      </div>
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
