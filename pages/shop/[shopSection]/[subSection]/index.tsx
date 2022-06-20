import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../../styles/SubSection.module.scss';
import Footer from '../../../../components/Footer/Footer';
import PathNav from '../../../../components/PathNav/PathNav';
import ItemsControlMenu from '../../../../components/ItemsControlMenu/ItemsControlMenu';
import {
  formatTitle,
  formatToCamelCase,
} from '../../../../utilities/StringFormat';
import { postHTTP } from '../../../../utilities/fetchAPIs';

const SubSection = () => {
  const router = useRouter();
  const [items, setItems] = useState();
  const subsectionName = formatToCamelCase(
    router.asPath.split('/')[3],
  );

  useEffect(() => {
    const getItems = async () => {
      if (subsectionName) {
        const subsection = await postHTTP(
          '/items/getSubsectionByName',
          {
            name: subsectionName,
          },
        )
          .then((res) => res.data)
          .catch((err) => console.log(err));
        const fetchedItems = await postHTTP(
          '/items/getItemsBySubsection',
          {
            subsection,
          },
        )
          .then((res) => res.data)
          .catch((err) => console.log(err));
        setItems(fetchedItems);
      }
    };
    getItems();
  }, [subsectionName]);

  const titleName = formatTitle(formatToCamelCase(subsectionName));
  return (
    <>
      <Head>
        <title>{titleName}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        {items ? (
          <ItemsControlMenu itemData={items} title={titleName} />
        ) : (
          <p>No items found for this category.</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SubSection;
