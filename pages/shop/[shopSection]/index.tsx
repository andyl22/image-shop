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
  const [mappedSubsections, setMappedSubsections] = useState<
    ReactElement | ReactElement[]
  >();
  const curSection = formatToCamelCase(router.asPath.split('/')[2]);

  useEffect(() => {
    if (curSection === '[shopSection]') return;
    const createMappedSubsections = async () => {
      const sectionDetails = await postHTTP(
        '/items/getSectionByName',
        {
          name: curSection,
        },
      ).then((res) => res.data);
      if (!sectionDetails) {
        setMappedSubsections(<h2>This section does not exist!</h2>);
        return;
      }
      await postHTTP('/items/getSubsectionsBySectionID', {
        section: sectionDetails._id,
      })
        .then((res) => res.data)
        .then((res) => {
          if (res.length === 0) {
            setMappedSubsections(<h2>Please create subsections</h2>);
            return;
          }
          setMappedSubsections(
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
  });

  return (
    <>
      <Head>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PathNav />
        <h1>{formatTitle(curSection)}</h1>
        {mappedSubsections}
      </main>
      <Footer />
    </>
  );
}

export default ShopSection;
