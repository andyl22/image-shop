import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import ItemSlider from "../components/ItemSlider/ItemSlider";
import ItemCard from "../components/ItemCard/ItemCard";
import Sheet from "../components/Sheet/Sheet";
import SheetLink from "../components/Sheet/SheetLink";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Home.module.scss";
import { getBlogData } from "../TestData/BlogData";
import { Item, getAllItems } from "../TestData/SectionItems";

const Home: NextPage = () => {
  const blogData = getBlogData();
  const itemData = getAllItems();

  const mappedBlogSheets = blogData.slice(0, 4).map((item) => {
    return (
      <SheetLink
        background={`url(${item.image})`}
        border={true}
        href={`/blog/${item.id}`}
        key={item.id}
      >
        <h2>{item.title}</h2>
      </SheetLink>
    );
  });

  const mappedItemData = itemData.slice(0, 8).map((item: Item) => {
    return (
      <ItemCard
        imageURL={item.image}
        link={`/shop/national-parks/yosemite/${item.id}`}
        name={item.name}
        key={item.id}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Parks</title>
        <meta name="description" content="We love Nature!" />
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
          <ItemSlider>{mappedItemData}</ItemSlider>
          <Sheet background='url("/images/wide.jpg")'>
            <h2>Welcome</h2>
          </Sheet>
          <div className={styles.gridSheets}>{mappedBlogSheets}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
