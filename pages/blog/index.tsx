import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Blog.module.scss";
import BlogCard from "../../components/BlogCards/BlogCard";
import blogData from "../../TestData/BlogData.json";

const Blog: NextPage = () => {
  const mappedBlogData = blogData.map((item) => (
    <BlogCard
      id={item.id}
      title={item.title}
      subtitle={item.subtitle}
      author={item.author}
      content={item.previewText}
      image={item.image}
      key={item.id}
    />
  ));

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <span className={styles.background}></span>
      <main className={styles.main}>{mappedBlogData}</main>
    </>
  );
};

export default Blog;
