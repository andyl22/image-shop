import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/ManageContent.module.scss";

const Content: NextPage = () => {
  return (
    <>
      <Head>
        <title>Manage Content</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Manage Content</h1>
        <p>Create, update, and delete items on the shop.</p>
      </main>
    </>
  );
};

export default Content;