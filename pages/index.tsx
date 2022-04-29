import type { NextPage } from "next";
import Head from "next/head";
import ItemSlider from "../components/ItemSlider/ItemSlider";
import ItemCardLink from "../components/ItemCard/ItemCardLink";
import Sheet from "../components/Sheet/Sheet";
import SheetLink from "../components/Sheet/SheetLink";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Home.module.scss";
import { getBlogData } from "../TestData/BlogData";
import { Item, getAllItems } from "../TestData/SectionItems";
import { useEffect } from "react";

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
        height="500px"
        width="100%"
      >
        <h2 className={styles.sheetText}>{item.title}</h2>
      </SheetLink>
    );
  });

  const mappedItemData = itemData.slice(0, 8).map((item: Item) => {
    const imgPath = item.image.split("/");
    const category = imgPath[2],
      subCategory = imgPath[3];
    return (
      <ItemCardLink
        imageURL={item.image}
        link={`shop/${category}/${subCategory}/${item.id}`}
        name={item.name}
        key={item.id}
        id={item.id.toString()}
        description={item.description}
        price={item.price}
      />
    );
  });

  // effect to add intersection observers to all elements which we want to observe
  // used to animate the page while scrolling for visual feedback
  useEffect(() => {
    let options = {
      root: document.querySelector(styles.main),
      rootMargin: "0px",
      threshold: [],
    };

    let callback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
          entry.target.classList.remove("toBeObserved");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const observedElements = document.getElementsByClassName("toBeObserved");
    Array.from(observedElements).forEach((el) => {
      observer.observe(el);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Parks</title>
        <meta name="description" content="We love Nature!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <span className={styles.background} />

      <main className={styles.main}>
        <div className={styles.introText}>
          <p className={`${styles.scrollableText} ${styles.animate}`}>
            “I went to the woods because I wished to live deliberately, to front
            only the essential facts of life, and see if I could not learn what
            it had to teach, and not, when I came to die, discover that I had
            not lived.” - David Thoreau
          </p>
          <p className={`${styles.scrollableText} toBeObserved`}>
            Leave it better than you found it.
          </p>
        </div>
        <div className={styles.mainContent}>
          <div className={`${styles.itemSliderContainer} toBeObserved`}>
            <h2>New Arrivals</h2>
            <ItemSlider>{mappedItemData}</ItemSlider>
          </div>
          <div className={`${styles.sheetsContainer} toBeObserved`}>
            <Sheet background='url("/images/wide.jpg")'>
              <h2 className={styles.sheetText}>Welcome</h2>
            </Sheet>
          </div>
          <div className={`${styles.gridSheetsContainer} toBeObserved`}>
            {mappedBlogSheets}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
