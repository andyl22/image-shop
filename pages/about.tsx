import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
import styles from "../styles/About.module.scss";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>
          This was built using Next.js to get some experience with building an
          e-commerce website.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default About;
