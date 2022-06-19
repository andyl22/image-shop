/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Blog.module.scss';
import BlogCard from '../../components/BlogCards/BlogCard';
import blogData from '../../TestData/BlogData.json';

const Blog: NextPage = () => {
  const mappedBlogData = blogData.map((item) => (
    <BlogCard
      id={item.id}
      title={item.title}
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

      <span className={styles.background} />
      <main className={styles.main}>{mappedBlogData}</main>
    </>
  );
};

export default Blog;
