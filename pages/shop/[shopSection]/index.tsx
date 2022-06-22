import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import PathNav from '../../../components/PathNav/PathNav';
import styles from '../../../styles/ShopSection.module.scss';
import { postHTTP } from '../../../utilities/fetchAPIs';
import {
  formatToCamelCase,
  formatTitle,
  formatDash,
} from '../../../utilities/StringFormat';
import Footer from '../../../components/Footer/Footer';

function ShopSection() {
  const router = useRouter();
  const [content, setContent] = useState<
    ReactElement | ReactElement[]
  >(<h2>Loading...</h2>);
  const [title, setTitle] = useState('Loading...');

  useEffect(() => {
    const curSection = formatToCamelCase(router.asPath.split('/')[2]);
    if (curSection === '[shopSection]') return;
    setTitle(curSection);
    const createMappedSubsections = async () => {
      const sectionDetails = await postHTTP(
        '/items/getSectionByName',
        {
          name: curSection,
        },
      ).then((res) => res.data);
      if (!sectionDetails) {
        setContent(<h2>This section does not exist!</h2>);
        return;
      }
      await postHTTP('/items/getSubsectionsBySectionID', {
        section: sectionDetails._id,
      })
        .then((res) => res.data)
        .then((res) => {
          if (res.length === 0) {
            setContent(<h2>Please create subsections</h2>);
            return;
          }
          setContent(
            res.map((subsection: { name: string; _id: string }) => (
              <Link
                href={`${router.asPath}/${formatDash(
                  subsection.name,
                )}`}
                key={subsection._id}
              >
                <a>{formatTitle(subsection.name)}</a>
              </Link>
            )),
          );
        });
    };
    createMappedSubsections();
  }, [router]);

  return (
    <>
      <Head>
        <title>{formatTitle(title)}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        <h1>{formatTitle(title)}</h1>
        {content}
      </main>
      <Footer />
    </>
  );
}

export default ShopSection;
