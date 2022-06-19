import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ItemSlider from '../components/ItemSlider/ItemSlider';
import ItemCardLink from '../components/ItemCard/ItemCardLink';
import Sheet from '../components/Sheet/Sheet';
import SheetLink from '../components/Sheet/SheetLink';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Home.module.scss';
import { getBlogData } from '../TestData/BlogData';
import { Item } from '../TestData/SectionItems';
import { getAllItems } from '../TestData/Sections';
import { postHTTP } from '../utilities/fetchAPIs';

const Home: NextPage = () => {
  const blogData = getBlogData();
  const [mappedItem, setMappedItem] = useState<any>();

  const mappedBlogSheets = blogData.slice(0, 4).map((item) => (
    <SheetLink
      background={`url(${item.image})`}
      border
      href={`/blog/${item.id}`}
      key={item.id}
      height="500px"
      width="100%"
    >
      <h2 className={styles.sheetText}>{item.title}</h2>
    </SheetLink>
  ));

  // effect to add intersection observers to all elements which we want to observe
  // used to animate the page while scrolling for visual feedback
  useEffect(() => {
    const options = {
      root: document.querySelector(styles.main),
      rootMargin: '0px',
      threshold: [],
    };

    const callback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        // Each entry describes an intersection change for one observed
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
          entry.target.classList.remove('toBeObserved');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const observedElements =
      document.getElementsByClassName('toBeObserved');
    Array.from(observedElements).forEach((el) => {
      observer.observe(el);
    });
  }, []);

  useEffect(() => {
    const getItems = async () => {
      const items = await postHTTP('/items/getAllItems')
        .then((res) => res.data)
        .catch((err) => console.log(err));
      const mappedItemData = items.slice(0, 8).map((item: Item) => {
        const imgPath = item.image.split('/');
        const category = imgPath[2];
        const subCategory = imgPath[3];
        return (
          <ItemCardLink
            imageURL={item.image}
            link={`shop/${category}/${subCategory}/${item._id}`}
            name={item.name}
            key={item._id}
            id={item._id}
            description={item.description}
            price={item.price}
          />
        );
      });
      setMappedItem(mappedItemData);
    };
    getItems();
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
            “I went to the woods because I wished to live
            deliberately, to front only the essential facts of life,
            and see if I could not learn what it had to teach, and
            not, when I came to die, discover that I had not lived.” -
            David Thoreau
          </p>
          <p className={`${styles.scrollableText} toBeObserved`}>
            Leave it better than you found it.
          </p>
        </div>
        <div className={styles.mainContent}>
          <div
            className={`${styles.itemSliderContainer} toBeObserved`}
          >
            <h2>New Arrivals</h2>
            {mappedItem ? (
              <ItemSlider>{mappedItem}</ItemSlider>
            ) : null}
          </div>
          <div className={`${styles.sheetsContainer} toBeObserved`}>
            <Sheet background='url("/images/wide.jpg")'>
              <h2 className={styles.sheetText}>Welcome</h2>
            </Sheet>
          </div>
          <div
            className={`${styles.gridSheetsContainer} toBeObserved`}
          >
            {mappedBlogSheets}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
