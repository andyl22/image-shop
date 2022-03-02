import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import styles from "../styles/Credits.module.scss";
import AccreditationItem from "../components/AccreditationItem/AccreditationItem";

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accreditation</title>
        <meta name="description" content="Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <ul>
          <AccreditationItem
            imgURL="/favicon.ico"
            itemSource="Freepik - Flaticon"
            itemDescription="Page Icon"
          />
        </ul>
      </main>
    </>
  );
};

export default Privacy;
