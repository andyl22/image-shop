import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import ItemSlider from "../components/ItemSlider/ItemSlider";
import ItemCard from "../components/ItemCard/ItemCard";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image Board</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <span className={styles.background} />
      <Header />
      <main className={styles.main}>
        <div className={styles.introText}>
          <span className={styles.scrollableText}>
            Welcome to our website!
          </span>
          <span className={styles.scrollableText}>
            Here, you will find a tremendous amount of high quality photos.
          </span>
          <span className={styles.scrollableText}>
            We guarantee each image we sell is unique, and we'll return a unique product ID we will store in our non-fungible database.
          </span>
        </div>
        <div className={styles.otherContent}>
          <h2>Tests</h2>
          <ItemSlider>
            <ItemCard imageURL="/../public/images/home-background.jpg" link="/shop/national-parks/yosemite/test" name="Test0" />
            <ItemCard imageURL="/../public/images/home-background.jpg" link="/shop/national-parks/yosemite/test" name="Test1" />
            <ItemCard imageURL="/../public/images/home-background.jpg" link="/shop/national-parks/yosemite/test" name="Test2" />
            <ItemCard imageURL="/../public/images/home-background.jpg" link="/shop/national-parks/yosemite/test" name="Test3" />
            <ItemCard imageURL="/../public/images/home-background.jpg" link="/shop/national-parks/yosemite/test" name="Test4" />
            <ItemCard imageURL="/../public/images/home-background.jpg" link="/shop/national-parks/yosemite/test" name="Test5" />
          </ItemSlider>
        </div>
      </main>

    </>
  );
};

export default Home;
