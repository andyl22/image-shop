import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Privacy.module.scss';

const Privacy: NextPage = () => (
  <>
    <Head>
      <title>Track</title>
      <meta name="description" content="Privacy Policy" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <p>Download Tracking to be added.</p>
    </main>
  </>
);

export default Privacy;
