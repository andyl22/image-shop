import Head from 'next/head';
import styles from '../../../../styles/SubSection.module.scss';
import Footer from '../../../../components/Footer/Footer';
import PathNav from '../../../../components/PathNav/PathNav';
import ItemsControlMenu from '../../../../components/ItemsControlMenu/ItemsControlMenu';
import {
  getAllSubsectionPaths,
  getSectionItems,
  Item,
} from '../../../../TestData/Sections';
import { formatTitle } from '../../../../utilities/StringFormat';

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

interface SectionData {
  subsectionName: string;
  subsectionContent: Item[];
}

interface Props {
  sectionData: SectionData;
}

const SubSection = (props: Props) => {
  const { sectionData } = props;
  const formattedName = formatTitle(sectionData.subsectionName);

  return (
    <>
      <Head>
        <title>{formattedName}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        {sectionData.subsectionContent ? (
          <ItemsControlMenu
            itemData={sectionData.subsectionContent}
            title={formattedName}
          />
        ) : (
          <p>No items found for this category.</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SubSection;
