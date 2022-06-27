import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/ManageContent.module.scss';

const Content: NextPage = () => (
  <>
    <Head>
      <title>Manage Content</title>
      <meta name="description" content="The Image Shop" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <h1>Manage Content</h1>
      <Link href="/content/sections">
        <a>Sections</a>
      </Link>
      <Link href="content/subsections">
        <a>Subsections</a>
      </Link>
      <Link href="content/items">
        <a>Items</a>
      </Link>
    </main>
  </>
);

export default Content;
