import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/ShopSection.module.scss';
import Footer from '../../../components/Footer/Footer';
import { getShopSectionNames } from '../../../TestData/Sections';
import {
  formatDash,
  formatTitle,
  formatToCamelCase,
} from '../../../utilities/StringFormat';
import PathNav from '../../../components/PathNav/PathNav';
import { postNode } from '../../../utilities/fetchAPIs';

export async function getStaticPaths() {
  const data = await getShopSectionNames();
  const paths = data.map((item: { name: string; _id: string }) => {
    const { name } = item;
    return {
      params: {
        shopSection: formatDash(name),
      },
    };
  });
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
  const { shopSection } = params;
  const sectionNameCamel = formatToCamelCase(shopSection);
  const section = await postNode(`/items/getSectionByName`, {
    name: sectionNameCamel,
  })
    .then((res) => res.data)
    .then((res) => res._id);
  const itemList = await postNode(
    `/items/getSubsectionsBySectionID`,
    {
      section,
    },
  ).then((res) => res.data);
  return {
    props: {
      sectionData: {
        sectionName: shopSection,
        itemList,
      },
    },
  };
}

interface Props {
  sectionData: {
    itemList: [{ name: string; _id: string; section: string }];
    sectionName: string;
  };
}

function Section(props: Props) {
  const { sectionData } = props;
  const { itemList, sectionName } = sectionData;
  const sectionNameTitle = formatTitle(
    formatToCamelCase(sectionName),
  );

  const mappedItems = itemList.map((item) => (
    <Link href={`${sectionName}/${item.name}`} key={item.name}>
      <a>{formatTitle(item.name)}</a>
    </Link>
  ));

  return (
    <>
      <Head>
        <title>{sectionNameTitle}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        <h1>{sectionNameTitle}</h1>
        {mappedItems}
      </main>
      <Footer />
    </>
  );
}

export default Section;
