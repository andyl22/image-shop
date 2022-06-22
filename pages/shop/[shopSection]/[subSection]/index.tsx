import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
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
  const [content, setContent] = useState<ReactElement>();
  const [subsectionName, setSubsectionName] = useState('Loading...');

  useEffect(() => {
    const pathName = formatToCamelCase(router.asPath.split('/')[3]);
    if (pathName === '[subSection]') return;
    setSubsectionName(pathName);
  }, [router]);

  useEffect(() => {
    const getItems = async () => {
      const subsection = await postHTTP(
        '/items/getSubsectionByName',
        {
          name: subsectionName,
        },
      )
        .then((res) => res.data)
        .catch((err) => console.log(err));
      await postHTTP('/items/getItemsBySubsection', {
        subsection,
      })
        .then((res) =>
          setContent(
            <ItemsControlMenu
              itemData={res.data}
              title={formatTitle(subsectionName)}
            />,
          ),
        )
        .catch((err) => {
          console.log(err);
          setContent(<h2>Could not retrieve any items.</h2>);
        });
    };

    if (subsectionName) {
      getItems();
    }
  }, [subsectionName]);

  return (
    <>
      <Head>
        <title>{formatTitle(subsectionName)}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        {content}
      </main>
      <Footer />
    </>
  );
};

export default SubSection;
