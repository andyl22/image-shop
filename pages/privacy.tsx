import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Privacy.module.scss';

const Privacy: NextPage = () => (
  <>
    <Head>
      <title>Privacy</title>
      <meta name="description" content="Privacy Policy" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <p>We do not do anything with your data!</p>
    </main>
  </>
);

export default Privacy;
