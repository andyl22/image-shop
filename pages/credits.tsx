import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Credits.module.scss";
import AccreditationItem from "../components/AccreditationItem/AccreditationItem";
import { getAllItems, Item } from "../TestData/SectionItems";

export const getStaticProps = async () => {
  const item = getAllItems();
  return {
    props: {
      items: item,
    },
  };
};

interface Props {
  items: Item[];
}

const Privacy: NextPage<Props> = ({ items }) => {
  
  const mappedItems = items.map((item) => {
    return (
      <AccreditationItem
        imgURL={item.image}
        itemSource={item.sourceName}
        itemDescription={item.description}
        sourceLink={item.sourceLink}
        key={item.id}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Accreditation</title>
        <meta name="description" content="Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ul>
          <AccreditationItem
            imgURL="/favicon.ico"
            itemSource="Freepik - Flaticon"
            itemDescription="Page Icon"
            sourceLink="https://www.flaticon.com/free-icons/mountain"
          />
          <AccreditationItem
            imgURL="/images/ales-krivec.jpg"
            itemSource="Ales Krivec"
            itemDescription="Foggy Sunset"
            sourceLink="https://unsplash.com/photos/In7RdU6QY2M?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/jamie-hagan-zion.jpg"
            itemSource="Jamie Hagan"
            itemDescription="Zion National Park"
            sourceLink="https://unsplash.com/photos/RWzPBcWVdpw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/login.jpg"
            itemSource="Francesco Califano"
            itemDescription="Ventotene Island"
            sourceLink="https://unsplash.com/photos/kAC8c1Sq58Y?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/tent-view.jpg"
            itemSource="Lucas Metz"
            itemDescription="Namibia Tent"
            sourceLink="https://unsplash.com/photos/LysTBxn72_U?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/glossglockner.jpg"
            itemSource="Ricardo Gomez Angel"
            itemDescription="Glossglockner"
            sourceLink="https://unsplash.com/photos/7TybXFjmq2w?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/wide.jpg"
            itemSource="Perry Kibler"
            itemDescription="Moab"
            sourceLink="https://unsplash.com/photos/I4diFCUg6f4?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/camel-thorn.jpg"
            itemSource="Bernd Dittrich"
            itemDescription="Camel Thorn Trees"
            sourceLink="https://unsplash.com/photos/-503ZgQK5GU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/calm.jpg"
            itemSource="Evelyn Semenyuk"
            itemDescription="Calm"
            sourceLink="https://unsplash.com/photos/OG4mH9ljats?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          {mappedItems}
        </ul>
      </main>
    </>
  );
};

export default Privacy;
