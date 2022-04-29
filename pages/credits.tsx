import type { NextPage } from "next";
import Head from "next/head";
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
      <main className={styles.main}>
        <ul>
          <AccreditationItem
            imgURL="/favicon.ico"
            itemSource="Freepik - Flaticon"
            itemDescription="Page Icon"
            sourceLink="https://www.flaticon.com/free-icons/mountain"
          />
          <AccreditationItem
            imgURL="/images/national-parks/yosemite/bailey-zindel.jpg"
            itemSource="Bailey Zindel"
            itemDescription="Smoky Yosemite Picture"
            sourceLink="https://unsplash.com/photos/zOXUvQ3Xo3s?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/national-parks/yosemite/trent-erwin.jpg"
            itemSource="Trent Erwin"
            itemDescription="Half Dome"
            sourceLink="https://unsplash.com/photos/U7NLcNo9NGA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
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
          <AccreditationItem
            imgURL="/images/national-parks/redwood/emma-watson-redwood.jpg"
            itemSource="Emma Watson"
            itemDescription="Redwood Trees"
            sourceLink="https://unsplash.com/photos/UDTQ0737wu0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/national-parks/redwood/intricate-explorer-redwood.jpg"
            itemSource="Intricate Explorer"
            itemDescription="Flora"
            sourceLink="https://unsplash.com/photos/6SGV4QeloR8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/national-parks/yellowstone/denys-nevozhai-yellowstone.jpg"
            itemSource="Denys Nevozhai"
            itemDescription="Yeelowstone - Aerial view hotsprings"
            sourceLink="https://unsplash.com/photos/LMU2w-K4J7k?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/national-parks/zion/sterling-lanier-zion.jpg"
            itemSource="Sterling Lanier"
            itemDescription="Zion - Virgin River Narrows"
            sourceLink="https://unsplash.com/photos/osSAcBE_7DE?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/national-parks/zion/danika-perkinson-zion.jpg"
            itemSource="Danika Perkinson"
            itemDescription="Zion - Entry Post"
            sourceLink="https://unsplash.com/photos/Cg9Y39NW5NQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
          <AccreditationItem
            imgURL="/images/national-parks/zion/hunter-james-zion.jpg"
            itemSource="Hunter James"
            itemDescription="Zion - Rocky Path"
            sourceLink="https://unsplash.com/photos/xes-2Nr8IDU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          />
        </ul>
      </main>
    </>
  );
};

export default Privacy;
