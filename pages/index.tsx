import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import ItemSlider from "../components/ItemSlider/ItemSlider";
import ItemCard from "../components/ItemCard/ItemCard";
import Sheet from "../components/Sheet/Sheet";
import Footer from "../components/Footer/Footer";
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
          <p className={styles.scrollableText}>
            “I went to the woods because I wished to live deliberately, to front
            only the essential facts of life, and see if I could not learn what
            it had to teach, and not, when I came to die, discover that I had
            not lived.” - David Thoreau
          </p>
          <p className={styles.scrollableText}>
            Leave it better than you found it.
          </p>
        </div>
        <div className={styles.mainContent}>
          <h2>Explore</h2>
          <ItemSlider>
            <ItemCard
              imageURL="/images/items.jpg"
              link="/shop/national-parks/yosemite/test"
              name="Test0"
            />
            <ItemCard
              imageURL="/images/items.jpg"
              link="/shop/national-parks/yosemite/test"
              name="Test1"
            />
            <ItemCard
              imageURL="/images/items.jpg"
              link="/shop/national-parks/yosemite/test"
              name="Test2"
            />
            <ItemCard
              imageURL="/images/items.jpg"
              link="/shop/national-parks/yosemite/test"
              name="Test3"
            />
            <ItemCard
              imageURL="/images/items.jpg"
              link="/shop/national-parks/yosemite/test"
              name="Test4"
            />
            <ItemCard
              imageURL="/images/items.jpg"
              link="/shop/national-parks/yosemite/test"
              name="Test5"
            />
          </ItemSlider>
          <Sheet background='url("/images/wide.jpg")'>
            <h2>Welcome</h2>
          </Sheet>
          <div className={styles.gridSheets}>
            <Sheet background='url("/images/stream.jpg")' border={true}>
              <h2>Grid1</h2>
            </Sheet>
            <Sheet background='url("/images/bell-rock.jpg")' border={true}>
              <h2>Grid2</h2>
            </Sheet>
            <Sheet background='url("/images/water.jpg")' border={true}>
              <h2>Grid3</h2>
            </Sheet>
            <Sheet background='url("/images/path.jpg")' border={true}>
              <h2>Grid4</h2>
            </Sheet>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
