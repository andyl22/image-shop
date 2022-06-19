import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../../../styles/Checkout.module.scss';

const Success: NextPage = () => (
  <>
    <Head>
      <title>Shop</title>
      <meta name="description" content="Buy Pictures of Parks" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <p>Success</p>
    </main>
  </>
);

export default Success;
