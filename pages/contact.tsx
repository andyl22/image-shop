import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Privacy.module.scss';

const Contact: NextPage = () => (
  <>
    <Head>
      <title>Contact Us</title>
      <meta
        name="description"
        content="Contact Info For The Image Shop"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <p>Contact Info To Be Added!</p>
    </main>
  </>
);

export default Contact;
