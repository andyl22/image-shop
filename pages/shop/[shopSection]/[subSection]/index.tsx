import Head from 'next/head';
import styles from '../../../../styles/SubSection.module.scss';
import { setSectionItems } from '../../../../TestData/SectionItems';
import Footer from '../../../../components/Footer/Footer';
import PathNav from '../../../../components/PathNav/PathNav';
import ItemsControlMenu from '../../../../components/ItemsControlMenu/ItemsControlMenu';
import {
  getShopSectionNames,
  getSubsectionNames,
} from '../../../../TestData/Sections';
import { formatDash } from '../../../../utilities/StringFormat';

export const getStaticPaths = async () => {
  const sections = await getShopSectionNames();
  const paths = [];
  for (let i = 0; i < sections.length; i += 1) {
    const sectionID = sections[i]._id;
    // eslint-disable-next-line no-await-in-loop
    const subsectionNames = await getSubsectionNames(sectionID);
    for (let j = 0; j < subsectionNames.length; j += 1) {
      paths.push({
        params: {
          shopSection: formatDash(sections[i].name),
          subSection: subsectionNames[j].name,
        },
      });
    }
  }
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
  subSectionName: string;
  subSectionContent: SubSectionContent[];
}

interface Props {
  sectionData: SectionData;
}

const SubSection = (props: Props) => {
  const { sectionData } = props;

  const formattedName = sectionData.subSectionName
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
          itemData={sectionData.subSectionContent}
          title={formattedName}
        />
      </main>
      <Footer />
    </>
  );
};

export default SubSection;
