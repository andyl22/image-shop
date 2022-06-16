import Head from 'next/head';
import Link from 'next/link';
import PathNav from '../../components/PathNav/PathNav';
import styles from '../../styles/Shop.module.scss';
import {
  formatToKebabCase,
  formatTitle,
} from '../../utilities/StringFormat';
import { getShopSectionNames } from '../../TestData/Sections';

export const getServerSideProps = async () => {
  const data = await getShopSectionNames();
  return {
    props: {
      data,
    },
  };
};

interface SectionData {
  _id: string;
  name: string;
}

function Shop(props: any) {
  const { data } = props;
  const mappedNames = data.map((item: SectionData) => {
    const { _id, name } = item;
    return (
      <Link key={_id} href={`/shop/${formatToKebabCase(name)}`}>
        <a>{formatTitle(name)}</a>
      </Link>
    );
  });

  return (
    <>
      <Head>
        <title>SHOP</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        <h1>Shop By Category</h1>
        {mappedNames}
      </main>
    </>
  );
}

export default Shop;
