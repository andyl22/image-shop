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
            sourceLink="https://www.flaticon.com/free-icons/mountain"
          />
          <AccreditationItem
            imgURL="/images/nationalParks/yosemite/bailey-zindel.jpg"
            itemSource="Bailey Zindel"
            itemDescription="Smoky Yosemite Picture"
            sourceLink="https://unsplash.com/photos/zOXUvQ3Xo3s?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/nationalParks/yosemite/trent-erwin.jpg"
            itemSource="Trent Erwin"
            itemDescription="Half Dome"
            sourceLink="https://unsplash.com/photos/U7NLcNo9NGA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
        </ul>
      </main>
    </>
  );
};

export default Privacy;
