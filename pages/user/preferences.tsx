import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Preferences.module.scss';

const Preferences: NextPage = () => (
  <>
    <Head>
      <title>Preferences</title>
      <meta name="description" content="The Image Shop" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <h1>User Preferences</h1>
    </main>
  </>
);

export default Preferences;
