import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import styles from "../styles/Blog.module.scss";
import BlogCard from "../components/BlogCards/BlogCard";
import blogData from "../TestData/BlogCard.json";


const Blog: NextPage = () => {
  const mappedBlogData = blogData.map(item =>
    <BlogCard
      title={item.title}
      subtitle={item.subtitle}
      author={item.author}
      content={item.previewText}
      image={item.image}
      key={item.title}
    >
      <p>{item?.previewText}</p>
    </BlogCard>
  )

  return (
    <>
      <Head>
        <title>Image Board</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        {mappedBlogData}
      </main>
    </>
  );
};

export default Blog;
