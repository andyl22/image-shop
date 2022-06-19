import Head from 'next/head';
import styles from '../../../../styles/SubSection.module.scss';
import { setSectionItems } from '../../../../TestData/SectionItems';
import Footer from '../../../../components/Footer/Footer';
import PathNav from '../../../../components/PathNav/PathNav';
import ItemsControlMenu from '../../../../components/ItemsControlMenu/ItemsControlMenu';
import {
  getAllSubsectionPaths,
  getSectionItems,
} from '../../../../TestData/Sections';

export const getStaticPaths = async () => {
  const paths = await getAllSubsectionPaths();
  return {
    paths,
    fallback: false,
  };
};

interface Params {
  params: {
    shopSection: string;
    subsection: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const sectionData = await getSectionItems(params);
  return {
    props: {
      sectionData,
    },
  };
};

interface SubSectionContent {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  visits: number;
  createDttm: number;
  updateDttm: number;
}

interface SectionData {
  subsectionName: string;
  subsectionContent: SubSectionContent[];
}

interface Props {
  sectionData: SectionData;
}

const SubSection = (props: Props) => {
  const { sectionData } = props;
  const formattedName = sectionData.subsectionName
    .split(/(?=[A-Z])/g)
    .join(' ')
    .toUpperCase();

  return (
    <>
      <Head>
        <title>{formattedName}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        <ItemsControlMenu
          itemData={sectionData.subsectionContent}
          title={formattedName}
        />
      </main>
      <Footer />
    </>
  );
};

export default SubSection;
